import { GeneralTrace } from '@voiceflow/general-types';

import { UserAnswer } from '../store/slices/chat';

export interface TraceProps<T extends GeneralTrace | UserAnswer> {
  trace: T;
  onButtonClick?: (btn: string) => void;
}
