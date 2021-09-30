import { Dispatch } from 'redux';

import { createApiClient } from '../../api';
import { answer, append } from '../actions';

const api = createApiClient({
  baseUri: 'https://general-runtime.voiceflow.com',
  // eslint-disable-next-line no-secrets/no-secrets
  apiKey: 'VF.6154b3fb732ec0001bca5332.kUyXxTfAgKKn4qCnI3R5KxnV1KYBeNQNrSmjyQP2vi',
  versionId: '61549e90b9731800060250ab',
});

export const startChat = (user: string) => async (dispatch: Dispatch) => {
  const traces = await api.launch(user);

  dispatch(
    append({
      traces,
      userId: user,
    })
  );
};

export const chatInteract = (user: string, text: string) => async (dispatch: Dispatch) => {
  dispatch(
    answer({
      userId: user,
      answer: {
        type: 'answer',
        payload: {
          type: 'text',
          message: text,
        },
      },
    })
  );
  const traces = await api.interact(user, text);

  dispatch(
    append({
      traces,
      userId: user,
    })
  );
};

export const chatInteractButton = (user: string, button: string) => async (dispatch: Dispatch) => {
  dispatch(
    answer({
      userId: user,
      answer: {
        type: 'answer',
        payload: {
          type: 'button',
          message: button,
        },
      },
    })
  );
  const traces = await api.interactButton(user, button);

  dispatch(
    append({
      traces,
      userId: user,
    })
  );
};
