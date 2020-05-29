/* React imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Redux imports */
import { signupUser } from '../actions/userApi';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      incorrectInput: false,
    };
  }

  onInputUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onInputPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  renderErrorMessage = () => {
    if (this.state.incorrectInput) {
      return (
        <h3> That username already exists! Please try again. </h3>
      );
    } else {
      return (
        <div> </div>
      );
    }
  }

  handleSubmit = (event) => {
    this.props.signupUser(this.state)
      .then(() => { this.props.history.push('/browse'); })
      .catch((error) => {
        this.setState({ incorrectInput: true });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="editingPage">
        <h2 id="formHeader">Sign Up</h2>
        <form className="signForm">
          <input
            placeholder="username"
            onChange={this.onInputUsernameChange}
            value={this.state.username}
          />
          <input
            placeholder="password"
            onChange={this.onInputPasswordChange}
            value={this.state.password}
          />
        </form>
        {this.renderErrorMessage()}
        <button type="button" className="default-button form-button" onClick={this.handleSubmit}>Sign Up</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
