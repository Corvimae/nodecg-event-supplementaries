import NodeCG from 'nodecg/types';

let context: NodeCG.ServerAPI;

export function getNodeCGContext(): NodeCG.ServerAPI { return context }

export function setNodeCGContext(nodecg: NodeCG.ServerAPI) {
  context = nodecg;
}