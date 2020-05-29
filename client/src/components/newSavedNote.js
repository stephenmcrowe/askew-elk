import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { createNote } from '../actions/noteApi';

class NewSavedNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: '',
      Notes: '',
      submitting: false,
    };
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
    const payload = {
      Title: this.state.Title,
      Notes: this.state.Notes,
    };
    const { recipeID } = this.props.location.state;
    this.props.createNote(payload, recipeID)
      .then((result) => {
        this.props.history.push(`/recipe/${recipeID}`);
      })
      .catch((error) => {
        this.setState({ submitting: false });
      });
  }

  renderLoading = () => {
    return (<PulseLoader />);
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  // eslint-disable-next-line consistent-return
  renderSwitch = () => {
    if (this.state.submitting) {
      return (<PulseLoader />);
    } else {
      return (
        <>
          <button
            type="button"
            onClick={this.handleSubmit}
            className="default-button form-button"
          >
            Add Note
          </button>
          <button
            type="button"
            onClick={this.handleBack}
            className="default-button form-button"
          >Cancel
          </button>
        </>
      );
    }
  }

  render() {
    return (
      <div className="center-container">
        <div className="notes-inputs-container">
          <div className="formTitle">
            Create note
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
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createNote })(NewSavedNote));
