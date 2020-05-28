import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Custom Imports */
import PulseLoader from 'react-spinners/PulseLoader';
import SignOutButton from './signOutButton';
import { getNote, updateNote, deleteNote } from '../actions/noteApi';


class DetailedSavedNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      Title: '',
      Notes: '',
      isEditing: false,
      submitting: false,
    };
  }

  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }

  handleBack = () => {
    this.props.history.push('/savednotes');
  };

  backButton = () => {
    return (
      <div className="backButtonContainer">
        <button type="button" onClick={this.handleBack}> Back </button>
      </div>
    );
  }

  handleEditClick = (event) => {
    const r = this.props.note.all[event.target.value];
    this.setState({
      Title: r.Title,
      Notes: r.Notes,
      isEditing: true,
    });
  }

  handleDeleteClick = () => {
    this.props.deleteRecipe(this.props.recipe.id, this.props.history);
  }

  onInputTitleChange = (event) => {
    this.setState({ Title: event.target.value });
  }

  onInputNotesChange = (event) => {
    this.setState({ Notes: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    this.props.updateNote(this.state)
      .then((result) => {
        this.props.navigation.push(`/savednotes/${result}`);
      })
      .catch((error) => {
        this.setState({ submitting: false });
      });
  }

  renderLoading = () => {
    return (<PulseLoader />);
  }

  // eslint-disable-next-line consistent-return
  renderSwitch = () => {
    if (this.state.submitting) {
      return (<PulseLoader />);
    } else {
      return (
        <button
          type="button"
          onClick={this.handleSubmit}
          id="addRecipeButton"
        >
          Update Note
        </button>
      );
    }
  }

  render() {
    if (this.state.isEditing) {
      return ( // EDITING
        <div className="notes-inputs-container">
          <div className="formTitle">
            Edit your note
          </div>
          <form>
            <label htmlFor="noteTitle">
              Title
              <input
                type="text"
                name="noteTitle"
                onChange={this.onInputTitleChange}
                value={this.state.Title}
              />
            </label>
            <label htmlFor="noteNotes">
              Contents
              <textarea
                type="text"
                name="noteNotes"
                onChange={this.onInputNotesChange}
                value={this.state.Notes}
              />
            </label>
          </form>
          {this.renderSwitch()}
          {/* <button type="button" onClick={this.log}>Log</button> */}
        </div>
      );
    } else { // NOT EDITING
      const { current: r } = this.props.note;
      return (
        <div className="detailed-userpage">
          <SignOutButton />
          {this.backButton()}
          <h2>{r.title}</h2>
          <div className="detailed-buttons">
            <button type="button" id="editButton" onClick={this.handleEditClick}> Edit </button>
            <button type="button" id="deleteButton" onClick={this.handleDeleteClick}> Delete </button>
          </div>
          <div className="detailed-notesbody">
            <h3> {r.notes} </h3>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => {
  return {
    note: reduxState.note,
  };
};

const mapDispatchToProps = {
  deleteNote,
  getNote,
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedSavedNote);
