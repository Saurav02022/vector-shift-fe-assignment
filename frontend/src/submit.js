// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Use environment variable for deployed backend, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();

            alert(
                `Pipeline Analysis\n\n` +
                `📊 Nodes: ${data.num_nodes}\n` +
                `🔗 Edges: ${data.num_edges}\n` +
                `✅ Valid DAG: ${data.is_dag ? 'Yes' : 'No'}`
            );
        } catch (error) {
            alert('Error: Could not connect to backend. Make sure the server is running on port 8000.');
            console.error('Submit error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center py-4 bg-slate-900 border-t border-slate-700">
            <button 
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
                Submit Pipeline
            </button>
        </div>
    );
}
