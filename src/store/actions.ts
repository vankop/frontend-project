import chatSlice from './slices/chat';

const { clear, append, answer, user } = chatSlice.actions;

export { answer, append, clear, user };
