const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const sslRedirect = require("heroku-ssl-redirect");
const passport = require("passport");
const bodyParser = require("body-parser");
const request = require("request");
const keys = require("./config/keys");

const app = express();

//Load models
require("./models/User");

//Load configuration of services
require("./services/passport");

//Connect to MongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.use(sslRedirect()); //Force redirect to HTTPS

//Load routes
require("./routes/authRoutes")(app);
require("./routes/bookmarkRoutes")(app);

//Proxy route for marketstack API to prevent CORS issue using server-to-sever commmunication
app.get("/api/proxy/marketstack", (req, res, next) => {
  request(
    {
      url: `https://api.marketstack.com/v1/tickers?search=${req.query.term}&access_key=${keys.marketstackKey}&limit=7`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error);
        return res.status(500).json({ type: "error", message: "error" });
      }
      res.send(body);
    }
  );
});

app.get("/api/proxy/marketstack/daily", (req, res, next) => {
  request(
    {
      url: `https://api.marketstack.com/v1/eod?symbols=${req.query.term}&access_key=${keys.marketstackKey}&limit=250`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error);
        return res.status(500).json({ type: "error", message: "error" });
      }
      res.send(body);
    }
  );
});

app.get("/api/proxy/marketstack/intraday", (req, res, next) => {
  request(
    {
      url: `https://api.marketstack.com/v1/intraday?symbols=${req.query.term}&access_key=${keys.marketstackKey}&interval=15min`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error);
        return res.status(500).json({ type: "error", message: "error" });
      }
      res.send(body);
    }
  );
});

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
