import { ChoiceTrace } from '@voiceflow/general-types';
import React from 'react';

import { TraceProps } from './types';

const ChoiceTraceComponent: React.FC<TraceProps<ChoiceTrace>> = ({ trace, onButtonClick }) => {
  return (
    <dd>
      {trace.payload.buttons.map(({ name }) => (
        <button key={name} style={{ marginLeft: '10px' }} onClick={() => onButtonClick && onButtonClick(name)}>
          {name}
        </button>
      ))}
    </dd>
  );
};

export default ChoiceTraceComponent;
