const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

const app = express();

//Load models
require("./models/User");

//Load configuration of services
require("./services/passport");

//Connect to MongoDB
mongoose.connect(keys.mongoURI);

//Middlewares
app.use(bodyParser.json()); //Incoming requests body under req.body
app.use(
  cookieSession({
    maxAge: 0.5 * 24 * 60 * 60 * 1000, // cookie lifespan
    keys: [keys.cookieKey], //key to encrypt cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Load routes
require("./routes/authRoutes")(app);
require("./routes/bookmarkRoutes")(app);

//Routing for deployment
if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets like our main.js or css file
  app.use(express.static("client/build"));

  //Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
