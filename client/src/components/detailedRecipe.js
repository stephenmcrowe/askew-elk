import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Custom Imports */
import PulseLoader from 'react-spinners/PulseLoader';
import hashCode from './utils';
import SignOutButton from './signOutButton';
import { updateRecipe } from '../actions/recipeApi';


class DetailedRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
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
      isEditing: false,
      submitting: false,
    };
  }

  handleBack = () => {
    this.props.history.push('/browse');
  };

  backButton = () => {
    return (
      <div className="backButtonContainer">
        <button type="button" onClick={this.handleBack}> Back </button>
      </div>
    );
  }

  handleEditClick = () => {
    const { current: r } = this.props.recipe;
    this.setState({
      id: r.id,
      RecipeName: r.recipeName,
      RecipeAuthor: r.recipeAuthor,
      Rating: r.rating,
      Description: r.description,
      Categories: r.categories,
      Ingredients: r.ingredients,
      Instructions: r.instructions,
      isEditing: true,
    });
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
    this.props.updateRecipe(this.state)
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

  // eslint-disable-next-line consistent-return
  renderSwitch = () => {
    if (this.state.submitting) {
      return (<PulseLoader />);
    } else {
      return (
        <button
          type="button"
          onClick={this.handleSubmit}
          id="addRecipeButton"
        >
          Update Recipe
        </button>
      );
    }
  }


  render() {
    if (this.state.isEditing) {
      return ( // EDITING
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
          </form>
          {this.renderSwitch()}
          <button type="button" onClick={this.log}>Log</button>
        </div>
      );
    } else { // NOT EDITING
      const { current: r } = this.props.recipe;
      const directions = r.directions.map((d, idx) => {
        console.log(typeof (d));
        return <div className="direction-container" key={hashCode(d)}> <span id="stepText">Step {`${idx + 1}:`} </span> {`${d}`}</div>;
      });
      const ingredients = r.ingredients.map((i) => {
        return <div className="ingredient-container" key={hashCode(i)}>{i}</div>;
      });
      const categories = r.categories.map((c) => {
        return <button type="button" key={hashCode(c)}>{c}</button>;
      });
      console.log(r);
      return (
        <div className="detailed-userpage">
          <SignOutButton />
          {this.backButton()}
          <h2>{r.recipeName}</h2>
          <h3>
            {r.recipeAuthor} | Rated {r.rating}/5
            <button type="button" id="editButton" onClick={this.handleEditClick}> EDIT </button>
          </h3>
          <h3>&quot;{r.description}&quot;</h3>
          <div className="detailed-body">
            <div className="detailed-ingredients">
              <h3> Ingredients </h3>
              <div className="ingredients-container">
                {ingredients}
              </div>
            </div>
            <div className="detailed-categories">
              <h3> Categories </h3>
              {categories}
            </div>
            <div className="detailed-directions">
              <h3> Directions </h3>
              {directions}
              <h3> You&apos;re done! Now go enjoy it! </h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => {
  return {
    recipe: reduxState.recipe,
  };
};

export default connect(mapStateToProps, { updateRecipe })(DetailedRecipe);
