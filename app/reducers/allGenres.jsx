import axios from 'axios'

const reducer = (state=[], action) => {
  switch(action.type) {
    case LOAD_ALL_GENRES:
      return {
        ...state, data: action.payload
      };
  }
  return state
}

const LOAD_ALL_GENRES = 'LOAD_ALL_GENRES';
export const loadAllGenres = () =>
  dispatch =>
    axios.get('/api/manga/genre/all')
      .then((response) => dispatch({
        type: LOAD_ALL_GENRES,
        payload: response.data
      }))
      .catch((err) => console.log(err))

export default reducer
