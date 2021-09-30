import { VisualTrace } from '@voiceflow/general-types';
import { VisualType } from '@voiceflow/general-types/build/nodes/visual';
import React from 'react';

import { TraceProps } from './types';

const DEFAULT_DIMENSIONS = { width: 600, height: 400 };

const ImageTraceComponent: React.FC<TraceProps<VisualTrace>> = ({ trace }) => {
  if (trace.payload.visualType !== VisualType.IMAGE) {
    throw new Error('not implemented');
  }

  const { width, height } = trace.payload.dimensions || DEFAULT_DIMENSIONS;

  return <img src={trace.payload.image as string} alt="" width={width} height={height} />;
};

export default ImageTraceComponent;
