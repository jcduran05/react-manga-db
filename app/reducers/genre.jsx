import axios from 'axios'

const reducer = (state=[], action) => {
  switch(action.type) {
    case LOAD_GENRE:
      return {
        ...state, data: action.payload
      };
  }
  return state
}

const LOAD_GENRE = 'LOAD_GENRE';
export const loadGenre = (type) =>
  dispatch =>
    axios.get('/api/manga/genre/' + type)
      .then((response) => dispatch({
        type: LOAD_GENRE,
        payload: response.data
      }))
      .catch((err) => console.log(err))

export default reducer
