import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Recipe extends Component {
  renderRating = (rating) => {
    if (rating) {
      return (
        <h3 id="recipeRating">Rated {rating}/5</h3>
      );
    } else {
      return (
        <h3 id="recipeRating"> No Rating </h3>
      );
    }
  }

  render() {
    let recipes = <h2>No recipes yet!</h2>;
    if (this.props.recipe.all.length !== 0) {
      recipes = this.props.recipe.all.map((r) => {
        const description = r.Description ? r.Description : 'No description';
        return (
          <div key={r.id} className="recipe-container">
            <div className="recipe-container-inner">
              <NavLink id="recipeLink" to={`/recipe/${r.id}`}>
                <div className="frontSide">
                  <h2 id="recipeName">{r.RecipeName}</h2>
                  {/* <h3 id="recipeRating">Rated {r.Rating}/5</h3> */}
                  {this.renderRating(r.Rating)}
                  <h4 id="recipeAuthor">Created by: {r.RecipeAuthor}</h4>
                </div>
                <div className="backSide">
                  <h2 id="recipeName">{r.RecipeName}</h2>
                  <h3 id="recipeDescription">{description}</h3>
                </div>
              </NavLink>
            </div>
          </div>
        );
      });
    }
    return recipes;
  }
}

const mapStateToProps = (reduxState) => {
  return {
    recipe: reduxState.recipe,
  };
};

export default connect(mapStateToProps, null)(Recipe);
