import { GeneralTrace, TraceType } from '@voiceflow/general-types';
import React from 'react';

import { UserAnswer } from '../store/slices/chat';
import ChoiceTrace from './ChoiceTrace';
import ImageTrace from './ImageTrace';
import SpeakTrace from './SpeakTrace';
import TextTrace from './TextTrace';
import { TraceProps } from './types';
import UserAnswerComponent from './UserAnswer';

const TraceComponent: React.FC<TraceProps<GeneralTrace | UserAnswer>> = ({ trace, onButtonClick, onSpeakClick }) => {
  switch (trace.type) {
    case 'answer':
      return <UserAnswerComponent {...trace.payload} />;
    case TraceType.CHOICE:
      return <ChoiceTrace trace={trace} onButtonClick={onButtonClick} />;
    case TraceType.SPEAK:
      return <SpeakTrace trace={trace} onSpeakClick={onSpeakClick} />;
    case TraceType.VISUAL:
      return <ImageTrace trace={trace} />;
    // @ts-expect-error text trace?
    case 'text':
      return <TextTrace trace={trace} />;
    case TraceType.BLOCK:
    case TraceType.DEBUG:
    case TraceType.END:
    /* eslint-disable no-fallthrough */
    // @ts-expect-error undescribed trace
    case TraceType.PATH:
      return null;
    /* eslint-enable */
    default:
      throw new Error('not implemented');
  }
};

export default TraceComponent;
