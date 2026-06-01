# Topology Registry

The Topology Registry (`src/registries/topologies/topology_registry.py`) manages all network graph builders. It decouples the mathematical definition of a network graph from the infrastructure that routes messages across it.

It exposes **two** distinct decorator types:

---

## 1. `@register_topology` — Adjacency Matrix Builder

Registers a function that generates the raw $N \times N$ NumPy adjacency matrix. The `TopologyManager` uses this matrix to enforce routing constraints.

```python
from src.registries.topologies.topology_registry import register_topology
import numpy as np

@register_topology("my_small_world")
def create_small_world_matrix(NUMBER_OF_CLIENTS, K_VALUE):
    """
    Return an NxN numpy adjacency matrix where matrix[i][j] = 1 
    if node i can send messages to node j.
    """
    n = NUMBER_OF_CLIENTS
    matrix = np.zeros((n, n))
    
    # Example: Simple Ring
    for i in range(n):
        matrix[i][(i + 1) % n] = 1
        matrix[(i + 1) % n][i] = 1
        
    return matrix
```

**Magic Parameter Injection:**
The function signature **must** use parameter names that exactly match attributes on the `ConfigValidator`. The registry uses Python introspection (`inspect.signature`) to read your argument names and automatically injects the matching values from the active configuration — no manual `config.get()` wiring needed.

---

## 2. `@register_network_builder` — Graph Object Builder

Registers a function that produces a richer `networkx.Graph` object. This graph is used by the `HybridAdjacencyMatrix` (in ICRF mode), topology visualization tools, and optional dynamic adaptation strategies.

```python
from src.registries.topologies.topology_registry import register_network_builder
import networkx as nx

@register_network_builder("my_small_world")
def build_small_world_network(node_ids, fed_id, NUMBER_OF_CLIENTS):
    """
    Return a NetworkX graph representing the topology.
    """
    G = nx.Graph()
    G.add_nodes_from(node_ids)
    
    # Example: Simple Ring
    n = len(node_ids)
    for i in range(n):
        G.add_edge(node_ids[i], node_ids[(i + 1) % n])
        
    return G
```

**Required Parameters:**
For network builders, you must accept `node_ids` (the list of actual string IDs, e.g., `["client_0", "client_1"]`) and `fed_id`. You may also request any `ConfigValidator` attribute just like the adjacency builder.

---

## Activating Your Custom Topology

Once registered, simply set the string key in `config.yaml`:

```yaml
federated_learning_topology: "my_small_world"
```

The system will call `build_topology()` which looks up your registered function automatically. No other framework files need to be modified.

See also: [Topology Manager](../orchestration/topology_manager.md) · [Topology Adaptation Registry](topology_adaptation_registry.md)
