import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { createRecipe } from '../actions/recipeApi';

import Instructions from './instructions';

class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      RecipeName: '',
      RecipeAuthor: '',
      Description: '',
      category: '',
      Categories: new Set(),
      ingredient: '',
      Ingredients: new Set(),
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

  onInputDescriptionChange = (event) => {
    this.setState({ Description: event.target.value });
  }

  onInputCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  }

  onSubmitCategory = (event) => {
    const { Categories, category } = this.state;
    Categories.add(category);
    this.setState({ Categories, category: '' });
  }

  onInputIngredientChange = (event) => {
    this.setState({ ingredient: event.target.value });
  }

  onSubmitIngredient = () => {
    const { Ingredients, ingredient } = this.state;
    Ingredients.add(ingredient);
    this.setState({ Ingredients, ingredient: '' });
  }

  onInputInstructionChange = (event) => {
    this.setState({ instruction: event.target.value });
  }

  onSubmitInstruction = () => {
    const { Instructions: ins, instruction } = this.state;
    ins.push(instruction);
    this.setState({ Instructions: ins, instruction: '' });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitting!');
    this.setState({ submitting: true });
    const payload = {
      RecipeName: this.state.RecipeName,
      RecipeAuthor: this.state.RecipeAuthor,
      Description: this.state.Description,
      Categories: this.state.Categories.values(),
      Ingredients: this.state.Ingredients.values(),
      Instructions: this.state.Instructions.values(),
    };
    this.props.createRecipe(payload)
      .then((result) => {
        console.log(result);
        this.props.navigation.push(`/recipe/${result}`);
      })
      .catch((error) => {
        this.setState({ submitting: false });
      });
  }

  renderSwitch = () => {
    if (this.state.submitting) {
      return (<PulseLoader />);
    }
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

  onButtonDelete = (stateKey, toFind) => {
    this.setState((prevState) => {
      prevState[stateKey].delete(toFind);
      return { [stateKey]: prevState[stateKey] };
    });
  }

  onButtonInsDelete = (stateKey, idx) => {
    this.setState((prevState) => {
      prevState[stateKey].splice(idx, 1);
      return { [stateKey]: prevState[stateKey] };
    });
  }

  reorderItem = (stateKey, currPos, nextPos) => {
    this.setState((prevState) => {
      const ele = this.state[stateKey][currPos];
      prevState[stateKey].splice(currPos, 1);
      prevState[stateKey].splice(nextPos, 0, ele);
      return { [stateKey]: prevState[stateKey] };
    });
  }

  renderCategories = () => {
    const render = [];
    this.state.Categories.forEach((c) => {
      render.push(
        <button
          className="inputtedCategory"
          key={c}
          onClick={() => this.onButtonDelete('Categories', c)}
          type="button"
        >{c}
        </button>,
      );
    });
    return render;
  }

  renderIngredients = () => {
    const render = [];
    this.state.Ingredients.forEach((i) => {
      render.push(
        <button
          className="inputtedIngredient"
          key={i}
          onClick={() => this.onButtonDelete('Ingredients', i)}
          type="button"
        >{i}
        </button>,
      );
    });
    return render;
  }

  renderInstructions = () => {
    const render = [];
    this.state.Instructions.forEach((i, idx) => {
      render.push(
        <button
          className="inputtedInstruction"
          key={i}
          onClick={() => this.onButtonInsDelete('Instructions', idx)}
          type="button"
        >{`${idx + 1}: ${i}`}
        </button>,
      );
    });
    return render;
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
            {/* <span id="exampleText">(&quot;Seafood&quot;)</span> */}
            <input
              type="text"
              name="categories"
              onChange={this.onInputCategoryChange}
              placeholder={'e.g. "Seafood"'}
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
            {/* <span id="exampleText">(&quot;1 cup of white flour&quot;)</span> */}
            <input
              type="text"
              name="ingredients"
              onChange={this.onInputIngredientChange}
              placeholder={'e.g. "1 cup of white flour"'}
              value={this.state.ingredient}
            />
          </label>
          <div className="inputted">
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
            {/* <span id="exampleText">(&quot;Cut the potato into bite-sized cubes&quot;)</span> */}
            <textarea
              type="text"
              name="instructions"
              onChange={this.onInputInstructionChange}
              placeholder={'e.g. "Cut the potato into bite-sized cubes"'}
              value={this.state.instruction}
            />
          </label>
          <div className="inputted">
            {/* {this.renderInstructions()} */}
            <Instructions
              stateKey="Instructions"
              onButtonInsDelete={this.onButtonInsDelete}
              reorderItem={this.reorderItem}
              Instructions={this.state.Instructions}
            />
          </div>
        </form>
        {this.renderSwitch()}
        <button type="button" onClick={this.log}>Log</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { createRecipe })(NewRecipe));
