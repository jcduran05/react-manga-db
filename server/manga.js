'use strict'

const db = require('APP/db')
const Manga = db.model('manga')
const MangaDetail = db.model('manga_detail')
const Genre = db.model('genre')
const Sequelize = require('sequelize')

const router = require('express').Router();

// Fetch all the mangas
router.get('/', (req, res, next) => {
  Manga.findAll({order: [['id', 'ASC']]})
  .then(function(manga) {
    res.status(200).send(manga);
  })
  .catch(next);
})

// Fetch manga by name and data associated with it
router.get('/:mangaName', (req, res, next) => {
  Manga.findAll({
    where: Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("title")),
      {$eq: req.params.mangaName.toLowerCase() }
    ),
    include: [MangaDetail, Genre]
  })
  .then(function(manga) {
    res.status(200).send(manga);
  })
  .catch(next);
})

module.exports = router;
