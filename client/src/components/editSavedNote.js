import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Custom Imports */
import PulseLoader from 'react-spinners/PulseLoader';
import { getNote, updateNote } from '../actions/noteApi';


class DetailedSavedNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: '',
      Notes: '',
      submitting: false,
    };
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push('/browse');
    } else {
      console.log(this.props.location.state);
      this.setState({
        Title: this.props.location.state.note.Title,
        Notes: this.props.location.state.note.Notes,
      });
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  onInputTitleChange = (event) => {
    this.setState({ Title: event.target.value });
  }

  onInputNotesChange = (event) => {
    this.setState({ Notes: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    const { recipeID } = this.props.location.state;
    const payload = {
      Title: this.state.Title,
      Notes: this.state.Notes,
      DateOfEntry: this.props.location.state.note.DateOfEntry,
    };
    this.props.updateNote(payload, recipeID)
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
            Update Note
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
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    note: reduxState.note,
  };
};

const mapDispatchToProps = {
  getNote,
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedSavedNote);
