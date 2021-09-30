import { SpeakTrace } from '@voiceflow/general-types';
import React from 'react';

import { TraceProps } from './types';

const SpeakTraceComponent: React.FC<TraceProps<SpeakTrace>> = ({ trace }) => {
  return <dd>{trace.payload.message}</dd>;
};

export default SpeakTraceComponent;
