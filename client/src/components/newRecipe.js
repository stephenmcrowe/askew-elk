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
      submitting: false,
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
          Add Recipe
        </button>
      );
    }
  }

  // onButtonDelete = () => {
  //   const { Categories } = this.state;
  //   const d = document.getElementById('inputedCategory');
  //   console.log(d);
  //   d.parentNode.removeChild(d);
  //   document.get;
  //   const index = Categories.indexOf(d.value);
  //   if (index > -1) { Categories.splice(index, 1); }
  //   this.setState({ Categories });
  // }

  renderCategories = () => {
    return (
      this.state.Categories.map((x) => {
        return (
          <button type="button"
            id="inputedCategory"
            // eslint-disable-next-line react/no-array-index-key
            key={x}
            // onClick={() => {
            //   const { Categories } = this.state;
            //   const d = document.getElementById('inputedCategory');
            //   console.log(d);
            //   d.parentNode.removeChild(d);
            //   const index = Categories.indexOf(d.value);
            //   if (index > -1) { Categories.splice(index, 1); }
            //   this.setState({ Categories });
            // }}
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
  }
}

export default withRouter(connect(null, { createRecipe })(NewRecipe));
