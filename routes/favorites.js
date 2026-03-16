import express from "express";
import User from "../models/user.js";
import Pokemon from "../schemas/pokemons.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* -----------------------------------------
   AJOUTER UN FAVORI
   POST /api/favorites/:pokemonId
----------------------------------------- */
router.post("/:pokemonId", auth, async (req, res) => {
  try {
    const pokemonId = parseInt(req.params.pokemonId);

    // Vérifie que le pokémon existe
    const pokemon = await Pokemon.findOne({ id: pokemonId });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }

    // Ajoute sans doublon avec $addToSet
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: pokemonId } },
      { new: true }
    );

    res.status(200).json({
      message: "Pokémon ajouté aux favoris",
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   RETIRER UN FAVORI
   DELETE /api/favorites/:pokemonId
----------------------------------------- */
router.delete("/:pokemonId", auth, async (req, res) => {
  try {
    const pokemonId = parseInt(req.params.pokemonId);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: pokemonId } },
      { new: true }
    );

    res.status(200).json({
      message: "Pokémon retiré des favoris",
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   LISTER MES FAVORIS
   GET /api/favorites
----------------------------------------- */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const pokemons = await Pokemon.find({
      id: { $in: user.favorites }
    });

    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;