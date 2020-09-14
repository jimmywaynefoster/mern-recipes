import User from "../models/user.model";
import formidable from "formidable";
import fs from "fs";
import profileImage from "./../../client/assets/images/profile-pic.png";

const list = async (req, res) => {
  try {
    let users = await User.find({}, "name");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const readProfile = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
};

const update = (req, res) => {
  let valuesToUpdate;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    if (files.photo) {
      valuesToUpdate = {
        name: fields.name,
        photo: {
          data: fs.readFileSync(files.photo.path),
          contentType: files.photo.type,
        },
      };
    } else {
      valuesToUpdate = {
        name: fields.name,
      };
    }
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "User not authorized" });
      } else {
        await User.updateOne(
          { _id: req.user._id },
          {
            $set: valuesToUpdate,
          }
        );
        return res.status(200).json({ message: "Successfully updated" });
      }
    } catch (err) {
      return res.status(400).json({
        err,
      });
    }
  });
};

const updatePassword = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "User not authorized" });
    } else {
      let user = await User.findOne({ email: req.user.email });
      await user.changePassword(req.body.oldPassword, req.body.newPassword);
      return await res.status(200).json({ message: "Password updated" });
    }
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const remove = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "User not authorized" });
    } else {
      await User.deleteOne({ _id: req.user._id });
      return await res.status(200).json({ message: "Successfully removed" });
    }
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const photo = (req, res, next) => {
  if (req.user.photo) {
    res.set("Content-Type", req.user.photo.contentType);
    return res.send(req.user.photo.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + profileImage);
};

export default {
  readProfile,
  list,
  remove,
  update,
  updatePassword,
  photo,
  defaultPhoto,
};
