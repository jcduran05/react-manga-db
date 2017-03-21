import React from 'react'

export const Login = ({ login }) => (
  <div className="row row-spacer">
    <div className="col-md-12">
      <form className="form-signin" onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.username.value, evt.target.password.value)
      } }>
        <div className="col-md-12 text-center">
          <label htmlFor="loginUsername">Email</label>
          <input name="username" type="email" id="loginUsername" className="form-control login-username" />
        </div>
        <div className="col-md-12 text-center">
          <label htmlFor="loginPassword">Password</label>
          <input name="password" type="password" id="loginPassword" className="form-control login-password" />
        </div>
        <div className="col-md-12 text-center">
          <input type="submit" value="Login" className="btn btn-default" />
        </div>
      </form>
    </div>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
