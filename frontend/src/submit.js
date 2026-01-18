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
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        // Reset states
        setLoading(true);
        setResult(null);
        setError(null);

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
            setResult(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to connect to backend');
            setResult(null);
            console.error('Submit error:', err);
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
                {loading ? 'Analyzing...' : 'Submit Pipeline'}
            </button>

            {/* Success Result */}
            {result && (
                <div className="mt-3 px-4 py-2 bg-green-900/50 border border-green-600 rounded-lg text-sm">
                    <span className="text-green-400 font-semibold">✅ Pipeline Analysis</span>
                    <div className="text-slate-300 mt-1">
                        📊 Nodes: <span className="font-semibold text-white">{result.num_nodes}</span>
                        {' • '}
                        🔗 Edges: <span className="font-semibold text-white">{result.num_edges}</span>
                        {' • '}
                        {result.is_dag ? (
                            <span className="text-green-400">✓ Valid DAG</span>
                        ) : (
                            <span className="text-red-400">✗ Not a DAG (has cycles)</span>
                        )}
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-3 px-4 py-2 bg-red-900/50 border border-red-600 rounded-lg text-sm">
                    <span className="text-red-400">❌ Error: {error}</span>
                </div>
            )}
        </div>
    );
}
