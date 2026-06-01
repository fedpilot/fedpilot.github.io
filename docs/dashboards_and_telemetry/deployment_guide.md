---
title: Deployment Guide
layout: default
parent: Dashboards & Telemetry
---
# Deployment Guide

FedPilot is designed for robust deployment on Linux environments. While local development uses simulated Ray processes, production environments require physical network bridging.

## Local Development (Simulated)
For prototyping, keep `production_mode: false` in `config.yaml`.
Use the `Makefile` as your primary entry point:
```bash
make setup
make validate-setup
make train
```

## Production Deployment (Physical)
When `production_mode: true` is set, the `app_factory.py` dispatches the `production_executor`. The system expects to be deployed across physically distinct machines.

### Docker Compose
A `docker-compose.yml` and `Dockerfile` are provided in the `deployment/` directory to stand up the necessary infrastructure.

1. **Build the Image**:
   The Dockerfile encapsulates the Ray dependencies and the FedPilot codebase.
2. **Telemetry Stack**:
   The `docker-compose.yml` automatically orchestrates the Prometheus and Grafana containers alongside the FedPilot runtime.
3. **Networking**:
   Ensure your Docker network configuration allows the containers to bind to the host network so Ray actors can communicate across different physical machines.

```bash
cd deployment/
docker-compose up --build -d
```

