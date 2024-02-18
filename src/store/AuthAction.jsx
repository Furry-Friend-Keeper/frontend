import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }, {rejectWithValue}) => {
        try {
            const { data } = await axios.post(
                import.meta.env.VITE_USER_LOGIN,
                { email, password }
            )
             // store user's token in local storage
            //  localStorage.setItem('userInfo', JSON.stringify(data))
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
    "auth/signup-keeper",
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
export const registerOwner = createAsyncThunk(
    "auth/signup-owner",
    async ({ firstname, lastname, phone, petname, email, password, role }, { rejectWithValue }) => {
        try {
            await axios.post(
                import.meta.env.VITE_OWNER_SIGNUP,
                { firstname, lastname, phone, petname, email, password, role }
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

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { getState }) => {
      const state = getState();
      const { data } = await axios.get(import.meta.env.VITE_REFRESH_TOKEN)
      return data; // Should include the new access token
    }
  );

