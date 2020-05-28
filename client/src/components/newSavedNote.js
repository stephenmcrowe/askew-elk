import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { createNote } from '../actions/noteApi';

class NewSavedNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '', // recipe ID
      Title: '',
      Notes: '',
      submitting: false,
    };
  }

  onInputTitleChange = (event) => {
    console.log(event.target.value);
    this.setState({ Title: event.target.value });
  }

  onInputNotesChange = (event) => {
    console.log(event.target.value);
    this.setState({ Notes: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitting!');
    this.setState({ submitting: true });
    this.props.createNote(this.state)
      .then((result) => {
        console.log(result);
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
          Add Note
        </button>
      );
    }
  }

  //   log = () => {
  //     console.log(this.state);
  //   }

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

  render() {
    return (
      <>
        {this.backButton()}
        <div className="notes-inputs-container">
          <div className="formTitle">
            Add some notes!
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
      </>
    );
  }
}

export default withRouter(connect(null, { createNote })(NewSavedNote));
