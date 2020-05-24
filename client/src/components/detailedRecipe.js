import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Custom Imports */
import hashCode from './utils';

class DetailedRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { current: r } = this.props.recipe;
    const directions = r.directions.map((d, idx) => {
      console.log(typeof (d));
      return <div key={hashCode(d)}>{`${idx}:  ${d}`}</div>;
    });
    const ingredients = r.ingredients.map((i) => {
      return <div key={hashCode(i)}>{i}</div>;
    });
    const categories = r.categories.map((c) => {
      return <span key={hashCode(c)}>{c}</span>;
    });
    console.log(r);
    return (
      <div>
        <h2>{r.recipeName} {r.rating}</h2>
        <h3>{r.description}</h3>
        <h4>{r.recipeAuthor}</h4>
        <div id="ingredients-directions">
          <div>
            {ingredients}
          </div>
          <div>
            {directions}
          </div>
        </div>
        <div id="categories">
          {categories}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    recipe: reduxState.recipe,
  };
};

export default connect(mapStateToProps, null)(DetailedRecipe);
