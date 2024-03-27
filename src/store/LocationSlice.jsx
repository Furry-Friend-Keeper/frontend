import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: JSON.parse(localStorage.getItem('currentLocation')) || null,
  },
  reducers: {
    setLocation: (state, action) => {
        console.log(action.payload)
      state.currentLocation = action.payload;
      localStorage.setItem('currentLocation', JSON.stringify(action.payload));
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;