import React from "react";

const FullRecipe = ({ recipe, closePopup }) => {
  if (!recipe) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{recipe.name}</h2>
        <img src={recipe.image} alt={recipe.name} style={{width:"200px", height:"200px"}}/>
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h4>Instructions</h4>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <button className="btn btn-danger mt-3" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FullRecipe;
