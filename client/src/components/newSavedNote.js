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

  // STEPHEN
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitting!');
    this.setState({ submitting: true });
    const payload = {
      id: this.state.id,
      Title: this.state.Title,
      Notes: this.state.Notes,
    };
    this.props.createNote(payload)
      .then((result) => {
        console.log(result);
        this.props.history.push(`/savednotes/${result}`);
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
    // this.props.history.push('/savednotes');
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
            id="addRecipeButton"
          >
            Add Note
          </button>
          <button
            type="button"
            onClick={this.handleBack}
            id="cancelButton"
          >Cancel
          </button>
        </>
      );
    }
  }

  //   log = () => {
  //     console.log(this.state);
  //   }


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
          {/* <button type="button" onClick={this.log}>Log</button> */}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createNote })(NewSavedNote));
