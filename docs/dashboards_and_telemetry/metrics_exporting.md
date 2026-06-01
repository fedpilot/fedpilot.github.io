# Metrics Exporting

Deep visibility into the training process is non-negotiable for federated learning. FedPilot meticulously logs different classes of metrics and exports them for analysis.

## Configuring Metrics
You can toggle specific metric classes individually in `config.yaml`:
```yaml
metrics:
  round: true          # Accuracy, loss, and epoch timings
  memory: true         # RAM utilization
  performance: true    # GPU/CPU usage
  communication: true  # Network payload sizes
  system: true         # Node availability
  convergence: true    # Global model delta
  throughput: true     # Messages per second
```

## Export Destinations

### 1. CSV Logs
If `mean_accuracy_to_csv: true` is set in the config, the `MetricsActor` will periodically flush the aggregated metrics to standard CSV files inside the `logs/` directory. These are perfectly formatted for importing into Pandas or Jupyter notebooks for post-run analysis.

### 2. OpenTelemetry
Distributed tracing is achieved natively via OpenTelemetry.
- Set `otel_enabled: true`.
- Traces are exported to the endpoint defined by `otel_endpoint` (defaulting to a local collector at `http://localhost:4317`).
- The `otel-collector-config.yaml` file defines how the collector ingests these traces and exports them.

### 3. Prometheus
Metrics can be scraped via `prometheus_client` (configured in `prometheus.yaml`) for live dashboarding. The Prometheus container usually runs on port `9090`.
