import React, { useState, useEffect } from "react";
import FullRecipe from "./FullRecipe"; // Import FullRecipe popup component

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  // Fetch all recipes initially
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setAllRecipes(data.recipes || []);
        setFilteredRecipes(data.recipes || []); // Show all recipes initially
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchAllRecipes();
  }, []);

  // Handle search with debounce (only updates suggestions, NOT the results)
  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (query.trim() !== "") {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = allRecipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(lowerCaseQuery)
        );

        setSuggestions(filtered.slice(0, 5)); // Show top 5 suggestions
      } else {
        setSuggestions([]); // Hide suggestions if search is empty
        setFilteredRecipes(allRecipes); // Restore all recipes
      }
    }, 500);

    setTimer(newTimer);
    return () => clearTimeout(newTimer);
  }, [query, allRecipes]);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (recipe) => {
    setQuery(recipe.name); // Fill search bar with the selected recipe name
    setFilteredRecipes([recipe]); // Show only the selected recipe
    setSuggestions([]); // Hide suggestions
  };

  // Handle clearing the input
  const handleClearInput = () => {
    setQuery("");
    setFilteredRecipes(allRecipes); // Restore all recipes
    setSuggestions([]); // Hide suggestions
  };

  // Handle Full Recipe button click
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsPopupOpen(true);
  };

  // Close popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Recipe Search</h1>
      
      {/* Search Input */}
      <div className="position-relative">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleInputChange}
          />
          {query && (
            <button className="btn btn-danger ms-2 mb-2" onClick={handleClearInput}>
              X
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow" style={{ zIndex: 1000 }}>
            {suggestions.map((recipe) => (
              <li
                key={recipe.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleSuggestionClick(recipe)}
                style={{ cursor: "pointer" }}
              >
                {recipe.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Recipe Cards */}
      <div className="row mt-3">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="col-12 col-md-4 mb-3">
              <div className="card shadow p-3">
                <img
                  className="card-img-top"
                  src={recipe.image}
                  alt={recipe.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    Prep Time: {recipe.prepTimeMinutes} mins | Cook Time: {recipe.cookTimeMinutes} mins
                  </p>
                  <button className="btn btn-primary" onClick={() => handleRecipeClick(recipe)}>
                    Full Recipe
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      {/* Full Recipe Popup */}
      {isPopupOpen && <FullRecipe recipe={selectedRecipe} closePopup={closePopup} />}
    </div>
  );
};

export default RecipeSearch;
