import { SpeakTrace } from '@voiceflow/general-types';
import React from 'react';

import { TraceProps } from './types';

const SpeakTraceComponent: React.FC<TraceProps<SpeakTrace>> = ({ trace, onSpeakClick }) => {
  return (
    <div className="bot speak">
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <div onClick={() => onSpeakClick && onSpeakClick(trace)}>▶️</div>
      {trace.payload.message}
    </div>
  );
};

export default SpeakTraceComponent;
