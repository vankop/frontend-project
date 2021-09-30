import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { GeneralTrace, TraceType } from '@voiceflow/general-types';

export interface UserAnswer {
  type: 'answer';
  payload: {
    type: 'text' | 'button';
    message: string;
  };
}

interface State {
  users: string[];
  form: {
    [k: string]: string;
  };
  blocks: {
    [k: string]: Array<UserAnswer | GeneralTrace>;
  };
}

const chatSlice = createSlice<State, SliceCaseReducers<State>>({
  name: 'chat',
  initialState: {
    blocks: {},
    form: {},
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
    input: (state, action: PayloadAction<{ userId: string; input: string }>) => {
      const { input, userId } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.form[userId] = input;
    },
    answer: (state, action: PayloadAction<{ userId: string; answer: UserAnswer }>) => {
      const { userId, answer } = action.payload;
      const blocks = state.blocks[userId];

      if (!blocks) {
        // eslint-disable-next-line no-param-reassign
        state.blocks[userId] = [answer];
      } else if (blocks[blocks.length - 1].type === TraceType.CHOICE) {
        const newBlocks = blocks.slice();
        newBlocks[blocks.length - 1] = answer;
        // eslint-disable-next-line no-param-reassign
        state.blocks[userId] = newBlocks;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.blocks[userId] = [...blocks, answer];
      }
    },
    addUser: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = [...state.users, action.payload];
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const users = new Set(state.users);
      users.delete(action.payload);
      // eslint-disable-next-line no-param-reassign
      state.users = Array.from(users);

      if (state.blocks[action.payload]) {
        const newBlocks = { ...state.blocks };
        delete newBlocks[action.payload];
        // eslint-disable-next-line no-param-reassign
        state.blocks = newBlocks;
      }

      if (state.form[action.payload]) {
        const newForm = { ...state.form };
        delete newForm[action.payload];
        // eslint-disable-next-line no-param-reassign
        state.form = newForm;
      }
    },
  },
});

export const selectUsers = (state: State): string[] => state.users;
export const selectChatBlocks =
  (user: string) =>
  (state: State): Array<UserAnswer | GeneralTrace> =>
    state.blocks[user] || [];
export const selectInput =
  (user: string) =>
  (state: State): string =>
    state.form[user] || '';

export default chatSlice;
