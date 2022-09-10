const mongoose = require('mongoose');

// =============== This makes up your model (Schema) File ==================
// const { Schema, model } = mongoose;

// const catSchema = new Schema ({
//     name: String,
//     isMale: {
//         type: Boolean,
//         default: false
//     },
//     isFemale: {
//         type: Boolean,
//         default: false
//     },
//     available: Boolean,
//     color: { 
//         type: String,
//         default:'Black',
//         enum: ['Black', 'Gray', 'White', 'Orange', 'Pink']
//     },
//     siblings: {type: [{type: Schema.Types.ObjectId, ref: 'Cat'}]}
// }, {
//     timestamps: true
//     // timestamps: {
//     //     createdAt: 'created_at',
//     //     updatedAt: 'updated_at'
//     // }
// })

// const Cat = model('Cat', catSchema);
// place export code here when we move this 

const Animal = require('../models/Animal')


// ==========================================================================



// ======================= Connect to Mongodb ===============================

                            // this will be your database name ***
mongoose                        //    |
  .connect('mongodb://localhost/mongooseSeed')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  const myCatsArray = [
    {
        name: 'Cornpuff',
        isFemale: false
    },
    {
        name: 'StrangeLuv',
        isFemale: false
    },
    {
        name: 'Brolly',
        isFemale: false
    },
    {
        name: 'Kringer',
        isFemale: true
    },
    {
        name: 'Kevin',
        isFemale: true
    }
  ]

const oneCat = {
    name: 'New Guy on the block',
    isFemale: true
}


//   Animal.create({
//     name: 'Brittany',
//     isFemale: true
//   }).then(newlyCreatedCat => {
//     console.log('Newly Created Cat: ' newlyCreatedCat); 
//     }).then(() => {
//     mongoose.disconnect();
//     }).catch(err => {
//     mongoose.disconnect()
//     throw err;
//   })

// *** ---------------- this is how you "create" a cat ---------------------
// Animal.create(myCatsArray).then(newlyCreatedCat => {
//     console.log('Newly Created Cat: ', newlyCreatedCat); 
//     }).then(() => {
//     mongoose.disconnect();
//     }).catch(err => {
//     mongoose.disconnect()
//     throw err;
//   });

// *** ================= this is how you find "Read" a cat ================ ***

// you can use this in order to find anything that matches the criteria that you pass in the to the arguments 
// Animal.find({name: 'Kevin'}).then(catsFromDb => {
//     console.log({catsFromDb});
//     mongoose.disconnect()
// }).catch(err => { 
//     mongoose.disconnect()
//     throw err;
// });


// you can search for anything by its databases id (_id) by using the findById method
// Animal.findById("631a81b2836f38891ad24caf").then(catFromDb => {
//     console.log({catFromDb});
//     mongoose.disconnect()
// }).catch(err => { 
//     mongoose.disconnect()
//     throw err;
// });



// *** ======================== this is how you "Update" a cat ======================
// Animal.findByIdAndUpdate("631a81b2836f38891ad24caf", {isMale: true, available: true}, {new: true}).then(updatedCatFromDb => {
//     console.log({updatedCatFromDb});
//     mongoose.disconnect()
// }).catch(err => { 
//     mongoose.disconnect()
//     throw err;
// });




// *** ======================== this is how you "Delete" a cat ======================
// Animal.findByIdAndRemove("631a81b2836f38891ad24caf").then(() => {
//     console.log('You have deleted a cat!! WHYYYYYYYYYY!!!!!!!');
//     mongoose.disconnect()
// }).catch(err => { 
//     mongoose.disconnect()
//     throw err;
// });





// ******************************* Advanced stuff **********************************

Animal.findById("631a7f60220772f6e7ac8972").then(soonToBeGoneAnimalFromDb => {
        console.log({soonToBeGoneAnimalFromDb});
        Animal.findOneAndRemove('631a7f60220772f6e7ac8972').then(() => {
            console.log(`You Have Forcefully Removed ${soonToBeGoneAnimalFromDb.name} from your database. Good job!!`)
            mongoose.disconnect();
        }).catch(err => {
            mongoose.disconnect();
            throw err;
        })
    }).catch(err => { 
        mongoose.disconnect()
        throw err;
    });