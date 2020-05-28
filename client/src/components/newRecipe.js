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
    this.setState({ RecipeName: event.target.value });
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
    this.setState({ submitting: true });
    const Directions = {};
    this.state.Instructions.forEach((i, idx) => {
      Directions[idx] = i;
    });
    const payload = {
      RecipeName: this.state.RecipeName,
      Description: this.state.Description,
      Categories: Array.from(this.state.Categories),
      Ingredients: Array.from(this.state.Ingredients),
      Directions,
    };
    this.props.createRecipe(payload)
      .then((result) => {
        this.props.history.push(`/recipe/${result}`);
      })
      .catch((error) => {
        this.setState({ submitting: false });
      });
  }

  handleBack = () => {
    this.props.history.goBack();
    // this.props.history.push('/browse/yourrecipes');
  };

  renderSwitch = () => {
    if (this.state.submitting) {
      return (<PulseLoader />);
    }
    return (
      <>
        <button
          type="button"
          onClick={this.handleSubmit}
          id="addRecipeButton"
        >
          Add Recipe
        </button>
        <button
          type="button"
          onClick={this.handleBack}
          id="cancelButton"
        >Cancel
        </button>
      </>
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

  log = () => {
    console.log(this.state);
  }

  render() {
    return (
      <div className="center-container">
        <div className="inputs-container">
          <div className="formTitle">
            Add your own recipe!
          </div>
          <form>
            <div className="recipe-input">
              <span>Recipe Name</span>
              <input
                type="text"
                name="recipeName"
                onChange={this.onInputRecipeNameChange}
                value={this.state.RecipeName}
              />
            </div>
            <div className="recipe-input">
              <span>Recipe Description</span>
              <input
                type="text"
                name="description"
                onChange={this.onInputDescriptionChange}
                value={this.state.Description}
              />
            </div>
            <div className="recipe-input">
              <span>Recipe Categories</span>
              <input
                type="text"
                name="categories"
                onChange={this.onInputCategoryChange}
                placeholder={'e.g. "Seafood"'}
                value={this.state.category}
              />
              <button
                type="button"
                onClick={this.onSubmitCategory}
                id="categorySubmitButton"
              >
                +
              </button>
            </div>
            <div className="inputted">
              {this.renderCategories()}
            </div>
            <div className="recipe-input">
              <span>Recipe Ingredients</span>
              <input
                type="text"
                name="ingredients"
                onChange={this.onInputIngredientChange}
                placeholder={'e.g. "1 cup of white flour"'}
                value={this.state.ingredient}
              />
              <button
                type="button"
                onClick={this.onSubmitIngredient}
                id="ingredientSubmitButton"
              >
                +
              </button>
            </div>
            <div className="inputted">
              {this.renderIngredients()}
            </div>
            <div className="recipe-input">
              <span>Recipe Instructions</span>
              <textarea
                type="text"
                name="instructions"
                onChange={this.onInputInstructionChange}
                placeholder={'e.g. "Cut the potato into bite-sized cubes"'}
                value={this.state.instruction}
              />
              <button
                type="button"
                onClick={this.onSubmitInstruction}
                id="instructionSubmitButton"
              >
                +
              </button>
            </div>
            <div className="inputted">
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
      </div>
    );
  }
}

export default withRouter(connect(null, { createRecipe })(NewRecipe));
