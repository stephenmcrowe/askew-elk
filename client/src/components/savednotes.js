
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Imports
import { getNotes, resetNotes } from '../actions/noteApi';
import SideBar from './sideBar';
// import SearchBar from './searchbar';
import SavedNote from './savednote';
import SignOutButton from './signOutButton';


class SavedNotes extends Component {
  constructor(props) {
    super(props);

    // this.state = '';
    this.state = {};
  }

  componentDidMount() {
    this.props.getNotes();
  }

  componentWillUnmount() {
    this.props.resetNotes();
  }

  handleCreateNote = () => {
    this.props.history.push('/savednotes/create');
  }

  render() {
    return (
      <div className="userpage">
        <SideBar />
        <div className="user-area">
          <div className="buttons-container">
            <SignOutButton />
          </div>

          <div className="pageHeader">
            <h2>Your Notes</h2>
          </div>
          {/* <div className="createButtonContainer">
            <button type="button" id="createButton" onClick={this.handleCreateNote}>Create Note</button>
          </div>
          <SearchBar pathname={this.props.location.pathname} /> */}
          <div className="user-container">
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


export default connect(mapStateToProps, { getNotes, resetNotes })(SavedNotes);
