import type NodeCG from 'nodecg/types';
import { foobarNowPlaying, foobarSourceFile } from './replicants';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { logError } from '../utils/utils';

export function startFoobarNowPlayingInterval(_nodecg: NodeCG.ServerAPI) {
  function updateNowPlaying() {
    try {
      if (foobarSourceFile.value && statSync(foobarSourceFile.value)) {
        foobarNowPlaying.value = readFileSync(foobarSourceFile.value).toString();
      } else {
        foobarNowPlaying.value = '—';
      }
    } catch (e) {
      logError('Unable to update Foobar now playing data.');
      console.error(e);
    }
  }

  setInterval(updateNowPlaying, 5000);

  updateNowPlaying();

  foobarSourceFile.on('change', updateNowPlaying);
}