import NodeCG from 'nodecg/types';
import { setNodeCGContext } from './nodecgContext';
import { logError, logInfo } from '../utils/utils';

module.exports = (nodecg: NodeCG.ServerAPI) => {
  setNodeCGContext(nodecg);

  initializeExtension(nodecg)
    .then(() => logInfo('Successfully initialized event supplimentaries'))
    .catch(e => {
      logError('Failed to initialize event supplimentaries!');
      console.error(e);
    });
};

// Imports need to be lazy loaded so that the nodecg context is set before initializing replicants
async function initializeExtension(nodecg: NodeCG.ServerAPI): Promise<void> {
  const { startCountdownInterval } = await import('./countdown');
  const { startFoobarNowPlayingInterval } = await import('./foobarNowPlaying');
 
  // Countdown interval
  startCountdownInterval(nodecg);

  // Foobar Now Playing interval
  startFoobarNowPlayingInterval(nodecg);
}