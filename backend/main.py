from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def check_dag(nodes, edges):
    """
    Check if the graph formed by nodes and edges is a DAG (Directed Acyclic Graph).
    Uses Kahn's algorithm for topological sorting.
    Returns True if no cycle exists (valid DAG), False otherwise.
    """
    if not nodes:
        return True
    
    # Build set of node IDs
    node_ids = {n['id'] for n in nodes}
    
    # Build adjacency list and in-degree count
    in_degree = {nid: 0 for nid in node_ids}
    graph = defaultdict(list)
    
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in node_ids and tgt in node_ids:
            graph[src].append(tgt)
            in_degree[tgt] = in_degree.get(tgt, 0) + 1
    
    # Start with nodes that have no incoming edges
    queue = deque([n for n in node_ids if in_degree[n] == 0])
    visited = 0
    
    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes visited, no cycle exists
    return visited == len(node_ids)

@app.post('/pipelines/parse')
def parse_pipeline(data: dict = Body(...)):
    """
    Parse the pipeline and return analysis.
    """
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = check_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
