import { BUNDLE_NAME } from '../utils/utils';
import { getNodeCGContext } from './nodecgContext';

const nodecg = getNodeCGContext();

export const isCountdownRunning = nodecg.Replicant<boolean>('countdown:isRunning', BUNDLE_NAME, {
  defaultValue: false,
});

export const countdownSecondsRemaining = nodecg.Replicant<number>('countdown:secondsRemaining', BUNDLE_NAME, {
  defaultValue: 0,
});

export const foobarSourceFile = nodecg.Replicant<string>('foobar:sourceFile', BUNDLE_NAME, {
  defaultValue: '',
});

export const foobarNowPlaying = nodecg.Replicant<string>('foobar:nowPlaying', BUNDLE_NAME, {
  defaultValue: '',
});

export const hostName = nodecg.Replicant<string>('host:name', BUNDLE_NAME, {
  defaultValue: '',
})

export const hostPronouns = nodecg.Replicant<string>('host:pronouns', BUNDLE_NAME, {
  defaultValue: '',
})

export const activeLowerThird = nodecg.Replicant<Record<string, unknown> | null>('lowerThirds:active', BUNDLE_NAME, {
  defaultValue: null,
  persistent: false,
});

export const isLowerThirdAnimating = nodecg.Replicant<boolean>('lowerThirds:isAnimating', BUNDLE_NAME, {
  defaultValue: false,
  persistent: false,
});

export const lowerThirdLastRequested = nodecg.Replicant<number>('lowerThirds:lastRequested', BUNDLE_NAME, {
  defaultValue: 0,
  persistent: false,
});

export const lowerThirdDisplayDurationMs = nodecg.Replicant<number>('lowerThirds:displayDurationMs', BUNDLE_NAME, {
  defaultValue: 10_000,
  persistent: false,
});

export const lowerThirdAnimationDurationMs = nodecg.Replicant<number>('lowerThirds:animationDurationMs', BUNDLE_NAME, {
  defaultValue: 500,
  persistent: false,
});