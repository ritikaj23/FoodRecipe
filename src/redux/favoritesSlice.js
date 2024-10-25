import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Stores the user's favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const recipeId = action.payload.idFood; // Extract the recipe ID from the payload
      const existingRecipe = state.favoriterecipes.find((recipe) => recipe.idFood === recipeId); // Check if the recipe already exists in favorites

      if (existingRecipe) {
        // If it exists, remove it from the favorites
        state.favoriterecipes = state.favoriterecipes.filter((recipe) => recipe.idFood !== recipeId);
      } else {
        // If it doesn't exist, add it to the favorites
        state.favoriterecipes.push(action.payload);
      }
      console.log('favoriterecipes:', state.favoriterecipes); // Debugging line to check current favorites
    },
  },
});

// Export the action for toggling favorites
export const { toggleFavorite } = favoritesSlice.actions;

// Export the reducer to be used in the store
export default favoritesSlice.reducer;
