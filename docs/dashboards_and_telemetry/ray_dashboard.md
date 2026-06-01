---
title: Ray Dashboard
layout: default
parent: Dashboards & Telemetry
---
# Ray Dashboard

While OpenTelemetry and Prometheus handle machine learning metrics (like Loss and Accuracy), the **Ray Dashboard** handles *Orchestration Metrics*.

If you are running a complex decentralized topology and the system hangs, the Ray Dashboard is the only way to see exactly which actor is blocked or has crashed.

## Enabling the Dashboard
In your `config.yaml`:
```yaml
ray_dashboard: true
ray_dashboard_port: 8265
```

## Using the Dashboard
Once the `make run` command executes, navigate to `http://localhost:8265` in your browser.

**Key Features:**
1. **Logical View**: See every `VirtualNode` actor spawned by `app_factory.py`. You can see their exact PID, IP address, and whether they are ALIVE, DEAD, or PENDING.
2. **Logs**: You can click on individual actors to stream their exact `stdout`/`stderr`. This is vital if a specific edge device fails to load a dataset split.
3. **Hardware Utilization**: View real-time CPU, RAM, and GPU memory utilization per actor, helping you tune your `train_batch_size` to prevent Out-Of-Memory (OOM) errors.

