import React from 'react'

export const WhoAmI = ({ user, logout }) => (
  <li className="dropdown lang">
    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{user && user.name} <i
              className="fa fa-angle-down"></i></button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
      <li><button className="logout btn btn-default" onClick={logout}>Logout</button></li>
    </ul>
  </li>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
