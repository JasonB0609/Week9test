const mongoose = require('mongoose');
const actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        validate: {
            validator: function (newName) {
                return (newName.length > 3);
            },
            message: 'Name should be at least 3 characters'
        }
    },
    bYear: {
        validate: {
            validator: function (newAge) {
                if (Number.isInteger(newAge))
                    return true;
                else return false
            },
            message: 'Birth year should be integer'
        },
        type: Number,
        required: true
    },
    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }] //array of object
});
module.exports = mongoose.model('Actor', actorSchema);