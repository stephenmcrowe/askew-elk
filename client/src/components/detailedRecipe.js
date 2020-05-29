import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Third-party imports */
import PulseLoader from 'react-spinners/PulseLoader';
import StarRatings from 'react-star-ratings';

/* Custom Imports */
import { hashCode, toDate } from './utils';
import SignOutButton from './signOutButton';
import Instructions from './instructions';

/* Redux Imports */
import {
  deleteRecipe,
  getRecipe,
  updateRecipe,
  getFavorite,
  createFavorite,
  deleteFavorite,
} from '../actions/recipeApi';
import { getNote, resetNotes, deleteNote } from '../actions/noteApi';
import { rateRecipe, updateRating } from '../actions/ratingApi';


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
      recipeID: this.props.match.params.id,
      isEditing: false,
      loading: true,
      submitting: false,
      showRatingScale: false,
      showRatingMessage: false,
    };
  }

  componentDidMount() {
    const { id: recipeId } = this.props.match.params;
    this.props.getRecipe(recipeId)
      .then(() => {
        return this.props.getNote(recipeId);
      })
      .then(() => {
        return this.props.getFavorite(recipeId);
      })
      .then(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    this.props.resetNotes();
  }

  handleBack = () => {
    this.props.history.push('/browse');
  };

  handleFavoriteClick = () => {
    const { id: recipeId } = this.props.match.params;
    if (this.props.recipe.favorite) {
      this.props.deleteFavorite(recipeId)
        .then(() => {
          return this.props.getFavorite(recipeId);
        });
    } else {
      this.props.createFavorite(recipeId)
        .then(() => {
          return this.props.getFavorite(recipeId);
        });
    }
  }

  handleCreateNote = () => {
    this.props.history.push({
      pathname: '/savednotes/create',
      state: { recipeID: this.props.match.params.id },
    });
  }

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
    this.props.deleteRecipe(this.props.match.params.id)
      .then(() => this.props.history.push('/browse'));
  }

  handleNoteEditClick = (n) => {
    this.props.history.push({
      pathname: '/savednotes/edit',
      state: { recipeID: this.props.match.params.id, note: n },
    });
  }

  handleNoteDeleteClick = (n) => {
    this.setState({ loading: true });
    this.props.deleteNote(this.props.match.params.id, n.DateOfEntry)
      .then(() => {
        return this.props.getNote(this.props.match.params.id);
      })
      .then(() => {
        this.setState({ loading: false });
      });
  }

  handleRateClick = () => {
    this.setState({ showRatingScale: true });
  }

  onInputRecipeNameChange = (event) => {
    this.setState({ RecipeName: event.target.value });
  }

  changeRating = (newRating) => {
    const { id: recipeId } = this.props.match.params;
    this.props.rateRecipe(newRating, recipeId)
      .then(this.ratingOnCompletionCallback)
      .catch(() => {
        return this.props.updateRating(newRating, recipeId);
      })
      .then(this.ratingOnCompletionCallback);
  }

  ratingOnCompletionCallback = () => {
    this.setState({ showRatingScale: false, showRatingMessage: true });
    setTimeout(() => {
      this.setState({ showRatingMessage: false });
    }, 5000);
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
      .then(() => { this.setState({ isEditing: false, submitting: false }); })
      .catch((error) => {
        this.setState({ submitting: false });
      });
  }

  renderButtons = () => {
    const username = localStorage.getItem('username');
    const { RecipeAuthor: author } = this.props.recipe.current;
    if (username === author) {
      return (
        <div className="detailed-buttons">
          <div className="editDeleteContainer">
            <button
              type="button"
              className="default-button form-button"
              onClick={this.handleEditClick}
            >Edit
            </button>
            <button
              type="button"
              className="default-button form-button"
              onClick={this.handleDeleteClick}
            > Delete
            </button>
            <button
              type="button"
              className="default-button form-button"
              onClick={this.handleFavoriteClick}
            >{`${this.props.recipe.favorite ? 'Unf' : 'F'}avorite this recipe`}
            </button>
            <button
              type="button"
              className="default-button form-button"
              onClick={this.handleCreateNote}
            >Create note
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="detailed-buttons">
        <div className="editDeleteContainer">
          <button
            type="button"
            className="default-button form-button"
            onClick={this.handleFavoriteClick}
          >{`${this.props.recipe.favorite ? 'Unf' : 'F'}avorite this recipe`}
          </button>
          <button
            type="button"
            className="default-button form-button"
            onClick={this.handleCreateNote}
          >Create note
          </button>
        </div>
        <div className="rateContainer">
          <button
            type="button"
            className="default-button"
            id="rateButton"
            onClick={this.handleRateClick}
          > Rate this recipe
          </button>
          {this.renderRatingScale()}
          {this.renderRatingMessage()}
        </div>
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
          starDimension="24px"
          starSpacing="0px"
        />
      );
    } else {
      return (
        <div />
      );
    }
  }

  renderRatingMessage = () => {
    if (this.state.showRatingMessage) {
      return (
        <h4 id="rating-submitted"> Rating submitted! </h4>
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
            className="default-button form-button"
          >
            Update Recipe
          </button>
          <button
            type="button"
            onClick={() => this.setState({ isEditing: false })}
            className="default-button form-button"
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
      <div className="center-container">
        <div className="inputs-container">
          <div className="formTitle">
            Edit your recipe!
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
                className="default-button"
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
                className="default-button"
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
                className="default-button"
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
        </div>
      </div>
    );
  }

  renderContent = () => {
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

    let notes = null;
    if (this.props.note.all.length !== 0) {
      notes = this.props.note.all.map((n) => {
        const date = toDate(n.DateOfEntry).toDateString();
        return (
          <div key={`${n.RecipeID}${n.DateOfEntry}`} className="recipe-note-container">
            <div className="detailed-noteTitleDate-container">
              <h4 id="detailed-noteTitle">{n.Title ? n.Title : 'Untitled'}</h4>
              <div className="detailed-editDeleteButton-container">
                <button
                  type="button"
                  className="default-button small-button"
                  onClick={() => this.handleNoteEditClick(n)}
                > Edit
                </button>
                <button
                  type="button"
                  className="default-button small-button"
                  onClick={() => this.handleNoteDeleteClick(n)}
                > Delete
                </button>
              </div>
              <h4 id="detailed-noteDate"> {date} </h4>
            </div>
            <div className="detailed-noteBody-container">
              <h3 id="noteNotes">{n.Notes}</h3>
            </div>
          </div>
        );
      });
      notes = (
        <div className="detailed-notes">
          <h3> Notes </h3>
          {notes}
        </div>
      );
    }
    return (
      <>
        <div className="detailed-button-header">
          <button className="default-button nav-button" type="button" onClick={this.handleBack}>Back</button>
          <SignOutButton />
        </div>
        <div className="detailed-userpage">
          <div className="detailed-header">
            <div className="detailed-author">
              <h3>{r.RecipeAuthor}</h3>
            </div>
            <h2>{r.RecipeName}</h2>
            <div className="detailed-ratings">
              {rating}
            </div>
          </div>
          {this.renderButtons()}
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
            {notes}
          </div>
        </div>
      </>
    );
  }


  render() {
    if (this.state.loading) {
      return <div className="editingPage"><PulseLoader /></div>;
    } else if (this.state.isEditing) {
      return this.renderEditing();
    } else { // NOT EDITING
      return this.renderContent();
    }
  }
}

const mapStateToProps = (reduxState) => {
  return {
    recipe: reduxState.recipe,
    note: reduxState.note,
  };
};

const mapDispatchToProps = {
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getNote,
  deleteNote,
  resetNotes,
  createFavorite,
  getFavorite,
  deleteFavorite,
  rateRecipe,
  updateRating,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedRecipe));
