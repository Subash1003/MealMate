import { createSlice } from "@reduxjs/toolkit";

const CardSlice = createSlice({
  name: "Cart",
  initialState:{
    items: [],
  },
  reducers: {
   addItems: (state, action) => {
  const existingItem = state.items.find(
    (item) => item.card.info.id === action.payload.card.info.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.items.push({
      ...action.payload,
      quantity: 1,
    });
  }
},

    removeItems: (state, action) => {
      state.items = state.items.filter(
        (items) => items.card.info.id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.items = [];
    }
  }
}
);

export const {
  addItems,
  removeItems,
  clearCart

} = CardSlice.actions;

export default CardSlice.reducer;
