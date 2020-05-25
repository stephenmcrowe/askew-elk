import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createRecipe } from '../actions/recipeApi';

class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeName: '',
      recipeAuthor: '',
      rating: '',
      description: '',
      dateAdded: '',
      category: '',
      categories: [],
      ingredients: [],
      instructions: [],
    };
  }

  onInputRecipeNameChange = (event) => {
    console.log(event.target.value);
    this.setState({ recipeName: event.target.value });
  }

  onInputRecipeAuthorChange = (event) => {
    console.log(event.target.value);
    this.setState({ recipeAuthor: event.target.value });
  }

  onInputRatingChange = (event) => {
    console.log(event.target.value);
    this.setState({ rating: event.target.value });
  }

  onInputDescriptionChange = (event) => {
    console.log(event.target.value);
    this.setState({ description: event.target.value });
  }

  onInputCategoriesChange = (event) => {
    console.log(event.target.value);
    this.setState({ category: event.target.value });
  }

  onSubmitCategory = (event) => {
    const { categories, category } = this.state;
    categories.push(category);
    this.setState({ categories, category: '' });
  }

  onInputIngredientsChange = (event) => {
    console.log(event.target.value);
    this.setState({ ingredients: event.target.value });
  }

  onInputInstructionsChange = (event) => {
    console.log(event.target.value);
    this.setState({ instructions: event.target.value });
  }

  handleSubmit = (event) => {
    console.log('submitting!');
    this.props.createRecipe(this.state, this.props.history);
    event.preventDefault();
  }

  log = () => {
    console.log(this.state);
  }

  render() {
    return (
      <div className="inputs-container">
        <div className="formTitle">
          Add your own recipe!
        </div>
        <form>
          Recipe Name
          <label htmlFor="recipeName">
            <input
              type="text"
              name="recipeName"
              onChange={this.onInputRecipeNameChange}
              value={this.state.recipeName}
            />
          </label>
          Recipe Author
          <label htmlFor="recipeAuthor">
            <input
              type="text"
              name="recipeAuthor"
              onChange={this.onInputRecipeAuthorChange}
              value={this.state.recipeAuthor}
            />
          </label>
          Recipe Rating
          <label htmlFor="rating">
            <input
              type="text"
              name="rating"
              onChange={this.onInputRatingChange}
              value={this.state.rating}
            />
          </label>
          Recipe Description
          <label htmlFor="recipeDescription">
            <textarea
              type="text"
              name="description"
              onChange={this.onInputDescriptionChange}
              value={this.state.description}
            />
          </label>
          Recipe Categories
          <label htmlFor="recipeCategories">
            <input
              type="text"
              name="categories"
              onChange={this.onInputCategoriesChange}
              value={this.state.category}
            />
            <button
              type="button"
              onClick={this.onSubmitCategory}
              id="categorySubmitButton"
            >
              +
            </button>
          </label>
          Recipe Ingredients
          <label htmlFor="recipeIngredients">
            <input
              type="text"
              name="ingredients"
              onChange={this.onInputIngredientsChange}
              value={this.state.ingredients}
            />
          </label>
          Recipe Instructions
          <label htmlFor="recipeInstructions">
            <input
              type="text"
              name="instructions"
              onChange={this.onInputInstructionsChange}
              value={this.state.instructions}
            />
          </label>
          <button
            type="submit"
            onClick={this.handleSubmit}
            id="addRecipeButton"
          >
            Add Recipe
          </button>
        </form>
        <button type="button" onClick={this.log}>Log</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { createRecipe })(NewRecipe));
