'use strict'

const db = require('APP/db')
const Genre = db.model('genre')
const Manga = db.model('manga')
const Sequelize = require('sequelize')

const router = require('express').Router();

router.get('/all', (req, res, next) => {
  Genre.findAll()
  .then(function(manga) {
    res.status(200).send(manga);
  })
  .catch(next);
})

router.get('/:genre', (req, res, next) => {
  Genre.findAll({
    where: {
      name: req.params.genre
    },
    include: [{
      model: Manga,
    }],
    order: [[Manga, 'id', 'ASC']]
  })
  .then(function(manga) {
    res.status(200).send(manga);
  })
  .catch(next);
})

module.exports = router;
