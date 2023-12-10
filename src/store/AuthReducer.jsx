import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    accessToken : localStorage.getItem('accessToken') || null,
    role : ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState, 
    reducers : {
        login(state, action) {
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;
            // Store token in localStorage
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        logout(state) {
            state.accessToken = null;
            // Clear token from localStorage on logout
            localStorage.removeItem('accessToken');        
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;