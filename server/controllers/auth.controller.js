import User from "../models/user.model";
import passport from "passport";

const register = async (req, res) => {
  try {
    User.register(
      new User({
        email: req.body.email,
        name: req.body.name,
      }),
      req.body.password,
      function (err, account) {
        if (err) {
          return res.status(500).json({
            err,
          });
        }
        passport.authenticate("local")(req, res, () => {
          return res.status(200).json({
            message: "Successfully created new account",
          });
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      error: "An error occurred: " + err,
    });
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Something is not right with your input",
      });
    }
    passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          error: info,
        });
      }
      req.login(user, (err) => {
        if (err) {
          res.send(err);
        }
        return res.json({ message: "Successfully authenticated" });
      });
    })(req, res, next);
  } catch (err) {
    return res.status("401").json({
      error: "Could not sign in",
    });
  }
};

const logout = (req, res) => {
  req.logout();
  res.end();
};

const isUserAuthenticated = (req, res) => {
  if (req.isAuthenticated()) res.send(req.user);
  else res.send(false);
};

export default {
  register,
  login,
  logout,
  isUserAuthenticated,
};
