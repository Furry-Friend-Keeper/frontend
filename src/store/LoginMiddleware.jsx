
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userInfo', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Function to load state from localStorage
export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userInfo');
    if (serializedState === null) {
      return undefined; // No state in localStorage, return undefined to use the initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Middleware to save state changes to localStorage
export const localStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  if(state.auth.accessToken !== null) {
    saveStateToLocalStorage(state);
  }
  return result;
};

