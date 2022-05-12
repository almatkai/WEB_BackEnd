const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require("http");
const dbConfig = require('./config/database.config.js');
const {create, findOne} = require("./Controllers/usercontroller");
const mongoose = require('mongoose')
const UserModel = require("./models/usermodel");
const app = express()
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: true}))
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.get('/', (req, res) =>{ res.render('index.ejs') });

app.get('/search', (req, res) =>{ res.render('search.ejs') });

app.get('/trailer', (req, res) =>{ res.render('trailer.ejs') });

app.get('/showMovie', (req, res) =>{ res.render('ShowMovie.ejs') });

app.get('/signup', (req, res) =>{ res.render('Signup.ejs') });
app.get('/signin', (req, res) =>{ res.render('signin.ejs',{errormsg: " "}) });


app.post('/sign_up', (req, res) => {
    create(req,res)
});

app.post('/signin', (req, res) => {
    findOne(req, res);
});

app.post('/ShowMovie',  (req, res) => {
    const MovieID = req.body.index;

    const url = "http://www.omdbapi.com/?i=" + MovieID + "&apikey=674499c5";

    http.get(url, function (response) {
        response.on("data", function (data) {
            const details = JSON.parse(data);
            const title = details.Title;
            const poster = details.Poster;
            const year = details.Year;
            const rating = details.Rated;
            const released = details.Released;
            const genre = details.Genre;
            const writer =details.Writer;
            const actors = details.Actors;
            const plot = details.Plot;
            const language = details.Language;
            const awards = details.Awards;
            res.set("Content-Type", "text/html");

            res.render('ShowMovie.ejs',{
                filmTitle: title,filmPoster: poster, filmYear: year,filmRated:rating,
                filmReleased:released,filmGenre:genre,filmWriter:writer,filmActors:actors,
                filmPlot: plot,filmLanguage:language,filmAwards:awards
            });
        })
    })
})

    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
