import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  password: String,
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  googleId: String,
  facebookId: String,
  dateRegistered: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model("User", UserSchema);
