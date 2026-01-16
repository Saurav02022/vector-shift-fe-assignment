// fileNode.js
// File upload node

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const FileNode = ({ id, data }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <BaseNode id={id} title="File" outputs={[{ id: 'file' }]}>
      <div className="flex flex-col gap-2 max-w-[180px] overflow-hidden">
        <label className="cursor-pointer">
          <span className="inline-block py-1 px-3 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white transition-colors">
            Choose File
          </span>
          <input 
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {fileName ? (
          <div className="text-xs text-green-400 truncate" title={fileName}>
            ✓ {fileName}
          </div>
        ) : (
          <div className="text-xs text-slate-500">
            No file chosen
          </div>
        )}
      </div>
    </BaseNode>
  );
};
