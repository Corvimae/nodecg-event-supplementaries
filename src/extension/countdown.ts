import type NodeCG from 'nodecg/types';
import { countdownSecondsRemaining, isCountdownRunning } from './replicants';

export function startCountdownInterval(_nodecg: NodeCG.ServerAPI) {
  setInterval(() => {
    if (isCountdownRunning.value) {
      if (countdownSecondsRemaining.value > 0) {
        countdownSecondsRemaining.value -= 1;
      }

      if (countdownSecondsRemaining.value <= 0) isCountdownRunning.value = false;
    }
  }, 1000);
}