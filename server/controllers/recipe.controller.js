import Recipe from "../models/recipe.model";
import formidable from "formidable";
import fs from "fs";

const create = (req, res) => {
  let recipeValues;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    if (files.photo) {
      recipeValues = {
        name: fields.name,
        description: fields.description,
        servings: fields.servings,
        ingredients: JSON.parse(fields.ingredients),
        steps: JSON.parse(fields.steps),
        private: fields.private,
        photo: {
          data: fs.readFileSync(files.photo.path),
          contentType: files.photo.type,
        },
      };
    } else {
      recipeValues = {
        name: fields.name,
        description: fields.description,
        servings: fields.servings,
        ingredients: JSON.parse(fields.ingredients),
        steps: JSON.parse(fields.steps),
        private: fields.private,
      };
    }
    console.log(fields);
    console.log("aaaaa");
    console.log(JSON.parse(fields.ingredients));
    console.log(files);
    const recipe = new Recipe({
      ...recipeValues,
      createdBy: "5f5c067457e11652e4b429e7" /*req.user._id*/,
    });
    try {
      await recipe.save();
      return res.status(200).json({ message: "Successfully created" });
    } catch (err) {
      return res.status(400).json({
        err,
      });
    }
  });
};

// const create = async (req, res) => {
//   const recipe = new Recipe({ ...req.body, createdBy: req.user._id });
//   try {
//     await recipe.save();
//     return res.status(200).json({ message: "Successfully created" });
//   } catch (err) {
//     return res.status(400).json({
//       err,
//     });
//   }
// };

const listRecipesFeed = async (req, res) => {
  try {
    let recipes = await Recipe.find({ private: false }, "name");
    res.json(recipes);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const listByUser = async (req, res) => {
  try {
    let recipes = await Recipe.find({ createdBy: req.profile._id });
    res.json(recipes);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const recipeById = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.recipeId)
      .populate("createdBy", "name")
      .exec();
    res.json(recipe);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const update = async (req, res) => {
  try {
    await Recipe.updateOne(
      { _id: req.params.recipeId },
      {
        $set: req.body,
      }
    );
    return res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const remove = async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.recipeId });
    return res.status(200).json({ message: "Successfully removed" });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

export default {
  create,
  listRecipesFeed,
  listByUser,
  recipeById,
  update,
  remove,
};
