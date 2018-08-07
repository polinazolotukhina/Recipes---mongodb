const passport = require('passport');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const pathModule = require('path');
require('../models/Recipe');
const Recipe = mongoose.model('recipes');
const Item = mongoose.model('clothes');

module.exports = app => {
    // app.use(multer({ dest: __dirname + '/resoucres/' }).any());
    //
    // app.post('/uploads', function(req, res) {
    //     const readerStream = fs.createReadStream(req.files[0].path);
    //     var dest_file = pathModule.join(
    //         req.files[0].destination,
    //         req.files[0].originalname
    //     );
    //     var writerStream = fs.createWriteStream(dest_file);
    //
    //     var stream = readerStream.pipe(writerStream);
    //     stream.on('finish', function() {
    //         fs.unlink(req.files[0].path);
    //     });
    // });

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg');
        }
    });
    const upload = multer({ storage: storage }).single('recipeimage');

    app.post('/img', function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                // An error occurred when uploading
                // return;
            }
            res.json({
                success: true,
                message: 'Img uploaded!'
            });

            // Everything went fine
        });
    });

    app.get('/api/recipes', async (req, res) => {
        const recipes = await Recipe.find({}).sort({ dateAdded: -1 });
        res.send(recipes);
    });

    app.get('/api/recipes/:level', async (req, res) => {
        const recipes = await Recipe.find({ difficulty: req.params.level })
            .sort({ dateAdded: -1 })
            .sort({ dateAdded: -1 });
        res.send(recipes);
    });

    app.get('/api/user_recipes/:id', async (req, res) => {
        const recipes = await Recipe.find({ _user: req.params.id }).sort({
            dateAdded: -1
        });
        res.send(recipes);
    });

    app.delete('/api/delete-recipe/:recipe', async (req, res) => {
        const recipes = await Recipe.findByIdAndRemove({
            _id: req.params.recipe
        });
        res.send(recipes);
    });

    app.post('/api/new_recipe', (req, res, next) => {
        const {
            name,
            ingredients,
            prepTime,
            body,
            _user,
            method,
            author,
            difficulty,
            img
        } = req.body;
        const recipe = new Recipe({
            name,
            ingredients,
            prepTime,
            body,
            dateAdded: Date.now(),
            _user,
            method,
            author,
            difficulty,
            img
        });
        recipe.save(function(err) {
            if (err) throw err;
            else console.log('saved it successfully');
        });
    });
};
