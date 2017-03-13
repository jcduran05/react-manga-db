import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  mangas: require('./allManga').default,
  manga: require('./manga').default,
  genres: require('./allGenres').default,
  genre: require('./genre').default
})

export default rootReducer
