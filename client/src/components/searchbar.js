import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchterm: '' };
  }

  onInputSearchChange = (event) => {
    this.setState({ searchterm: event.target.value });
  }

  log = () => {
    console.log(this.props.pathname);
  }

  render() {
    return (
      <div className="searchBar">
        <input
          placeholder="Search..."
          onChange={this.onInputSearchChange}
          value={this.state.searchterm}
        />
        <button type="button" onClick={this.log}>Log</button>
      </div>
    );
  }
}

export default SearchBar;
