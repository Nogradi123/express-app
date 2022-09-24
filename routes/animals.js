const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

// *** A Form with a post method will return the ifno from the form in the req.body
// *** A Form with a get method will return the info 

//Create Route
router.post('/create', (req, res, next) => {
    console.log({req, body: req.body})
    
    const animalToCreate = {
        name: req.body.name,
        species: req.body.species,
        color: req.body.color,
        sex: req.body.sex,
        aggressive: !!req.body.aggressive,
        vaccinated: !!req.body.vaccinated,
        available: !!req.body.available
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
router.get('/available/:sort', (req, res, next) => {
    console.log({query: req.query, params: req.params});
    let sortBy;
    if(req.params.sort === "recent"){
        sortBy = -1;
    } else {
        sortBy = 1;
    }
    Animal.find().sort({createdAt: sortBy})
    .then((animalsFromDb) => {
        console.log({animalsFromDb})

        data = {
            animals: animalsFromDb,
            recent: req.params.sort === "recent" ? true : false
        }

        res.render('animals/list', data);
    })
    .catch(err => {
        console.log({err})
        next(err);
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

router.get('/edit/:animalId', (req, res, nect) => {
    console.log({params: req.params.animalId});

    Animal.findById(req.params.animalId).then(animalFromDb => {
        console.log({animalFromDb});

        res.render('animals/edit', animalFromDb)
    }).catch(err => {console.log({err})})
})

router.post('/update/:id', (req,res,next) => {
    Animal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        species: req.body.species,
        color: req.body.color,
        sex: req.body.sex,
        aggressive: !!req.body.aggressive,
        vaccinated: !!req.body.vaccinated,
        available: !!req.body.available
    }).then(()=> {

        res.redirect('/animals/details/'+req.params.id)

    }).catch((err) => {
        console.log(err);
    })
})

router.post('/:id/delete', (req,res,next) => {

    Animal.findByIdAndRemove(req.params.id)
    .then((response)=> {
        res.redirect('/animals')
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports = router;