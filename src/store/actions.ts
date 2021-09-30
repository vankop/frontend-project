import { GeneralTrace } from '@voiceflow/general-types';

import chatSlice, { UserAnswer } from './slices/chat';

const { clear, append, answer: answerAction, input: inputAction, user } = chatSlice.actions;

const appendById = (userId: string) => (traces: Array<GeneralTrace>) =>
  append({
    userId,
    traces,
  });

const answerById = (userId: string) => (answer: UserAnswer) =>
  answerAction({
    userId,
    answer,
  });

const inputById = (userId: string) => (input: string) =>
  inputAction({
    userId,
    input,
  });

export { answerById, appendById, clear, inputById, user };
