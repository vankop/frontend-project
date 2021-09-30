import React from 'react';

import { TraceProps } from './types';

interface TextTrace {
  type: 'text';
  payload: {
    message: string;
  };
}

// @ts-expect-error text trace?
const TextTraceComponent: React.FC<TraceProps<TextTrace>> = ({ trace }) => {
  return <dd>{trace.payload.message}</dd>;
};

export default TextTraceComponent;
