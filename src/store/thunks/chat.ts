import { SpeakTrace, TraceType } from '@voiceflow/general-types';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { createApiClient } from '../../api';
import configuration from '../../configuration';
import createPlayer from '../../player';
import { answerById, appendById } from '../actions';
import { selectChatBlocks, State } from '../slices/chat';

const api = createApiClient(configuration);
const player = createPlayer();

export const startChat = (user: string) => async (dispatch: Dispatch) => {
  const traces = await api.launch(user);

  dispatch(appendById(user)(traces));
};

export const chatInteract = (user: string, text: string) => async (dispatch: Dispatch) => {
  dispatch(
    answerById(user)({
      type: 'answer',
      payload: {
        type: 'text',
        message: text,
      },
    })
  );
  const traces = await api.interact(user, text);

  dispatch(appendById(user)(traces));
};

export const chatInteractButton = (user: string, button: string) => async (dispatch: Dispatch) => {
  dispatch(
    answerById(user)({
      type: 'answer',
      payload: {
        type: 'button',
        message: button,
      },
    })
  );
  const traces = await api.interactButton(user, button);

  dispatch(appendById(user)(traces));
};

export const stopPlayer = () => () => player.stop();

export const playAudio =
  (user: string, block: SpeakTrace): ThunkAction<void, State, never, Action> =>
  (_, getState) => {
    const blocks = selectChatBlocks(user)(getState());

    let i = blocks.findIndex((bl) => bl === block);
    if (i < 0) return;

    const j = i;
    while (++i < blocks.length && blocks[i].type === TraceType.SPEAK);

    if (i - j === 1) {
      player.play(block.payload.src!);
    } else {
      i--;
      for (; i >= j; i--) {
        player.addToPlaylist(blocks[i].payload.src!);
      }
      player.playList();
    }
  };
