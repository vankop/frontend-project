import { SpeakTrace } from '@voiceflow/general-types';
import React from 'react';

import { TraceProps } from './types';

const SpeakTraceComponent: React.FC<TraceProps<SpeakTrace>> = ({ trace }) => {
  return <div className="bot">{trace.payload.message}</div>;
};

export default SpeakTraceComponent;
