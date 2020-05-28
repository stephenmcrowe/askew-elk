import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


class SavedNote extends Component {
  toDate = (s) => {
    const d = new Date(s);
    return d;
  };

  render() {
    const notes = this.props.note.all.map((r) => {
      const date = this.toDate(r.dateAdded).toDateString();
      console.log(date);
      return (
        <div key={r.id} className="note-container">
          <div className="note-container-inner">
            <NavLink id="deLink" to={`/savednotes/${r.id}`}>
              <div className="frontSide">
                <div className="noteDate-container">
                  <h4 id="noteDate"> {date} </h4>
                </div>
                <div className="noteTitle-container">
                  <h2 id="noteTitle">{r.title}</h2>
                </div>
              </div>
              <div className="backSide">
                <div className="noteBody-container">
                  <h3 id="noteNotes">{r.notes}</h3>
                </div>
              </div>
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
