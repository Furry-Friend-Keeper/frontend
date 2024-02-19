import { configureStore } from '@reduxjs/toolkit'
import { 
    localStorageMiddleware, 
    loadStateFromLocalStorage 
} from './LoginMiddleware';
// import AuthReducer from './AuthReducer'
import AuthReducer from './AuthSlice';

const store = configureStore({
    reducer : {
        auth : AuthReducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState: loadStateFromLocalStorage()
})

export default store;