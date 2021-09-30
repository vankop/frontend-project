import { GeneralTrace } from '@voiceflow/general-types';

export interface TraceProps<T extends GeneralTrace> {
  id: string;
  trace: T;
  onButtonClick?: (btn: string) => void
}
