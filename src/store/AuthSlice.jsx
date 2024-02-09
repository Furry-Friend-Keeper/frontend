import { createSlice } from "@reduxjs/toolkit";
import { registerKeeper, userLogin } from './AuthAction'

// initialize accessToken from local storage
const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null

const initialState = {
    loading: false,
    userInfo: {},
    accessToken: null,
    error: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('accessToken') // deletes token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
          },
    },
    extraReducers: (builder) => {
        builder
        // login user
        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.accessToken = action.payload.accessToken;
          })
          .addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        // register keeper
          .addCase(registerKeeper.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registerKeeper.fulfilled, (state) => {
            state.loading = false;
            state.success = true; // registration successful
          })
          .addCase(registerKeeper.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },   
})

export const { logout } = authSlice.actions
export default authSlice.reducer;