// llmNode.js

import { BaseNode } from '../components/BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode 
      id={id} 
      title="LLM" 
      inputs={[
        { id: 'system', position: 33 },
        { id: 'prompt', position: 66 }
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="text-slate-400 text-xs">
        <p>This is a LLM.</p>
        <div className="mt-2 text-slate-500">
          <div>• system</div>
          <div>• prompt</div>
        </div>
      </div>
    </BaseNode>
  );
};
