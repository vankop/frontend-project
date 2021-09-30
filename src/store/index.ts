import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import chatSlice from './slices/chat';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = configureStore({
  reducer: chatSlice.reducer,
  middleware: [thunk],
});

export default store;
