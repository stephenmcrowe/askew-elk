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
    };
  }

  onInputUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onInputPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    this.props.signupUser(this.state)
      .then(() => { this.props.history.push('/userpage'); });
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
        <button type="button" onClick={this.handleSubmit}>Sign Up</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
