import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Recipe extends Component {
  render() {
    const recipes = this.props.recipe.all.map((r) => {
      return (
        <div key={r.id} className="recipe-container">
          <div className="recipe-container-inner">
            <NavLink id="deLink" to={`/recipe/${r.id}`}>
              <div className="frontSide">
                <h2 id="recipeName">{r.recipeName}</h2>
                <h3 id="recipeRating">Rated {r.rating}/5</h3>
                <h4 id="recipeAuthor">Created by: {r.recipeAuthor}</h4>
              </div>
              <div className="backSide">
                <h2 id="recipeName">{r.recipeName}</h2>
                <h3 id="recipeDescription">{r.description}</h3>
              </div>
            </NavLink>
          </div>
        </div>
      );
    });
    return recipes;
  }
}

const mapStateToProps = (reduxState) => {
  return {
    recipe: reduxState.recipe,
  };
};

export default connect(mapStateToProps, null)(Recipe);
