import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import applyPersistence from './persistence';
import chatSlice from './slices/chat';

const store = configureStore({
  reducer: chatSlice.reducer,
  middleware: [thunk],
});

applyPersistence(store);

export default store;
