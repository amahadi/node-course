const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory so serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'Alvi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'Alvi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'How can I help?',
        name: 'Alvi'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Rainy in the morning',
        location: 'Victoria, Saanich, BC, Canada'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: "Alvi",
        title: "404 Not found",
        message: "This help article is not found!"
    });
});

app.get('*', (re, res) => {
    res.render('404', {
        name: 'Alvi',
        title: '404 not found',
        message: 'The page is not found!'
    });
});

// function to make the server listen
app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});