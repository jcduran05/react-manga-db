'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import Register from './components/Register'
import WhoAmI from './components/WhoAmI'

import App from './components/App'

import Home from './containers/Home'
import Manga from './containers/Manga'
import Genre from './containers/Genre'
import Genres from './containers/Genres'
// import registerServiceWorker from './registerServiceWorker'

//import style from './app.css'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/manga" />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/manga" component={Home} />
        <Route path="/manga/:title" component={Manga} />
        <Route path="/manga/all/genres" component={Genres} />
        <Route path="/manga/genre/:genre" component={Genre} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
