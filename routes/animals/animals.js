const express = require('express');
const router = express.Router();
const Animal = require('../../models/Animal');

// *** A Form with a post method will return the ifno from the form in the req.body
// *** A Form with a get method will return the info 

//Create Route
router.post('/create', (req, res, next) => {
    console.log({req, body: req.body})
    
    const animalToCreate = {
        ...req.body,
        isMale: !!req.body.isMale,
        isFemale: !!req.body.isFemale
    }

    // console.log({body: req.body, animalToCreate})

    Animal.create(animalToCreate).then(newlyCreatedAnimal => {
        // console.log({newlyCreatedAnimal});

        res.redirect(`/animals/details/${newlyCreatedAnimal._id}`);
    }).catch(err => {
        console.log({err});
    })
})

// Read Route
router.get('/', (req, res, next) => {
    console.log({query: req.query, params: req.params});

    Animal.find()
    .then((animalsFromDb) => {
        console.log({animalsFromDb})

        data = {
            animals: animalsFromDb
        }

        res.render('animals/list', data);
    })
    .catch(err => {
        console.log({err})
    })
})

// The only way to get a value from req.params is if you personally set a variable using the :variableName method in the endpoint when creating your route. You then call the value 
router.get('/details/:animalId', (req, res, nect) => {
    console.log({params: req.params.animalId});

    Animal.findById(req.params.animalId).then(animalFromDb => {
        console.log({animalFromDb});

        res.render('animals/details', animalFromDb)
    }).catch(err => {console.log({err})})
})

module.exports = router;