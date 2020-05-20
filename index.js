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

const PORT = process.env.PORT || 5000;

app.listen(PORT);
