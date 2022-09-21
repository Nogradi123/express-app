const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const Animal = require('../models/Animal');
const User = require('../models/User');


router.get("/", (req,res,next) => {
    Location.find()
    .then((result) => {
        res.render('locations/list', {locationList: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})


router.get('/create', (req,res,next)=> {
    if(!req.session.currentlyLoggedIn){
        res.redirect('/')
    } else {
        res.render('locations/create');
    }
});

router.post('/create', (req,res,next)=>{
    let {address, zip, state, city, apartmentNumber} = req.body;
    if(!apartmentNumber) apartmentNumber = null;
    Location.create({address, apartmentNumber, zip, state, city})
    .then((newLocation)=>{

        User.findByIdAndUpdate(req.session.currentlyLoggedIn._id, {
            location: newLocation
        }).then((updateUser)=>{
            console.log(updateUser)
            res.redirect('/locations')
        }).catch((err)=>{
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/:locationID/addAnimals', (req,res,next)=>{
    Animal.find()
    .then((alltheAnimals)=> {
        Location.findById(req.params.locationID)
        .then((theLocation)=>{
            let myAnimals = [];
            let otherAnimals = [];
            alltheAnimals.forEach((eachAnimal)=> {

                if(theLocation.animals.includes(eachAnimal.id)){
                    myAnimals.push(eachAnimal);
                } else {
                    otherAnimals.push(eachAnimal);
                }


            })


            res.render('locations/addAnimals', 
            {
                myAnimals: myAnimals, 
                otherAnimals: otherAnimals,
                locationID: req.params.locationID
            });

        })


    })
    .catch((err)=> {
        console.log(err)
    })
})

router.post('/:locationID/addAnimals', (req,res,next)=> {
    let ids = req.body.animalID;

        Location.findByIdAndUpdate(req.params.locationID,
            // {$push: {animals: ids}})
            {animals: ids})
            .then((result)=> {
                res.redirect('/locations')
            })
            .catch((err)=> {
                console.log(err)
            })
})

router.get('/:locationID', (req,res,next)=> {
    Location.findById(req.params.locationID).populate('animals')
    .then((theLocation)=>{
        res.render('locations/details', {location: theLocation})
    }).catch((err)=> {
        console.log(err)
    })
})

module.exports = router;