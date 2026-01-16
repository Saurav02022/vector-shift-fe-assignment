// mathNode.js
// Math operation node with two inputs

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode 
      id={id} 
      title="Math" 
      inputs={[
        { id: 'a', position: 33 },
        { id: 'b', position: 66 }
      ]}
      outputs={[{ id: 'result' }]}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-500">
          <div>• a (input)</div>
          <div>• b (input)</div>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-400">Operation</span>
          <select 
            value={operation} 
            onChange={(e) => setOperation(e.target.value)}
            className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
