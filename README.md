Recipe Search App

A React-based Recipe Search Application that allows users to search for recipes, view recipe details, and see suggestions dynamically.

Features

Live Recipe Search: Search recipes dynamically with suggestions.

Debounced Search: Efficient search implementation with a 500ms delay.

Recipe Details Popup: View full recipe details in a modal popup.

Dynamic Filtering: Display relevant recipes based on user input.

Responsive UI: Mobile-friendly design using Bootstrap.
File Structure

src/RecipeSearch.js - Main component for search functionality.

src/FullRecipe.js - Component to display full recipe details in a popup.

src/App.js - Entry point to render the application.

Technologies Used

React.js - Frontend framework

Bootstrap - Styling and responsiveness

Fetch API - To retrieve recipe data from https://dummyjson.com/recipes

Usage

Start typing in the search bar to find recipes.

Click on a suggested recipe to view details.

Click "Full Recipe" to see detailed ingredients and instructions.

Close the popup using the "Close" button.