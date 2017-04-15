import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form';
import { bindActionCreators } from 'redux'

const Login = ({ login, error, handleSubmit, pristine, reset, submitting }) => {

  const handleFormSubmit = (evt) => {
    login(evt.username, evt.password)
  }

  const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <input {...input}/>
      {touched && error && <div className="error">{error}</div>}
    </div>
  )

  const renderSelect = field => (
    <div>
      <label>{field.input.label}</label>
      <select {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
  )

  return (
    <div className="row row-spacer">
      <div className="col-md-12">
        <form className="form-signin" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="col-md-12 text-center">
            <Field name="username" type="email" component={renderField} label="Email" className="form-control login-username" />
          </div>
          <div className="col-md-12 text-center">

             <Field name="password" type="password" component={renderField} label="Password" className="form-control login-password" />
          </div>
          <div className="col-md-12 text-center">
            {error && <strong>{error}</strong>}
          </div>
          <div className="col-md-12 text-center">
            <input type="submit" value="Login" className="btn btn-default" />
          </div>
        </form>
      </div>
    </div>
  )
}

{/*

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
*/}

function validate(values) {
    const errors = {};

    if (!values.username) {
      errors.username = 'Please enter a username';
    }

    if (!values.password) {
      errors.password = 'Please enter a password';
    }

    console.log('inside validate', errors);
    return errors;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(100) // simulate server latency
    .then(() => {
      if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
        throw { username: 'That username is taken' }
      }
    })
}

function mapStateToProps(state) {
  return {};
}

// this works as well
function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

const form = reduxForm({
  form: 'Login',
  validate
});

export default connect (
  mapStateToProps,
  { login }
) (form(Login))
