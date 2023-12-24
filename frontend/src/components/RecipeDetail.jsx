import React from "react";
import { useParams } from "react-router-dom";
import recipeData from "../data/recipeData";

const RecipeDetail = () => {
  let { id } = useParams();
  const recipe = recipeData.find((r) => r.id === parseInt(id, 10));

  return (
    <div>
      <h1>Recipe Detail Page: {recipe.name}</h1>
      {/* Render the recipe details here */}
    </div>
  );
};

export default RecipeDetail;
