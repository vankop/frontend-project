import { GeneralTrace, TraceType } from '@voiceflow/general-types';
import React from 'react';

import ChoiceTrace from './ChoiceTrace';
import ImageTrace from './ImageTrace';
import SpeakTrace from './SpeakTrace';
import TextTrace from './TextTrace';
import { TraceProps } from './types';

const TraceComponent: React.FC<TraceProps<GeneralTrace>> = ({ id, trace, onButtonClick }) => {
  switch (trace.type) {
    case TraceType.CHOICE:
      return <ChoiceTrace id={id} trace={trace} onButtonClick={onButtonClick} />;
    case TraceType.SPEAK:
      return <SpeakTrace id={id} trace={trace} />;
    case TraceType.VISUAL:
      return <ImageTrace id={id} trace={trace} />;
    // @ts-expect-error text trace?
    case 'text':
      return <TextTrace id={id} trace={trace} />;
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
