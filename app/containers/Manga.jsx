import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as Actions from '../reducers/manga';

import AmazonAd from '../components/AmazonAd';

import { compose } from 'recompose';

const isLoading = function() {
  return (
    <div>
      <div className="col-md-12">loading ...</div>
    </div>
  )
}

class Manga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.actions.loadManga(this.props.params.title);
  }

  componentWillUnmount() {
    this.props.actions.unloadManga();
  }

  render() {
    // Initial html when data hasn't been received
    if (this.props.manga == undefined || this.props.manga.length == 0) {
      return (
        <div>
          <div className="col-md-12">loading ...</div>
        </div>
      )
    }

    let m = this.props.manga[0];
    let mangaTitle = m.title;
    let mangaTitleJP = m.jp_title;

    // Manga synopsis
    let mangaSynopsis = m.manga_detail ? m.manga_detail.synopsis.split('\n').map((paragraph, idx) => <p key={idx}>{paragraph}</p>) : ['No Info Yet.'];

    // Array of a manga's associated genres
    let mangaGenres = m.genres ? m.genres.map((genreObj, idx) => {
      return (
        <span className="blank" key={genreObj.id}>
          <Link to={`/manga/genre/${genreObj.name}`}>{genreObj.name}</Link>
        </span>
      )
    }): [];

    return (
      <div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="manga-title">
                <span className='manga-en-title'>{ mangaTitle }</span>
                <span className='manga-jp-title'>（{ mangaTitleJP }）</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <img src={`/images/${mangaTitle.toLowerCase()}_details_img.jpg`} alt=""/>
            </div>
            <div className="col-md-9">
              <div className="col-md-12">
                <div className="manga-section-header">Synopsis</div>
                { mangaSynopsis }
              </div>
              <div className="col-md-12 row-spacer">
                <div className="manga-section-header">Genres</div>
                <div className="entity_footer">
                  <div className="entity_tag">
                    { mangaGenres }
                  </div>
                </div>
              </div>
              <div className="col-md-12 row-spacer">
                <AmazonAd />
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
    manga: state.manga.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Manga);
