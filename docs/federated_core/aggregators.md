---
title: Aggregators
layout: default
parent: Federated Core & Communication
---
# Aggregation Strategies

The Aggregator is the mathematical core of the federated synchronization step. It dictates exactly how divergent client weights are mathematically fused into a consensus model.

FedPilot ships with two primary aggregation algorithms, both living in `src/core/aggregator/`.

---

## 1. FedAvg — Federated Averaging

The industry standard baseline. It performs a **weighted average** of all incoming model updates, where the weight for each client is proportional to the size of its local dataset.

$$w_{\text{global}} = \sum_{i=1}^{N} \frac{n_i}{N_{\text{total}}} \cdot w_i$$

Where $n_i$ is the number of local samples for client $i$, and $N_{\text{total}} = \sum n_i$.

**Characteristics:**
- **Best For**: IID (Independent and Identically Distributed) data, where clients hold roughly balanced class distributions.
- **Speed**: Extremely fast — a single weighted sum over the parameter tensors.
- **Weakness**: If clients have highly heterogeneous (non-IID) data, local gradients point in completely different directions. Averaging them directly causes *client drift* — the global model oscillates and can fail to converge entirely.

**Config:**
```yaml
aggregation_strategy: "FedAvg"
aggregation_sample_scaling: true  # Scale by n_i / N_total (recommended)
```

---

## 2. FedProx — Federated Proximal

Designed specifically to combat non-IID data divergence. FedProx modifies the **local training objective** by adding a proximal regularization term that anchors each client to the global model:

$$\min_w \sum_{i=1}^{N} F_i(w) + \frac{\mu}{2} \| w - w_{\text{global}} \|^2$$

This forces the local PyTorch optimizer to "stay close" to the global model during its local epochs, preventing aggressive overfitting to a weird local data slice.

**Characteristics:**
- **Best For**: Highly heterogeneous data (e.g., `data_distribution_kind: "90"` for extreme non-IID).
- **Speed**: Slightly slower — the proximal penalty is computed and added to the loss at each local step.
- **Hyperparameter**: Requires tuning the $\mu$ (mu) proximal coefficient.

**Config:**
```yaml
aggregation_strategy: "FedProx"
mu: 0.01    # Start here; increase for stronger regularization on severe non-IID
```

---

## When to Use Which

| Scenario | Recommended Strategy |
|----------|---------------------|
| IID data, same dataset across clients | `FedAvg` |
| Mild non-IID (`distribution_kind: "20"`) | `FedAvg` |
| Moderate non-IID (`distribution_kind: "50"`) | Either — benchmark both |
| Severe non-IID (`distribution_kind: "90"`) | `FedProx` |
| Dirichlet heterogeneity (`distribution_kind: "dir"`) | `FedProx` |
| FEMNIST or Shakespeare (natural non-IID) | `FedProx` |

> **Pro tip**: Enable data-driven clustering alongside `FedAvg`. By grouping clients with similar distributions into ICRF communities, you reduce within-community heterogeneity enough that `FedAvg` can converge effectively — without the `FedProx` overhead.

---

## Adding Custom Aggregators

Unlike topologies and metrics, **the aggregation layer does not use a decorator-based registry**. There is no `@register_aggregator` decorator in the codebase.

To integrate a novel algorithm (e.g., FedNova, SCAFFOLD, or geometric median aggregation):

1. **Inherit from `AggregatorBase`** and implement the `aggregate()` method:

```python
from src.core.aggregator.aggregator_base import AggregatorBase

class FedNovaAggregator(AggregatorBase):
    def aggregate(self, updates: list, weights: list) -> dict:
        # Your normalized averaging logic here
        ...
```

2. **Instantiate directly** inside the relevant Application or Schema executor (found in `src/applications/`) — the place where the aggregator is called during each FL round. No other files need to change.

For the four registries that **do** use decorator-based discovery, see the [Registries Layer](../registries/model_registry.md).

---

See also: [Inter-Cluster Ray Fabric (ICRF)](icrf.md) for how data-driven placement reduces the non-IID problem at the infrastructure level before aggregation even runs.

