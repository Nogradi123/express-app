const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const animalSchema = new Schema ({
    name: String,
    species: String,
    sex: {
        type: String,
        enum: ['Male', 'Female']
    },

    available: Boolean,
    color: { 
        type: String,
    },

    siblings: {
        type: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Animal'
                // the ref makes it so .populate knows which model to look at 
            }
    ]},

    aggressive: {
        type: Boolean, 
        default: false
    }, 

    vaccinated: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
})

const Animal = model('Animal', animalSchema);
// by putting 'Animal' as the first argument here it tells mongo DB to create a collection called animals 
module.exports = Animal;