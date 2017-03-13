import axios from 'axios'

const reducer = (state=[], action) => {
  switch(action.type) {
    case LOAD_ALL_MANGA:
      return {
        ...state, data: action.payload
      };
  }
  return state
}

const LOAD_ALL_MANGA = 'LOAD_ALL_MANGA';
export const loadAllManga = () =>
  dispatch =>
    axios.get('/api/manga/')
      .then((response) => dispatch({
        type: LOAD_ALL_MANGA,
        payload: response.data
      }))
      .catch((err) => console.log(err))

export default reducer
