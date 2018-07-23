const passport = require('passport');
const mongoose = require('mongoose');
require('../models/Recipe');
const Recipe = mongoose.model('recipes');

module.exports = app => {
    app.get('/api/recipes', async (req, res) => {
        const recipes = await Recipe.find({}).sort({ dateAdded: -1 });
        res.send(recipes);
    });

    app.get('/api/recipes/:level', async (req, res) => {
        const recipes = await Recipe.find({ difficulty: req.params.level });
        res.send(recipes);
    });

    app.get('/api/user_recipes/:id', async (req, res) => {
        const recipes = await Recipe.find({ _user: req.params.id });
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
            difficulty
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
            difficulty
        });
        recipe.save(function(err) {
            if (err) throw err;
            else console.log('saved it successfully!!YEP!');
        });
    });
};
