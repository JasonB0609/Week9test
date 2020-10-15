const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function(err,actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        })
        // Actor.find(function (err, actors) {
        //     if (err) {
        //         return res.status(404).json(err);
        //     } else {
        //         res.json(actors);
        //     }
        // });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    //Lab 7
    delAM:function(req,res){
        Actor.findByIdAndRemove({ _id: req.params.id }, function (err,actor) {
            if (err) return res.status(400).json(err);
            Movie.deleteMany({actors:req.params.id},function(error){
                if (error) return res.status(400).json(error);
                res.json(actor);
            })
        });

    },
    delMinA:function(req,res){
        Actor.findOne({_id:req.params.aid},function(err,actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            console.log(actor.movies);
            actor.movies.remove(req.params.mid);
            console.log(actor.movies);
            actor.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(actor);
            });
        })
    },
    getByYear:function(req,res){
        Actor.where('bYear').gt(req.params.year2).lt(req.params.year1).exec(function(err,actor){
            res.json(actor);
        })
    }
};