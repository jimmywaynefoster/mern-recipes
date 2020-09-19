import express from "express";
import favicon from "serve-favicon";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";
import passportFacebook from "passport-facebook";
import User from "./models/user.model";
import config from "./../config/config";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import recipeRoutes from "./routes/recipe.routes";
require("dotenv").config();

// modules for server side rendering
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import { StaticRouter } from "react-router-dom";

import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "./../client/theme";
//end

// //comment out before building for production
// import devBundle from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//favicon
app.use(favicon(path.join(CURRENT_WORKING_DIR, "favicon.ico")));

// //comment out before building for production
// devBundle.compile(app);

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
//configure session
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

// Authentication with Passport local mongoose
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Passport Oauth 2.0 Google
const GoogleStrategy = passportGoogleOauth20.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL:
        "https://my-recipes-app-vl.herokuapp.com/auth/google/my-recipies-app",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            user = new User({
              name: profile.displayName,
              googleId: profile.id,
              email: profile.emails[0].value,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);

//Passport Facebook
const FacebookStrategy = passportFacebook.Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookAppId,
      clientSecret: config.facebookAppSecret,
      callbackURL:
        "https://my-recipes-app-vl.herokuapp.com/auth/facebook/my-recipies-app",
      profileFields: ["id", "emails", "displayName"],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          facebookId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            user = new User({
              name: profile.displayName,
              facebookId: profile.id,
              email: profile.emails[0].value,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", recipeRoutes);

app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
