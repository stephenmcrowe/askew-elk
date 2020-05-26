
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Custom Imports
import { fetchNotes } from '../actions/noteApi';
import SideBar from './sideBar';
import SearchBar from './searchbar';
import SavedNote from './savednote';


class SavedNotes extends Component {
  constructor(props) {
    super(props);

    // this.state = '';
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchNotes();
  }


  renderNotes = () => {
    const notes = this.props.note.all.map((r) => {
      return (
        <div key={r.id} className="recipe-container">
          <div className="recipe-container-inner">
            <NavLink id="recipeLink" to={`/savednotes/${r.id}`}>
              <h2 id="recipeName">{r.recipeName}</h2>
              <h3 id="recipeRating">Rated {r.rating}/5</h3>
              <h4 id="recipeAuthor">Created by: {r.recipeAuthor}</h4>
              <h2 id="recipeName">{r.recipeName}</h2>
              <h3>Description:</h3>
              <h3 id="recipeDescription">{r.description}</h3>
            </NavLink>
          </div>
        </div>
      );
    });
    return notes;
  }


  render() {
    return (
      <div className="userpage">
        <SideBar />
        <div className="user-area">
          {/* {this.topBarSignOut()} */}
          <div className="savednotes-title">
            Your Notes
          </div>
          <SearchBar pathname={this.props.location.pathname} />
          <div className="user-container">
            {this.renderNotes()}
            <SavedNote />
          </div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = (reduxState) => ({
  note: reduxState.note,
});


export default connect(mapStateToProps, { fetchNotes })(SavedNotes);
