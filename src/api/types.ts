export type ChatBlock = SpeakBlock | ChoiceBlock;

export interface Button {
  name: string;
}

export interface SpeakBlock {
  type: 'speak';
  payload: {
    src: string;
    message: string;
  };
}

export interface ChoiceBlock {
  type: 'choice';
  payload: {
    buttons?: Button[];
  };
}
