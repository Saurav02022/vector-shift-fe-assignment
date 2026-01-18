# VectorShift Pipeline Builder

> Frontend Technical Assessment - A visual pipeline builder application

## 🌐 Live Demo

|              | URL                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------- |
| **Frontend** | [https://vectorshift-frontend-six.vercel.app](https://vectorshift-frontend-six.vercel.app)     |
| **Backend**  | [https://vectorshift-backend-5832.onrender.com](https://vectorshift-backend-5832.onrender.com) |

---

## 💡 Design Philosophy

This solution follows three core principles:

| Principle | Application                                                          |
| --------- | -------------------------------------------------------------------- |
| **KISS**  | Simple prop interfaces, standard React patterns, no over-engineering |
| **SRP**   | BaseNode handles structure, individual nodes handle their logic      |
| **DRY**   | One reusable BaseNode instead of duplicated container code           |

---

## 🧠 Implementation Approach

### Part 1: Node Abstraction

**Problem**: Original nodes had repetitive code - each manually created containers, headers, and handles.

**Solution**: Created `BaseNode.js` as a wrapper component.

```jsx
// Before: ~48 lines per node
<div style={{width: 200, height: 80, border: '1px solid black'}}>
  <Handle type="source" position={Position.Right} />
</div>

// After: Clean and focused
<BaseNode id={id} title="Input" outputs={[{ id: 'value' }]}>
  {/* unique content only */}
</BaseNode>
```

**5 new nodes demonstrating flexibility:**
| Node | Purpose | Inputs | Outputs |
|------|---------|--------|---------|
| Note | Sticky note | 0 | 0 |
| Math | Operations (+,-,\*,/) | 2 | 1 |
| File | File upload | 0 | 1 |
| Date | Date picker | 0 | 1 |
| Display | Output sink | 1 | 0 |

---

### Part 2: Styling

- **Theme**: Dark (slate-800/900/950) - aligns with VectorShift's product
- **Handles**: Blue for inputs, Green for outputs
- **Framework**: Tailwind CSS for consistent styling

---

### Part 3: Text Node Logic

**Auto-resize**:

```javascript
textarea.style.height = "auto";
textarea.style.height = textarea.scrollHeight + "px";
```

**Variable detection**:

```javascript
/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
```

| Pattern       | Creates Handle?            |
| ------------- | -------------------------- |
| `{{name}}`    | ✅ Yes                     |
| `{{user_id}}` | ✅ Yes                     |
| `{{123}}`     | ❌ No (starts with number) |
| `{{my-var}}`  | ❌ No (contains hyphen)    |

---

### Part 4: Backend Integration

**DAG Detection** using Kahn's algorithm (BFS topological sort):

1. Count in-degrees for each node
2. Start with nodes having 0 incoming edges
3. Process queue, decrementing neighbors' in-degrees
4. If all nodes visited → Valid DAG

**Time Complexity**: O(V + E)

---

## 📁 Project Structure

```
vector-shift/
├── frontend/
│   └── src/
│       ├── components/
│       │   └── BaseNode.js      # Reusable node wrapper
│       ├── nodes/
│       │   ├── inputNode.js     # Existing (refactored)
│       │   ├── outputNode.js    # Existing (refactored)
│       │   ├── llmNode.js       # Existing (refactored)
│       │   ├── textNode.js      # Existing (enhanced)
│       │   ├── noteNode.js      # NEW
│       │   ├── mathNode.js      # NEW
│       │   ├── fileNode.js      # NEW
│       │   ├── dateNode.js      # NEW
│       │   └── displayNode.js   # NEW
│       ├── App.js
│       ├── ui.js                # ReactFlow canvas
│       ├── toolbar.js           # Node toolbar
│       ├── submit.js            # API integration
│       └── store.js             # Zustand store
│
└── backend/
    ├── main.py                  # FastAPI server
    └── requirements.txt
```

---

## 🛠️ Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | React 18, ReactFlow, Zustand, Tailwind CSS |
| Backend  | Python, FastAPI, Uvicorn                   |

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+

### Frontend

```bash
cd frontend
npm install
npm run start
# Runs on http://localhost:3000
```

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
# Runs on http://localhost:8000
```

---

## 🔗 API

### POST `/pipelines/parse`

**Request:**

```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```
