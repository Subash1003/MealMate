import { createSlice } from "@reduxjs/toolkit";

// Holds the live text typed into the shared Navbar search input.
// Home reads it to filter restaurants by dish; RestaurantMenu reads it
// to filter the current restaurant's menu items.
const searchSlice = createSlice({
  name: "search",

  initialState: {
    text: "",
  },

  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },

    clearSearchText: (state) => {
      state.text = "";
    },
  },
});

export const { setSearchText, clearSearchText } = searchSlice.actions;

export default searchSlice.reducer;
