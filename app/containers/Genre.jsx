import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import moment from 'moment';

import * as Actions from '../reducers/genre';

class Genre extends Component {
  componentDidMount() {
    this.props.actions.loadGenre(this.props.params.genre);
  }

  render() {
    if (this.props.genre == undefined) {
      return (
        <div>
          <div className="col-md-12"></div>
        </div>
      )
    }

    let g = this.props.genre[0];
    // let mangas = g.mangas.map((manga) => {
    //   return (
    //     <div className="col-md-3 col-sm-4" key={manga.id}>
    //       <Link to={`/manga/${manga.title}`}>
    //         <img src={`/images/${manga.title.toLowerCase()}_details_img.jpg`} alt=""/>
    //         <div className="manga-genre-title">
    //           { manga.title }
    //         </div>
    //       </Link>
    //     </div>
    //   )
    // });

    let mangaRows = g.mangas.map((m, idx) => {
      return (
        <tr key={m.id}>
          <th>{m.id}</th>
          <th>
            <Link to={`/manga/${m.title}`}>
              <div className="table-image">
                <img className="img-responsive" src={`/images/${m.title.toLowerCase()}_details_img.jpg`} alt="" />
              </div>
              <div className="table-info">
                {m.title}
                <div className="table-additional-info">Volumes: </div>
                <div className="table-additional-info">
                  Publication Date: {m.publication_start ? moment(m.publication_start).format('MMM YYYY') : '?'} - {m.publication_end ? moment(m.publication_end).format('MMM YYYY') : '?'}</div>
              </div>
            </Link>
          </th>
          <th>
            9.13
          </th>
          <th>
            Add To Favorites
          </th>
        </tr>
      )
    });

    // return (
    //   <div className="row-spacer">
    //     <div className="row">
    //       <div className="col-md-12">
    //         { mangas }
    //       </div>
    //     </div>
    //   </div>
    // )

    return (
      <div className="row-spacer">
        <div className="row">
          <div className="col-md-12">
          <table className="table table-condensed">
            <thead>
              <tr>
                <th>#</th>
                <th>Info</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              { mangaRows }
            </tbody>
          </table>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    genre: state.genre.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
