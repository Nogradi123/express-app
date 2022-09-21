const express = require('express');
const app = express ();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const PORT = 3000;
// const axios = require('axios');
// variables and declarations always at the top of the file 





// ==================== Connection to DB =====================

mongoose                        //    |
  .connect('mongodb://localhost/expressApp')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// ===========================================================




// middleware always comes between declarations and routes 
// ============ MIDDLEWARE ==========
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use(express.static('public'));      
// app.use(express.static('views'));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// ==================================



app.use(
  session({
    secret: '123secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000
    }, // ADDED code below !!!
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/expressApp'
    })
  })
);


app.use(function (req, res, next) {
  res.locals.theUser = req.session.currentlyLoggedIn;
  next();
})

// ================== ROUTES ====================

// this is what determines the prefix to your routes within the file that you are requiring. If you add '/blah' then all the routes in your index file would have to start with /blah before any route defined. ie: you create a route in index.js that has an endpoint of '/home' but you prefixed '/blah' in the app.js to require index.js, your end result of the route would then be www.domainName.com/blah/home

app.use('/', require('./routes/index'));
app.use('/animals', require('./routes/animals'));
app.use('/locations', require('./routes/locations'));
app.use('/', require('./routes/authroutes'));

// ==============================================


app.listen(PORT || 3000, () => console.log(`My first app listening on port ${PORT}! `))




//routes are the 2nd to last element in your app.js
// ================== ROUTES ====================

// app.get('/', (request, response, next) => {
//     // this is how you display a file without hbs as a view engine
//     // response.sendFile(__dirname + '/views/index.html')

//         const pageName = 'Home Screen';
//         const displayArray = ['Hats', 'Dogs', 'Reptiles', 'Phones', 'Cars'];

//         const data = {
//             pageName,
//             content: displayArray,
//             showContent: displayArray.length > 5
//         }
//     // this is how you render a file having a view engine like 'hbs'
//     // have to render it in an object
//     // response.render('index', {pageName, content: displayArray});
//     response.render('index', data);

//     // when your express side is an api only, then you just have to res.json the information
//     // response.json({pageName, content: displayArray})

// });

// app.get('/about', (request, response, next) => {
//     // response.sendFile(__dirname + '/views/about.html')
//     axios.get('https://pokeapi.co/api/v2/pokemon').then(apiRes => {
//         console.log({apiRes: apiRes.data.results})

//         const data = {
//             content: apiRes.data.results
//         }
//         response.render('about', data);
//     }).catch(err => {
//         console.log({err})
//         next();
//     })
//     // response.render('about');
// });

// app.get('/contact', (request, response, next) => {
//     // response.sendFile(__dirname + '/views/contact.html')
//     response.render('contact');
// });

// // ================================================