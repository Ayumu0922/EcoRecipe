import React from "react";
import recipeData from "../data/recipeData";
import { Link } from "react-router-dom";

const Recipes = () => {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipeData.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
