const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  //Login
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  //Login callback after auth is successful
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    if (!req.user) return res.send(null);
    res.send({
      id: req.user.id,
      username: req.user.username,
      googleId: req.user.googleId,
    });
  });

  //Logout
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //Signup with username and password
  app.post("/api/signup", async (req, res) => {
    const { username, email, password } = req.body;
    var existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(401).send("Username already exists");
    }

    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("Email already exists");
    }

    const newUser = await new User({
      username,
      email,
      signUpDate: new Date().toLocaleString("en-SG", {
        timeZone: "Singapore",
      }),
    }).save();
    newUser.setPassword(password);
    await newUser.save();
    res.send({
      id: newUser.id,
      username: newUser.username,
      signUpDate: newUser.signUpDate,
    });
  });

  //Login with username and password
  app.post("/api/login", passport.authenticate("local"), async (req, res) => {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        lastLoggedIn: new Date().toLocaleString("en-SG", {
          timeZone: "Singapore",
        }),
      }
    );
    res.send({
      id: req.user.id,
      username: req.user.username,
      signUpDate: req.user.signUpDate,
    });
  });
};
