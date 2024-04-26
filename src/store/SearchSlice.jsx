import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchInput: "",
  },
  reducers: {
    findSearch: (state, action) => {
        // console.log(action.payload)
      state.searchInput = action.payload;
    },
  },
});

export const { findSearch } = searchSlice.actions;

export default searchSlice.reducer;