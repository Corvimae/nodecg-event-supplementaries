import { activeLowerThird, isLowerThirdAnimating, lowerThirdAnimationDurationMs, lowerThirdDisplayDurationMs } from './replicants';
import type NodeCG from 'nodecg/types';

const pendingLowerThirds: Record<string, unknown>[] = [];

let isLowerThirdShowPending = false;
let clearLowerThirdTimeoutId: NodeJS.Timeout | null = null;

export function setLowerThirdAnimating() {
  isLowerThirdAnimating.value = true;

  setTimeout(() => {
    isLowerThirdAnimating.value = false;
  },  lowerThirdAnimationDurationMs.value);
}

export function clearLowerThird() {
  if (clearLowerThirdTimeoutId) clearTimeout(clearLowerThirdTimeoutId);
  
  setLowerThirdAnimating();

  activeLowerThird.value = null;
  clearLowerThirdTimeoutId = null;
}

export function showNextLowerThird() {
  if (pendingLowerThirds.length > 0) {
    const [nextLowerThird] = pendingLowerThirds.splice(0, 1);

    activeLowerThird.value = nextLowerThird;
  
    setLowerThirdAnimating();
    
    if (!nextLowerThird.indefinite) {
      clearLowerThirdTimeoutId = setTimeout(() => {
        clearLowerThirdTimeoutId = null;
        clearLowerThird();
      }, lowerThirdDisplayDurationMs.value);
    }
  }
}

function enqueueLowerThird(data: Record<string, unknown>) {
  pendingLowerThirds.push(data);

  if (activeLowerThird.value === null && !isLowerThirdShowPending) {
    showNextLowerThird();
  } else {
    clearLowerThird();
    isLowerThirdShowPending = true;

    setTimeout(() => {
      showNextLowerThird();
      isLowerThirdShowPending = false;
    }, lowerThirdAnimationDurationMs.value);
  }
}

export function startLowerThirdListeners(nodecg: NodeCG.ServerAPI) {
  const bundleOptions = (nodecg.bundleConfig.lowerThirds ?? {}) as Record<string, unknown>;

  lowerThirdAnimationDurationMs.value = (bundleOptions.animationDurationMs ?? 500) as number;
  lowerThirdDisplayDurationMs.value =  (bundleOptions.animationDurationMs ?? 10_000) as number

  nodecg.listenFor('lowerThirds:request', async data => {
    enqueueLowerThird(data);
  });

  nodecg.listenFor('lowerThirds:hideVisible', async () => {
    clearLowerThird();
    isLowerThirdShowPending = false;

    setTimeout(() => {
      showNextLowerThird();
      isLowerThirdShowPending = false;
    }, lowerThirdAnimationDurationMs.value);
  });

}