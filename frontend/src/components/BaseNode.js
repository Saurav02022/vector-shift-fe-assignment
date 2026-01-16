// components/BaseNode.js
// Reusable base component for all pipeline nodes

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => {
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-lg min-w-[200px]">
      {/* Header */}
      <div className="bg-slate-700 px-3 py-2 rounded-t-lg border-b border-slate-600">
        <span className="text-white font-semibold text-sm">{title}</span>
      </div>

      {/* Body */}
      <div className="p-3 text-slate-300 text-sm">
        {children}
      </div>

      {/* Input Handles (Left Side) */}
      {inputs.map((input, index) => {
        const position = input.position ?? (inputs.length === 1 ? 50 : 20 + (60 / (inputs.length - 1)) * index);
        return (
          <Handle
            key={`${id}-${input.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{ top: `${position}%` }}
            className="!bg-blue-500 !w-3 !h-3"
          />
        );
      })}

      {/* Output Handles (Right Side) */}
      {outputs.map((output, index) => {
        const position = output.position ?? (outputs.length === 1 ? 50 : 20 + (60 / (outputs.length - 1)) * index);
        return (
          <Handle
            key={`${id}-${output.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={{ top: `${position}%` }}
            className="!bg-green-500 !w-3 !h-3"
          />
        );
      })}
    </div>
  );
};
