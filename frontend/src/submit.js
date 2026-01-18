// submit.js

import { useState } from 'react';
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
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            // Show success alert
            alert(
                `Pipeline Analysis\n\n` +
                `📊 Nodes: ${data.num_nodes}\n` +
                `🔗 Edges: ${data.num_edges}\n` +
                `✅ Valid DAG: ${data.is_dag ? 'Yes' : 'No'}`
            );
        } catch (error) {
            // Show error alert
            console.error('Submit error:', error);
            alert(`Error: ${error.message || 'Could not connect to backend'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-4 bg-slate-900 border-t border-slate-700">
            <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2 font-semibold rounded-lg shadow-lg transition-all duration-200 ${
                    loading 
                        ? 'bg-violet-400 cursor-not-allowed' 
                        : 'bg-violet-600 hover:bg-violet-700 hover:shadow-xl'
                } text-white`}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
}
