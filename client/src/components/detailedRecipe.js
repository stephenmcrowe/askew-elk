import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Custom Imports */
import PulseLoader from 'react-spinners/PulseLoader';
import hashCode from './utils';
import SignOutButton from './signOutButton';
import { updateRecipe, deleteRecipe } from '../actions/recipeApi';


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
      showRatingScale: false,
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
      Instructions: r.directions,
      isEditing: true,
    });
  }

  handleDeleteClick = () => {
    this.props.deleteRecipe(this.props.recipe.id, this.props.history);
  }

  onRateButtonClick = () => {
    this.setState({ showRatingScale: false });
  }

  ratingScale = () => {
    if (this.state.showRatingScale) {
      return (
        <>
          <button type="button" id="rateOptionButton" onClick={this.onRateButtonClick}> 1 </button>
          <button type="button" id="rateOptionButton" onClick={this.onRateButtonClick}> 2 </button>
          <button type="button" id="rateOptionButton" onClick={this.onRateButtonClick}> 3 </button>
          <button type="button" id="rateOptionButton" onClick={this.onRateButtonClick}> 4 </button>
          <button type="button" id="rateOptionButton" onClick={this.onRateButtonClick}> 5 </button>
        </>
      );
    } else {
      return (
        <div />
      );
    }
  }


  handleRateClick = () => {
    this.setState({ showRatingScale: true });
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

  renderCategories = () => {
    return (
      this.state.Categories.map((x) => {
        return (
          <button type="button"
            id="inputedCategory"
            key={x}
          > {x}
          </button>
        );
      })
    );
  }

  renderIngredients = () => {
    return (
      this.state.Ingredients.map((x) => {
        return (
          <button type="button" id="inputedIngredient" key={x}> {x} </button>
        );
      })
    );
  }

  renderInstructions = () => {
    return (
      this.state.Instructions.map((x) => {
        return (
          <button type="button" id="inputedInstruction" key={x}> {x} </button>
        );
      })
    );
  }


  render() {
    if (this.state.isEditing) {
      return ( // EDITING
        <div className="inputs-container">
          <div className="formTitle">
            Add your own recipe!
          </div>
          <form>
            <label htmlFor="recipeName">
              Recipe Name

              <input
                type="text"
                name="recipeName"
                onChange={this.onInputRecipeNameChange}
                value={this.state.RecipeName}
              />
            </label>
            <label htmlFor="recipeAuthor">
              Recipe Author
              <input
                type="text"
                name="recipeAuthor"
                onChange={this.onInputRecipeAuthorChange}
                value={this.state.RecipeAuthor}
              />
            </label>
            <label htmlFor="rating">
              Recipe Rating
              <input
                type="text"
                name="rating"
                onChange={this.onInputRatingChange}
                value={this.state.Rating}
              />
            </label>
            <label htmlFor="recipeDescription">
              Recipe Description
              <textarea
                type="text"
                name="description"
                onChange={this.onInputDescriptionChange}
                value={this.state.Description}
              />
            </label>
            <label htmlFor="recipeCategories">
              Recipe Categories
              <button
                type="button"
                onClick={this.onSubmitCategory}
                id="categorySubmitButton"
              >
                +
              </button>
              <span id="exampleText">(&quot;Seafood&quot;)</span>
              <input
                type="text"
                name="categories"
                onChange={this.onInputCategoryChange}
                value={this.state.category}
              />
            </label>
            <div className="inputed">
              {this.renderCategories()}
            </div>
            <label htmlFor="recipeIngredients">
              Recipe Ingredients
              <button
                type="button"
                onClick={this.onSubmitIngredient}
                id="ingredientSubmitButton"
              >
                +
              </button>
              <span id="exampleText">(&quot;1 cup of white flour&quot;)</span>
              <input
                type="text"
                name="ingredients"
                onChange={this.onInputIngredientChange}
                value={this.state.ingredient}
              />
            </label>
            <div className="inputed">
              {this.renderIngredients()}
            </div>
            <label htmlFor="recipeInstructions">
              Recipe Instructions
              <button
                type="button"
                onClick={this.onSubmitInstruction}
                id="instructionSubmitButton"
              >
                +
              </button>
              <span id="exampleText">(&quot;Cut the potato into bite-sized cubes&quot;)</span>
              <textarea
                type="text"
                name="instructions"
                onChange={this.onInputInstructionChange}
                value={this.state.instruction}
              />
            </label>
            <div className="inputed">
              {this.renderInstructions()}
            </div>
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
          </h3>
          <div className="detailed-buttons">
            <button type="button" id="editButton" onClick={this.handleEditClick}> Edit </button>
            <button type="button" id="deleteButton" onClick={this.handleDeleteClick}> Delete </button>
            <button type="button" id="rateButton" onClick={this.handleRateClick}> Rate this recipe </button>
            {this.ratingScale()}
          </div>
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
              <h4> You&apos;re done! Now go enjoy it! </h4>
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

export default connect(mapStateToProps, { updateRecipe, deleteRecipe })(DetailedRecipe);
