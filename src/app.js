const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const PUBLIC_PATH = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, '../templates/views');
const PARTIALS_PATH = path.join(__dirname, '../templates/partials');
const PORT = process.env.PORT || 2323

const app = express();

// Setting up handlebars engine (and views location)
// Setting a value for express setting. (Setting name, value)
app.set('view engine', 'hbs');
app.set('views', VIEWS_PATH);

hbs.registerPartials(PARTIALS_PATH);

// Customizing server. Static directory to serve
app.use(express.static(PUBLIC_PATH)); // Setting public path to serve.

// Allows to render our views. (File name in views folder or path, arguments for the template)
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  }); 
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App: About'
  });
});

app.get('/api/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided'
    });
  }

  geocode(req.query.address, (geocodeError, locationData) => {
    if (geocodeError) return res.send({ error: geocodeError });
  
    forecast(locationData, (forecastError, weatherData) => {
      if (forecastError) return res.send({ error: forecastError });

      res.send(weatherData);
    });
  });
});

// Route for 404 page. * means match anything that hasn't been matched so far.
// Need to come last.
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Not Found',
    errorMessage: 'Page not found'
  });
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));