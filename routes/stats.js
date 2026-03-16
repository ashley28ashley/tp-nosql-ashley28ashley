import express from "express";
import Pokemon from "../schemas/pokemons.js";

const router = express.Router();

/* -----------------------------------------
   GET /api/stats
----------------------------------------- */
router.get("/", async (req, res) => {
  try {

    // Nombre de Pokémon par type
    const countByType = await Pokemon.aggregate([
      { $unwind: "$type" },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Moyenne des HP par type
    const avgHPByType = await Pokemon.aggregate([
      { $unwind: "$type" },
      { $group: { _id: "$type", avgHP: { $avg: "$base.HP" } } },
      { $sort: { avgHP: -1 } }
    ]);

    // Pokémon avec le plus d'attaque
    const strongestAttack = await Pokemon.findOne()
      .sort({ "base.Attack": -1 })
      .select("id name base.Attack");

    // Pokémon avec le plus de HP
    const mostHP = await Pokemon.findOne()
      .sort({ "base.HP": -1 })
      .select("id name base.HP");

    res.status(200).json({
      countByType,
      avgHPByType,
      strongestAttack,
      mostHP
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;