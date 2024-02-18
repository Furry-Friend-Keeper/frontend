import { createSlice } from "@reduxjs/toolkit";
import { registerKeeper, userLogin, registerOwner, refreshToken } from './AuthAction'

// initialize accessToken from local storage

const initialState = {
    loading: false,
    userInfo: {},
    accessToken: null,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userInfo') // deletes token from storage
            state.loading = false
            state.userInfo = {}
            state.accessToken = null
            state.error = null
            state.success = false
          },
          resetStore: (state) => {
            state.error = null; // Resetting error to null
            state.success = false
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
            state.success = true;
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
          })
        // register owner
          .addCase(registerOwner.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registerOwner.fulfilled, (state) => {
            state.loading = false;
            state.success = true; // registration successful
          })
          .addCase(registerOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

          // refresh token
          builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
          });
      },   
})

export const { logout, resetStore } = authSlice.actions
export default authSlice.reducer;