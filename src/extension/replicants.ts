import { BUNDLE_NAME } from '../utils/utils';
import { getNodeCGContext } from './nodecgContext';

const nodecg = getNodeCGContext();

export const isCountdownRunning = nodecg.Replicant<boolean>('isCountdownRunning', BUNDLE_NAME, {
  defaultValue: false,
});

export const countdownSecondsRemaining = nodecg.Replicant<number>('countdownSecondsRemaining', BUNDLE_NAME, {
  defaultValue: 0,
});
