import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'utilisateur est requis"]
    },

    name: {
      type: String,
      required: [true, "Le nom de l'équipe est requis"],
      trim: true
    },

    pokemons: {
      type: [Number], 
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 6;
        },
        message: "Une équipe ne peut pas contenir plus de 6 Pokémon"
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Team", teamSchema);