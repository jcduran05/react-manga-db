import React from 'react'
import { Link } from 'react-router';

export const LoginHeader = () => (
  <span>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
  </span>
)

export default LoginHeader;
