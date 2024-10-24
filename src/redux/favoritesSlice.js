import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const recipeId = action.payload.idFood;
      const existingRecipe = state.favoriterecipes.find((recipe) => recipe.idFood === recipeId);

      if (existingRecipe) {
        state.favoriterecipes = state.favoriterecipes.filter((recipe) => recipe.idFood !== recipeId);
      } else {
        state.favoriterecipes.push(action.payload);
      }
      console.log('favoriterecipes:', state.favoriterecipes); // Add this line
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;