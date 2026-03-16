import express from 'express';
import Pokemon from '../schemas/pokemons.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/* -----------------------------------------
   READ — GET ALL (Filtres + Tri + Pagination)
----------------------------------------- */
router.get('/', async (req, res) => {
  try {
    let { type, name, sort, page = 1, limit = 50 } = req.query;

    // Validation pagination
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1 || limit > 100) limit = 50;

    const skip = (page - 1) * limit;

    // Filtres
    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (name) {
      filter["name.english"] = {
        $regex: name,
        $options: "i"
      };
    }

    // Tri sécurisé
    const allowedSortFields = [
      "name.english",
      "name.french",
      "base.HP",
      "base.Attack",
      "base.Defense",
      "base.Speed"
    ];

    if (sort) {
      const cleanSort = sort.startsWith('-')
        ? sort.substring(1)
        : sort;

      if (!allowedSortFields.includes(cleanSort)) {
        return res.status(400).json({
          message: "Invalid sort field"
        });
      }
    }

    // Requête
    const total = await Pokemon.countDocuments(filter);

    let query = Pokemon.find(filter);

    if (sort) {
      query = query.sort(sort);
    }

    const pokemons = await query.skip(skip).limit(limit);

    // Réponse
    res.status(200).json({
      data: pokemons,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   READ — GET BY ID
----------------------------------------- */
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({
      id: parseInt(req.params.id)
    });

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }

    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   CREATE — POST (PROTÉGÉ)
----------------------------------------- */
router.post('/', auth, async (req, res) => {
  try {
    const newPokemon = await Pokemon.create(req.body);
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* -----------------------------------------
   UPDATE — PUT (PROTÉGÉ)
----------------------------------------- */
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }

    res.status(200).json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* -----------------------------------------
   DELETE — DELETE (PROTÉGÉ)
----------------------------------------- */
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findOneAndDelete({
      id: parseInt(req.params.id)
    });

    if (!deletedPokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }

    res.status(204).json({ message: 'Pokémon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;