const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log();

const app = express();

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Cool Weather App",
    creator: "Akil Ahmed"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    creator: "Akil Ahmed"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    creator: "Akil Ahmed"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    product: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    message: "There is no article to see in Help url",
    creator: "Akil Ahmed"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    message: "This is a 404 error page",
    creator: "Akil Ahmed"
  });
});

app.listen(3000, () => {
  console.log("it is running dude");
});
