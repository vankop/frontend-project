import { GeneralTrace, IntentRequest, LaunchRequest, RequestType, TextRequest } from '@voiceflow/general-types';
import axios from 'axios';

interface Options {
  baseUri: string;
  apiKey: string;
  versionId: string;
}

interface ApiClient {
  launch(user: string): Promise<Array<GeneralTrace>>;
  interactButton(user: string, button: string): Promise<Array<GeneralTrace>>;
  interact(user: string, text: string): Promise<Array<GeneralTrace>>;
}

// eslint-disable-next-line import/prefer-default-export
export function createApiClient(options: Options): ApiClient {
  const baseUri = options.baseUri.replace(/\/$/, '');
  const { apiKey } = options;
  const { versionId } = options;

  const interact = async (user: string, message: string): Promise<GeneralTrace[]> => {
    const request: TextRequest = { type: RequestType.TEXT, payload: message };

    const { data } = await axios.post(
      `${baseUri}/state/${versionId}/user/${user}/interact`,
      { request, config: { tts: true } },
      { headers: { Authorization: apiKey } }
    );

    return data;
  };

  const interactButton = async (user: string, button: string): Promise<GeneralTrace[]> => {
    const request: IntentRequest = { type: RequestType.INTENT, payload: { query: button, intent: { name: button }, entities: [] } };

    const { data } = await axios.post(
      `${baseUri}/state/${versionId}/user/${user}/interact`,
      { request, config: { tts: true } },
      { headers: { Authorization: apiKey } }
    );

    return data;
  };

  const launch = async (user: string): Promise<GeneralTrace[]> => {
    // @ts-expect-error should work
    const request: LaunchRequest = { type: RequestType.LAUNCH };

    const { data } = await axios.post(
      `${baseUri}/state/${versionId}/user/${user}/interact`,
      { request, config: { tts: true } },
      { headers: { Authorization: apiKey } }
    );

    return data;
  };

  return { interact, interactButton, launch };
}
