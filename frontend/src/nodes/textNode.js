// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from '../components/BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Parse text for variables
  useEffect(() => {
    // Variable detection regex - matches valid JS variable names in {{ }}
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(variableRegex)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    setVariables(uniqueVars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  // Create dynamic input handles for variables
  const dynamicInputs = variables.map((v, index) => ({
    id: v,
    position: variables.length === 1 ? 50 : 20 + (60 / (variables.length - 1)) * index
  }));

  return (
    <BaseNode 
      id={id} 
      title="Text" 
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
    >
      <label className="flex flex-col gap-1">
        <span className="text-xs text-slate-400">Text</span>
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)}
          className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500 resize-none min-h-[60px] min-w-[150px]"
          rows={1}
        />
      </label>
      {variables.length > 0 && (
        <div className="mt-2 text-xs text-slate-500">
          Variables: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};
