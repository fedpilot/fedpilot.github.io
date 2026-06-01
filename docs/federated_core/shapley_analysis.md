# Shapley Value Analysis

The Shapley Value Executor (`src/applications/shapley/`) extends standard centralized federated learning with a **fairness and contribution measurement** framework based on cooperative game theory.

---

## What Are Shapley Values in FL?

In a federation, not all clients contribute equally to model quality. Some may have rich, high-quality datasets; others may have noisy, redundant, or even adversarially crafted data. Shapley values provide a principled, game-theoretic way to measure each client's **marginal contribution** to the global model — without accessing their raw data.

Formally, the Shapley value for client $i$ is:

$$\phi_i = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!\,(|N|-|S|-1)!}{|N|!} \left[ v(S \cup \{i\}) - v(S) \right]$$

Where:
- $N$ is the full set of clients.
- $S$ is any coalition (subset) of clients excluding $i$.
- $v(S)$ is the model accuracy achieved by coalition $S$.
- The sum averages the marginal contribution of client $i$ across all possible orderings in which it could join the coalition.

Clients with consistently high Shapley values are genuinely useful to the federation. Clients with near-zero or negative values may be free-riders or adversaries.

---

## Enabling Shapley Analysis

```yaml
federated_learning_schema: "TraditionalFederatedLearning"
shapley: true
shapley_type: "value"          # Type of Shapley computation
```

When `shapley: true`, `app_factory.py` routes to `shapley_app_executor` instead of `star_app_executor`. The only structural difference is that the server node is replaced with a `ShapleyServerNode`.

---

## The ShapleyServerNode

`src/applications/shapley/shapley_server_node.py` extends the standard star server to:

1. After each round, retrieve a **versioned snapshot** of each client's model contribution via `federation.pull_version()`.
2. Evaluate model quality for every possible coalition subset (or an approximation thereof for large $N$).
3. Compute the marginal contribution of each client's update using the Shapley formula.
4. Log the per-client Shapley values to the standard metrics pipeline (CSV + OpenTelemetry).

The computation is intensive for large federations (exact computation is $O(2^N)$). For large $N$, sampling-based approximations (e.g., Monte Carlo permutation sampling) are used.

---

## Use Cases

| Use Case | How Shapley Values Help |
|----------|------------------------|
| **Free-rider detection** | Identify clients contributing low-quality or recycled data — they will have Shapley values near zero |
| **Incentive mechanisms** | Reward clients proportional to their Shapley value — higher contribution earns more global model influence or compensation |
| **Data quality auditing** | Rank datasets by their actual impact on model quality without accessing raw data |
| **Adversarial client detection** | Clients with consistently negative Shapley values may be poisoning the model |

---

## Computational Cost

The exact Shapley computation requires evaluating $v(S)$ for all $2^N$ subsets. For large federations, this is impractical. FedPilot supports the `shapley_type` config key to select the approximation strategy:

| `shapley_type` | Approach | Complexity |
|---------------|----------|-----------|
| `"value"` | Exact marginal contribution evaluation | $O(2^N)$ — use for $N \leq 20$ |

> For production-scale federations ($N > 20$), plan to extend the `ShapleyServerNode` with a Monte Carlo or kernel SHAP approximation plugged into the standard aggregation hook.

See also: [Aggregators](aggregators.md) · [Applications & AppFactory](../schemas_and_apps/applications_and_appfactory.md) · [Metrics Registry](../registries/metrics_registry.md)
