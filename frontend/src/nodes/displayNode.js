// displayNode.js
// Display/sink node - endpoint for pipelines

import { BaseNode } from '../components/BaseNode';

export const DisplayNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Display" inputs={[{ id: 'value' }]}>
      <div className="text-center py-2">
        <div className="text-2xl mb-1">📺</div>
        <span className="text-xs text-slate-400">Output Display</span>
      </div>
    </BaseNode>
  );
};
