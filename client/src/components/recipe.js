import React, { Component } from 'react';
import { connect } from 'react-redux';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div>Hello</div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    recipe: reduxState.recipe,
  };
};

export default connect(mapStateToProps, null)(Recipe);
