import mongoose from "mongoose";

const TYPES_AUTORISES = [
  "Normal", "Fire", "Water", "Electric", "Grass", "Ice",
  "Fighting", "Poison", "Ground", "Flying", "Psychic",
  "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
];

const statField = (withIndex = false) => ({
  type: Number,
  required: [true, "Ce champ est requis"],
  min: [1, "La valeur minimale est 1"],
  max: [255, "La valeur maximale est 255"],
  ...(withIndex && { index: true })
});

const pokemonSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "L'identifiant est requis"],
      unique: true,
      index: true,
      min: [1, "L'identifiant doit être un entier positif"],
      validate: {
        validator: Number.isInteger,
        message: "L'identifiant doit être un entier"
      }
    },

    name: {
      english: { type: String, index: true },
      japanese: { type: String },
      chinese: { type: String },
      french: { type: String, required: [true, "Le nom français est requis"], index: true }
    },

    type: {
      type: [String],
      required: [true, "Le type est requis"],
      index: true,
      validate: {
        validator: function (types) {
          return types.length > 0 && types.every(t => TYPES_AUTORISES.includes(t));
        },
        message: `Les types doivent faire partie de : ${TYPES_AUTORISES.join(", ")}`
      }
    },

    base: {
      HP:             statField(true),
      Attack:         statField(true),
      Defense:        statField(),
      SpecialAttack:  statField(),
      SpecialDefense: statField(),
      Speed:          statField(true)
    },

    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true 
  }
);

/* -----------------------------------------
   INDEX SUPPLÉMENTAIRES POUR PERFORMANCE
----------------------------------------- */

// Recherche rapide par nom (regex)
pokemonSchema.index({ "name.english": 1 });

// Filtre par type
pokemonSchema.index({ type: 1 });

// Tri performant
pokemonSchema.index({ "base.Attack": -1 });
pokemonSchema.index({ "base.HP": -1 });
pokemonSchema.index({ "base.Speed": -1 });

export default mongoose.model("Pokemon", pokemonSchema, "pokemons");