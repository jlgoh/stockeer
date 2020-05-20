const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

//Sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

//Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    //function is called after /auth/google/callback url
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }); // a promise is returned

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        signUpDate: new Date().toLocaleString("en-SG", {
          timeZone: "Singapore",
        }),
      }).save();
      done(null, user);
    }
  )
);

//Username and Password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      return done(null, false, { message: "Incorrect username." });
    }

    if (!existingUser.validatePassword(password)) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, existingUser);
  })
);
