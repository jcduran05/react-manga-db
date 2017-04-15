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

const FETCH_ALL_MANGA = 'FETCH_ALL_MANGA';
const FETCH_ALL_MANGA_SUCCESS = 'FETCH_ALL_MANGA_SUCCESS';
const FETCH_ALL_MANGA_FAILURE = 'FETCH_ALL_MANGA_FAILURE';

export const fetchAllManga = () => {
  const request = axios({
    method: 'get',
    url: '/api/manga/'
  });

  return function(dispatch) {
    dispatch({
    type: FETCH_POSTS,
    payload: request
    });
  }
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
}


export default reducer
