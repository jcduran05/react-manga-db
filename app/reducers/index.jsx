import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  form: formReducer,     // <---- Mounted at 'form'
  auth: require('./auth').default,
  mangas: require('./allManga').default,
  manga: require('./manga').default,
  genres: require('./allGenres').default,
  genre: require('./genre').default
})

export default rootReducer
