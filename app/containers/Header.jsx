import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header-section">
          <div className="row">
            <div className="col-md-4">
              <div className="left_section">
              </div>
            </div>
            <div className="col-md-4">
              <div className="logo">
                  <Link to="/"><span className="main-title">Manga DB</span></Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="right_section">
                <ul className="nav navbar-nav">
                  <li><a href="#">Login</a></li>
                  <li><a href="#">Register</a></li>
                  <li className="dropdown lang">
                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">EN <i
                              className="fa fa-angle-down"></i></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <li><a href="#">JP</a></li>
                    </ul>
                  </li>
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
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Header);
