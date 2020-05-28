
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Imports
import { getNotes } from '../actions/noteApi';
import SideBar from './sideBar';
import SearchBar from './searchbar';
import SavedNote from './savednote';
import SignOutButton from './signOutButton';


class SavedNotes extends Component {
  constructor(props) {
    super(props);

    // this.state = '';
    this.state = {};
  }

  componentDidMount() {
    // this.props.getNotes();
  }

  render() {
    return (
      <div className="userpage">
        <SideBar />
        <div className="user-area">
          <SignOutButton />
          <div className="savednotes-title">
            Your Notes
          </div>
          <SearchBar pathname={this.props.location.pathname} />
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


export default connect(mapStateToProps, { getNotes })(SavedNotes);
