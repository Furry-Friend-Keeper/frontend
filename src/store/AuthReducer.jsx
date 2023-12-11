import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    accessToken : localStorage.getItem('accessToken') || null,
    role : localStorage.getItem('role') || null,
    id : localStorage.getItem('id') || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState, 
    reducers : {
        login(state, action) {
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;
            state.id = action.payload.id;
            // Store token in localStorage
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('id', action.payload.id);
        },
        logout(state) {
            state.accessToken = null;
            // Clear token from localStorage on logout
            // localStorage.removeItem('accessToken');        
            localStorage.clear();        
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;