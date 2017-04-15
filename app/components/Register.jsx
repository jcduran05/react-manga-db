import React from 'react'
import {register} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export const Register = ({register}) => (
  <div className="row row-spacer">
    <div className="col-md-12">
      <form className="form-signin" onSubmit={evt => {
        evt.preventDefault()
        register(evt.target.name.value, evt.target.email.value, evt.target.password.value)
      } }>
        <div className="col-md-12 text-center">
          <label htmlFor="registerName">Name</label>
          <input name="name" id="registerName" className="form-control login-username" />
        </div>
        <div className="col-md-12 text-center">
          <label htmlFor="registerEmail">Email</label>
          <input name="email" type="email" id="registerEmail" className="form-control login-username" />
        </div>
        <div className="col-md-12 text-center">
          <label htmlFor="registerPassword">Password</label>
          <input name="password" type="password" id="registerPassword" className="form-control login-password" />
        </div>
        <div className="col-md-12 text-center">
          <input type="submit" value="Register" className="btn btn-default" />
        </div>
      </form>
    </div>
  </div>
)

export default connect(
   state => ({}),
  {register}
)(Register)
