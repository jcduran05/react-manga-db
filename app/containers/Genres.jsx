import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as Actions from '../reducers/allGenres';

class Genres extends Component {
  componenDidMount() {
    this.props.actions.loadAllGenres();
  }

  render() {
    if (this.props.genres == undefined) {
      return (
        <div>
          <div className="col-md-12"></div>
        </div>
      )
    }

    let genres = this.props.genres.map((genreObj) => {
      return (
        <span className="blank" key={genreObj.id}>
          <Link to={`/manga/genre/${genreObj.name}`}>{genreObj.name}</Link>
        </span>
      )
    });

    return (
      <div className="row-spacer">
        <div className="row">
          <div className="col-md-12">
            <div className="entity_footer">
              <div className="entity_tag">
                { genres }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    genres: state.genres.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
