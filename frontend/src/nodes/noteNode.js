// noteNode.js
// A sticky note node with no connections

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode id={id} title="Note">
      <textarea 
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
        className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-yellow-500 resize-none min-h-[60px] w-full"
        rows={3}
      />
    </BaseNode>
  );
};
