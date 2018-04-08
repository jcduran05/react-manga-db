'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const OAuth = require('./oauth')

const Author = require('./author')
const Genre = require('./genre')
const Manga = require('./manga')
const Publisher = require('./publisher')
const MangaAuthor = require('./manga_author')
const MangaDetail = require('./manga_detail')
const MangaGenre = require('./manga_genre')
const UserManga = require('./user_manga')

// Details table that will hold additional manga information
// id from details table will be used to link up genre, creator, etc.
Manga.hasOne(MangaDetail);
MangaDetail.belongsTo(Manga);

Manga.hasOne(Publisher);
Publisher.hasMany(Manga);

// Setting up relations that require a pivot table
Manga.belongsToMany(Author, { through: MangaAuthor });
Author.belongsToMany(Manga, { through: MangaAuthor });

Manga.belongsToMany(Genre, { through: MangaGenre });
Genre.belongsToMany(Manga, { through: MangaGenre });

Manga.belongsToMany(User, { through: UserManga });
User.belongsToMany(Manga, { through: UserManga });

// User relations
OAuth.belongsTo(User)
User.hasOne(OAuth)
module.exports = {User}
