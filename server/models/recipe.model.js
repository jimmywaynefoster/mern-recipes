import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: "Ingredient is required" },
  quantity: { type: Number, required: "Quantity is required" },
  unit: {
    type: String,
    enum: [
      "kg",
      "g",
      "lb",
      "cup",
      "l",
      "ml",
      "oz",
      "pt",
      "tsp",
      "tbsp",
      "unit",
    ],
    required: "Unit is required",
  },
});

const RecipeSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: "Name is required" },
  description: String,
  photo: { data: Buffer, contentType: String },
  servings: { type: Number, required: "Servings are required" },
  ingredients: [IngredientSchema],
  steps: { type: [String], required: "Directions are required" },
  private: {
    type: Boolean,
    default: true,
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now },
});

export default mongoose.model("Recipe", RecipeSchema);
