const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();


//angular
const path= require('path'); //built in


app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Angular - join 
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));


mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actorsid/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/deleteMovies/:id',movies.delbyid);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/moviesid/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//Lab7
app.delete('/actors/delAM/:id',actors.delAM)
app.delete('/actors/:aid/:mid',actors.delMinA);
app.delete('/movies/:mid/:aid',movies.delAinM);
app.post('/movies/:mid/:aid', movies.addActor);
app.get('/actors/:year1/:year2',actors.getByYear);
app.delete('/movies/:year1/:year2',movies.delByYear);
app.delete('/deleteMoviesByYear/:year',movies.delByaYear);
app.get('/movies/actorsByMoviesYear?year',movies.actorsByYear);