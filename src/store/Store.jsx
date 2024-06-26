import { configureStore } from '@reduxjs/toolkit'
import { 
    localStorageMiddleware, 
    loadStateFromLocalStorage 
} from './LoginMiddleware';
// import AuthReducer from './AuthReducer'
import AuthReducer from './AuthSlice';
import LocationSlice from './LocationSlice';
import SearchSlice from './SearchSlice';

const store = configureStore({
    reducer : {
        auth : AuthReducer,
        location : LocationSlice,
        search: SearchSlice
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState: loadStateFromLocalStorage()
})

export default store;