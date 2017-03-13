import React, { Component } from 'react';
import Header from '../containers/Header';

export default class App extends Component {
  render() {
    return (
      <div className="uc-mobile-menu-pusher">
        <div className="content-wrapper">
          <section id="header_section_wrapper" className="header_section_wrapper">
            <div className="container">
              <Header />
              {this.props.children}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
