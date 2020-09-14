const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  sessionSecret: process.env.sessionSecret || "YOUR_secret_key",
  googleClientId:
    process.env.GOOGLE_CLIENT_ID ||
    "1048927571657-o3oaorh2mfvnv6u5jf9ek583pl6r367b.apps.googleusercontent.com",
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET || "Vi5NLj-wgB37YrcRBKSubI3T",
  facebookAppId: process.env.FACEBOOK_APP_ID || "306688044112849",
  facebookAppSecret:
    process.env.FACEBOOK_APP_SECRET || "e5ea3ba920460b54ca947aa657207de2",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};

export default config;
