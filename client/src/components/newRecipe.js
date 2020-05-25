import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { createRecipe } from '../actions/recipeApi';

class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      RecipeName: '',
      RecipeAuthor: '',
      Rating: '',
      Description: '',
      category: '',
      Categories: [],
      ingredient: '',
      Ingredients: [],
      instruction: '',
      Instructions: [],
      submitting: true,
    };
  }

  onInputRecipeNameChange = (event) => {
    console.log(event.target.value);
    this.setState({ RecipeName: event.target.value });
  }

  onInputRecipeAuthorChange = (event) => {
    console.log(event.target.value);
    this.setState({ RecipeAuthor: event.target.value });
  }

  onInputRatingChange = (event) => {
    console.log(event.target.value);
    this.setState({ Rating: event.target.value });
  }

  onInputDescriptionChange = (event) => {
    console.log(event.target.value);
    this.setState({ Description: event.target.value });
  }

  onInputCategoryChange = (event) => {
    console.log(event.target.value);
    this.setState({ category: event.target.value });
  }

  onSubmitCategory = (event) => {
    const { Categories, category } = this.state;
    Categories.push(category);
    this.setState({ Categories, category: '' });
  }

  onInputIngredientChange = (event) => {
    console.log(event.target.value);
    this.setState({ ingredient: event.target.value });
  }

  onSubmitIngredient = () => {
    const { Ingredients, ingredient } = this.state;
    Ingredients.push(ingredient);
    this.setState({ Ingredients, ingredient: '' });
  }

  onInputInstructionChange = (event) => {
    console.log(event.target.value);
    this.setState({ instruction: event.target.value });
  }

  onSubmitInstruction = () => {
    const { Instructions, instruction } = this.state;
    Instructions.push(instruction);
    this.setState({ Instructions, instruction: '' });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitting!');
    this.setState({ submitting: true });
    this.props.createRecipe(this.state)
      .then((result) => {
        console.log(result);
        this.props.navigation.push(`/recipe/${result}`);
      })
      .catch((error) => {
        this.setState({ submitting: false });
      });
  }

  renderLoading = () => {
    return (<PulseLoader />);
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
              value={this.state.RecipeName}
            />
          </label>
          Recipe Author
          <label htmlFor="recipeAuthor">
            <input
              type="text"
              name="recipeAuthor"
              onChange={this.onInputRecipeAuthorChange}
              value={this.state.RecipeAuthor}
            />
          </label>
          Recipe Rating
          <label htmlFor="rating">
            <input
              type="text"
              name="rating"
              onChange={this.onInputRatingChange}
              value={this.state.Rating}
            />
          </label>
          Recipe Description
          <label htmlFor="recipeDescription">
            <textarea
              type="text"
              name="description"
              onChange={this.onInputDescriptionChange}
              value={this.state.Description}
            />
          </label>
          Recipe Categories
          <label htmlFor="recipeCategories">
            <input
              type="text"
              name="categories"
              onChange={this.onInputCategoryChange}
              value={this.state.Category}
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
              onChange={this.onInputIngredientChange}
              value={this.state.ingredient}
            />
            <button
              type="button"
              onClick={this.onSubmitIngredient}
              id="ingredientSubmitButton"
            >
              +
            </button>
          </label>
          Recipe Instructions
          <label htmlFor="recipeInstructions">
            <input
              type="text"
              name="instructions"
              onChange={this.onInputInstructionChange}
              value={this.state.instruction}
            />
            <button
              type="button"
              onClick={this.onSubmitInstruction}
              id="instructionSubmitButton"
            >
              +
            </button>
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
        {this.renderLoading()}
      </div>
    );
  }
}

export default withRouter(connect(null, { createRecipe })(NewRecipe));
