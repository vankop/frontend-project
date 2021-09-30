import chatSlice from './slices/chat';

const { clear, append, user } = chatSlice.actions;

export { append, clear, user };
