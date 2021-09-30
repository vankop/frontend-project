import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { GeneralTrace } from '@voiceflow/general-types';

interface State {
  users: string[];
  blocks: {
    [k: string]: GeneralTrace[];
  };
}

const chatSlice = createSlice<State, SliceCaseReducers<State>>({
  name: 'chat',
  initialState: {
    blocks: {},
    users: [],
  },
  reducers: {
    clear: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.blocks[userId]) {
        const newBlocks = { ...state.blocks };
        delete newBlocks[userId];
        // eslint-disable-next-line no-param-reassign
        state.blocks = newBlocks;
      }
    },
    append: (state, action: PayloadAction<{ userId: string; traces: GeneralTrace[] }>) => {
      const { userId, traces } = action.payload;
      const blocks = state.blocks[userId];
      if (!blocks) {
        // eslint-disable-next-line no-param-reassign
        state.blocks[userId] = traces;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.blocks[userId] = [...blocks, ...traces];
      }
    },
    user: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = [...state.users, action.payload];
    },
  },
});

export const selectUsers = (state: State): string[] => state.users;
export const selectChatBlocks =
  (user: string) =>
  (state: State): GeneralTrace[] =>
    state.blocks[user] || [];

export default chatSlice;
