import express from "express";
import Team from "../models/team.js";
import Pokemon from "../schemas/pokemons.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* -----------------------------------------
   CREATE — POST /api/teams
----------------------------------------- */
router.post("/", auth, async (req, res) => {
  try {
    const { name, pokemons = [] } = req.body;

    // Vérifie que tous les IDs de Pokémon existent
    if (pokemons.length > 0) {
      const found = await Pokemon.find({ id: { $in: pokemons } });
      if (found.length !== pokemons.length) {
        return res.status(400).json({ message: "Un ou plusieurs Pokémon sont introuvables" });
      }
    }

    const team = await Team.create({
      user: req.user.id,
      name,
      pokemons
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* -----------------------------------------
   READ ALL — GET /api/teams
----------------------------------------- */
router.get("/", auth, async (req, res) => {
  try {
    const teams = await Team.find({ user: req.user.id });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   READ ONE — GET /api/teams/:id
   Avec les données complètes des Pokémon (populate manuel)
----------------------------------------- */
router.get("/:id", auth, async (req, res) => {
  try {
    const team = await Team.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!team) {
      return res.status(404).json({ message: "Équipe non trouvée" });
    }

    // Récupère les données complètes des Pokémon
    const pokemons = await Pokemon.find({ id: { $in: team.pokemons } });

    res.status(200).json({
      _id: team._id,
      name: team.name,
      pokemons,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -----------------------------------------
   UPDATE — PUT /api/teams/:id
----------------------------------------- */
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, pokemons } = req.body;

    // Vérifie que tous les IDs de Pokémon existent
    if (pokemons && pokemons.length > 0) {
      const found = await Pokemon.find({ id: { $in: pokemons } });
      if (found.length !== pokemons.length) {
        return res.status(400).json({ message: "Un ou plusieurs Pokémon sont introuvables" });
      }
    }

    const team = await Team.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, pokemons },
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({ message: "Équipe non trouvée" });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* -----------------------------------------
   DELETE — DELETE /api/teams/:id
----------------------------------------- */
router.delete("/:id", auth, async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!team) {
      return res.status(404).json({ message: "Équipe non trouvée" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;