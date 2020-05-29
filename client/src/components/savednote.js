import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/* Custom Imports */
import { toDate } from './utils';


class SavedNote extends Component {
  render() {
    console.log(this.props.note.all);
    const notes = this.props.note.all.map((r) => {
      const date = toDate(r.DateOfEntry).toDateString();
      return (
        <div key={`${r.RecipeID}${r.DateOfEntry}`} className="note-container">
          <div className="note-container-inner">
            <NavLink id="deLink" to={`/recipe/${r.RecipeID}`}>
              {/* <div className="frontSide"> */}
              <div className="noteRecipe-container">
                <h2>{r.RecipeName}</h2>
              </div>
              <div className="noteTitleDate-container">
                {/* <h4 id="noteTitle">{r.Title}</h4> */}
                <h4 id="noteTitle">{r.Title ? r.Title : 'Untitled'}</h4>
                <h4 id="noteDate"> {date} </h4>
              </div>
              {/* </div> */}
              {/* <div className="backSide"> */}
              <div className="noteBody-container">
                <h3 id="noteNotes">{r.Notes}</h3>
              </div>
              {/* </div> */}
            </NavLink>
          </div>
        </div>
      );
    });
    return notes;
  }
}

const mapStateToProps = (reduxState) => {
  return {
    note: reduxState.note,
  };
};


export default connect(mapStateToProps, null)(SavedNote);
