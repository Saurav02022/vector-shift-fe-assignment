// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
            <div className="flex flex-wrap gap-3">
                {/* Original Nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                
                {/* Divider */}
                <div className="w-px bg-slate-700 mx-2"></div>
                
                {/* New Nodes */}
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='file' label='File' />
                <DraggableNode type='date' label='Date' />
                <DraggableNode type='display' label='Display' />
            </div>
        </div>
    );
};
