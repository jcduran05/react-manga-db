import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router';
import WhoAmI from '../components/WhoAmI'
import Login from '../components/Login'
import LoginHeader from '../components/LoginHeader';

const Header = ({ user, children }) => {
  return (
    <div>
      <div className="header-section">
        <div className="row">
          <div className="col-md-4 col-sm-4 col-xs-3">
            <div className="left_section">
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <div className="logo">
                <Link to="/"><span className="main-title">Manga DB</span></Link>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-5">
            <div className="right_section">
              <ul className="nav navbar-nav">
                {user ? <WhoAmI/> : <LoginHeader/>}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="navigation-section">
        <nav className="navbar m-menu navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#navbar-collapse-1"><span className="sr-only">Toggle navigation</span> <span
                        className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span>
              </button>
            </div>
              <div className="collapse navbar-collapse" id="#navbar-collapse-1">
                <ul className="nav navbar-nav main-nav text-center">
                  <li><Link to="/manga">Manga</Link></li>
                  <li><Link to="/manga/all/genres">Genre</Link></li>
                  <li><a href="#">Authors</a></li>
                  <li><a href="#">Magazines</a></li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

export default connect(mapStateToProps)(Header);
