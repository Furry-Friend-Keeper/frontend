import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
    "/at3/login",
    async ({ email, password }, {rejectWithValue}) => {
        try {
            const { data } = await axios.post(
                import.meta.env.VITE_USER_LOGIN,
                { email, password }
            )
             // store user's token in local storage
             localStorage.setItem('accessToken', data.accessToken)
             return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const registerKeeper = createAsyncThunk(
    "/at3/signup",
    async ({ name, detail, contact, phone, categoryId, email, password, role, address }, { rejectWithValue }) => {
        try {
            await axios.post(
                import.meta.env.VITE_KEEPER_SIGNUP,
                { name, detail, contact, phone, categoryId, email, password, role, address }
            )
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)

