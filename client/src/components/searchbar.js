import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchterm: '' };
  }

  handleSearch = () => {
    this.props.search(this.props.pathname, this.state.searchterm);
  }

  handleCreateRecipe = () => {
    this.props.history.push('/recipe/create');
  }

  onInputSearchChange = (event) => {
    this.setState({ searchterm: event.target.value });
  }

  render() {
    return (
      <div className="searchBar">
        <button type="button" onClick={this.handleCreateRecipe} className="default-button search-button">Create Recipe</button>
        <input
          placeholder="Search..."
          onChange={this.onInputSearchChange}
          value={this.state.searchterm}
        />
        <button type="button" className="default-button search-button" onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
