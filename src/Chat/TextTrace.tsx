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
  return <div className="bot">{trace.payload.message}</div>;
};

export default TextTraceComponent;
