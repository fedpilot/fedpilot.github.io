---
title: Metrics Registry
layout: default
parent: Tool Registries
---
# Metrics Registry

The Metrics Registry (`src/registries/metrics/metric_registry.py`) is the plugin system for custom telemetry. FedPilot treats observability as a first-class citizen; all built-in metrics (round, memory, communication, convergence, throughput, system, availability, performance) are registered using the exact same pattern exposed to researchers.

---

## `@register_metric` — Custom Telemetry

Registers a new metric class that the `MetricsCollector` will automatically discover and invoke during each federated round.

```python
from src.registries.metrics.metric_registry import register_metric
from src.registries.metrics.base_metric import BaseMetric

@register_metric("gradient_variance")
class GradientVarianceMetric(BaseMetric):
    
    def collect(self, **kwargs) -> dict:
        """
        Compute your custom metric values. 
        Returns a flat dictionary that will be appended to the CSV row.
        """
        # kwargs contains round state: 'updates', 'round_num', 'node_id', etc.
        updates = kwargs.get("updates", [])
        if not updates:
            return {"gradient_variance": 0.0}
            
        variance = compute_gradient_variance(updates)
        return {"gradient_variance": variance}
```

---

## Enabling Your Custom Metric

Once registered, enable it in `config.yaml` under the `metrics` block:

```yaml
metrics:
  gradient_variance: true   # Your custom metric
  round: true               # Built-in
  memory: true              # Built-in
```

When enabled, the returned dictionary from your `collect()` method will be automatically integrated into the telemetry pipeline: written to the local CSV logs, broadcast via OpenTelemetry, and made available to the Streamlit dashboard.

---

## Built-In Metric Categories

The framework ships with the following metric categories, each living in its own sub-directory under `src/registries/metrics/`:

| Metric Group | Config Key | Description | Key Telemetry Points |
|--------------|-----------|-------------|----------------------|
| **Round Summary** | `round` | Model convergence | Global accuracy, test loss, train loss |
| **Convergence** | `convergence` | Stability | Loss curve delta, weight divergence |
| **Communication** | `communication` | Network cost | Bytes sent/received, payload sizes |
| **Memory** | `memory` | RAM/GPU pressure | Peak RAM, Peak VRAM per node |
| **System** | `system` | Hardware usage | CPU % utilization, GPU % utilization |
| **Throughput** | `throughput` | Training speed | Samples processed per second |
| **Performance** | `performance` | Timings | Setup time, aggregation time, train time |
| **Availability** | `availability` | Node health | Actor liveness, drop-out rates |

All collected metrics are seamlessly routed through the `MetricsActor` to prevent blocking the main training loop with I/O operations.

See also: [Metrics Exporting](../dashboards_and_telemetry/metrics_exporting.md) · [Streamlit Dashboard](../dashboards_and_telemetry/streamlit_dashboard.md)

