import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Third-party imports */
import PulseLoader from 'react-spinners/PulseLoader';
import StarRatings from 'react-star-ratings';

/* Custom Imports */
import hashCode from './utils';
import SignOutButton from './signOutButton';
import Instructions from './instructions';

/* Redux Imports */
import { deleteRecipe, getRecipe, updateRecipe } from '../actions/recipeApi';


class DetailedRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RecipeName: '',
      RecipeAuthor: '',
      Rating: 0,
      Description: '',
      category: '',
      Categories: new Set(),
      ingredient: '',
      Ingredients: new Set(),
      instruction: '',
      Instructions: [],
      isEditing: false,
      submitting: false,
      showRatingScale: false,
    };
  }

  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id);
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  handleEditClick = () => {
    const { current: r } = this.props.recipe;
    this.setState({
      RecipeName: r.RecipeName,
      Description: r.Description,
      Categories: new Set(r.Categories),
      Ingredients: new Set(r.Ingredients),
      Instructions: r.Directions,
      isEditing: true,
    });
  }

  handleDeleteClick = () => {
    this.props.deleteRecipe(this.props.recipe.id, this.props.history);
  }

  onRateButtonClick = () => {
    this.setState({ showRatingScale: false });
  }

  handleRateClick = () => {
    this.setState({ showRatingScale: true });
  }

  onInputRecipeNameChange = (event) => {
    this.setState({ RecipeName: event.target.value });
  }

  changeRating = (newRating) => {
    this.setState({
      Rating: newRating,
    });
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
    console.log(event.target.value);
    this.setState({ instruction: event.target.value });
  }

  onSubmitInstruction = () => {
    const { Instructions: ins, instruction } = this.state;
    ins.push(instruction);
    this.setState({ Instructions: ins, instruction: '' });
  }

  onButtonDelete = (stateKey, toFind) => {
    console.log(stateKey);
    console.log(toFind);
    console.log(this.state[stateKey]);
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    const Directions = {};
    this.state.Instructions.forEach((i, idx) => {
      Directions[idx] = i;
    });
    const { id } = this.props.recipe.current;
    const payload = {
      id,
      RecipeName: this.state.RecipeName,
      Description: this.state.Description,
      Categories: Array.from(this.state.Categories),
      Ingredients: Array.from(this.state.Ingredients),
      Directions,
    };
    this.props.updateRecipe(payload)
      .then((result) => {
        return this.props.getRecipe(this.props.match.params.id);
      })
      .then(() => { this.setState({ isEditing: false }); })
      .catch((error) => {
        this.setState({ submitting: false });
      });
  }

  renderButtonMenu = () => {
    return (
      <div className="backButtonContainer">
        <button type="button" onClick={this.handleBack}>Back</button>
      </div>
    );
  }

  renderRatingScale = () => {
    if (this.state.showRatingScale) {
      return (
        <StarRatings
          rating={this.state.Rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="36px"
          starSpacing="0px"
        />
      );
    } else {
      return (
        <div />
      );
    }
  }

  // eslint-disable-next-line consistent-return
  renderSwitch = () => {
    if (this.state.submitting) {
      return (<PulseLoader />);
    } else {
      return (
        <>
          <button
            type="button"
            onClick={this.handleSubmit}
            id="addRecipeButton"
          >
            Update Recipe
          </button>
          <button
            type="button"
            onClick={() => this.setState({ isEditing: false })}
            id="cancelButton"
          >Cancel
          </button>
        </>
      );
    }
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

  renderEditing = () => {
    return ( // EDITING
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
            <textarea
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
              value={this.state.Category}
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
    );
  }


  render() {
    // return this.renderRating();
    // /*
    if (this.state.isEditing) {
      return this.renderEditing();
    } else { // NOT EDITING
      const { current: r } = this.props.recipe;
      let rating = null;
      if (r.Rating) {
        rating = (
          <StarRatings
            rating={r.Rating}
            starRatedColor="yellow"
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="0px"
          />
        );
      }
      let description = null;
      if (r.Description) {
        description = <h3>&quot;{r.Description}&quot;</h3>;
      }
      let directions = null;
      if (r.Directions) {
        directions = r.Directions.map((d, idx) => {
          console.log(typeof (d));
          return <div className="direction-container" key={hashCode(d)}> <span id="stepText">Step {`${idx + 1}:`} </span> {`${d}`}</div>;
        });
      }
      let ingredients = null;
      if (r.Ingredients) {
        ingredients = r.Ingredients.map((i) => {
          return <div className="ingredient-container" key={hashCode(i)}>{i}</div>;
        });
      }
      let categories = null;
      if (r.Categories) {
        categories = r.Categories.map((c) => {
          return <button type="button" key={hashCode(c)}>{c}</button>;
        });
      }
      console.log(r);
      return (
        <div className="detailed-userpage">
          <SignOutButton />
          {this.renderButtonMenu()}
          <div className="detailed-header">
            <div className="detailed-author">
              <h3>{r.RecipeAuthor}</h3>
              {rating}
            </div>
            <h2>{r.RecipeName}</h2>
            <div className="detailed-buttons">
              <button type="button" id="editButton" onClick={this.handleEditClick}> Edit </button>
              <button type="button" id="deleteButton" onClick={this.handleDeleteClick}> Delete </button>
              <button type="button" id="rateButton" onClick={this.handleRateClick}> Rate this recipe </button>
              {this.renderRatingScale()}
            </div>
          </div>
          {description}
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
    // */
  }
}

const mapStateToProps = (reduxState) => {
  return {
    recipe: reduxState.recipe,
  };
};

const mapDispatchToProps = {
  getRecipe,
  updateRecipe,
  deleteRecipe,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedRecipe));
