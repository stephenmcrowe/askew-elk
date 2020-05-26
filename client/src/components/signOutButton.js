
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/userApi';


class SignOutButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

    handleSignOut = () => {
      this.props.signoutUser()
        .then(() => { this.props.history.push('/homepage'); });
    };

    render() {
      return (
        <div className="buttons-container">
          <button
            type="button"
            onClick={this.handleSignOut}
            id="signOutButton"
          >SIGN OUT
          </button>
        </div>
      );
    }
}

export default withRouter(connect(null, { signoutUser })(SignOutButton));
