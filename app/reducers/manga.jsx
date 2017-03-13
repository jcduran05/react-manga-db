import axios from 'axios'

const reducer = (state=[], action) => {
  switch(action.type) {
    case LOAD_MANGA:
      return {
        ...state, data: action.payload
      };
    case UNLOAD_MANGA:
      return {
        ...state, data: []
      };
  }
  return state
}

const LOAD_MANGA = 'LOAD_MANGA';
export const loadManga = (title) =>
  dispatch =>
    axios.get('/api/manga/' + title)
      .then((response) => dispatch({
        type: LOAD_MANGA,
        payload: response.data
      }))
      .catch((err) => console.log(err))

const UNLOAD_MANGA = 'UNLOAD_MANGA';
export const unloadManga = () =>
  dispatch => dispatch({
        type: UNLOAD_MANGA
      })

export default reducer
