// dateNode.js
// Date/time picker node

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const DateNode = ({ id, data }) => {
  const [dateTime, setDateTime] = useState(data?.dateTime || '');

  return (
    <BaseNode id={id} title="Date" outputs={[{ id: 'date' }]}>
      <label className="flex flex-col gap-1">
        <span className="text-xs text-slate-400">Select Date/Time</span>
        <input 
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
        />
      </label>
    </BaseNode>
  );
};
