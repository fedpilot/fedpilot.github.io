---
title: Documentation
layout: default
permalink: /docs/
nav_order: 1
---

![FedPilot Platform Logo]()

# FedPilot: A Topology-Aware Platform for Federated Learning

Welcome to the **FedPilot** documentation hub. FedPilot is a Ray-backed platform for topology-aware federated learning and distributed system research.

Unlike traditional FL frameworks that hide low-level scheduling behind FL-specific abstractions, FedPilot's central design principle is to **decouple logical federation design from physical execution**. Researchers define schemas, virtual nodes, topology descriptors, and adaptation policies *before* the system materializes actors and placement groups.

---

## The Four Core Contributions

As outlined in the architectural design of the platform, FedPilot contributes four key systems-level innovations:

1. **Layered Architecture**: A clean separation of Schema, Core, Communication, Infrastructure, and Observability layers.
2. **First-Class Systems Abstractions**: Lazy virtual-node materialization, topology-aware message routing, and the **Inter-Cluster Ray Fabric (ICRF)** as a core infrastructure primitive — not an optional add-on.
3. **Data-Driven Topology Adaptation**: Data-driven clustering based on real label distributions drives ICRF placement decisions, unifying convergence improvement and horizontal scaling in one mechanism.
4. **Grounded Observability**: A side-channel telemetry stack (OpenTelemetry, Prometheus, Grafana, Streamlit) that treats resource pressure and network I/O as critical experimental artifacts, not post-hoc add-ons.

---

## The Inter-Cluster Ray Fabric (ICRF)

The ICRF is the spine of FedPilot's multi-cluster capability. It is a hybrid communication layer that maintains a single logical federation graph while automatically routing messages through:

- **Ray shared memory** — for nodes co-located on the same physical cluster (intra-cluster).
- **HTTP via Ray Serve gateways** — for nodes spanning separate physical clusters (inter-cluster).

Every part of the platform is aware of the ICRF: clustering determines its wiring, the `HybridAdjacencyMatrix` encodes its routing table, and the `HybridTopologyManager` enforces it at runtime.

→ Read the deep-dive: [**Inter-Cluster Ray Fabric (ICRF)**](../federated_core/icrf.md)

---

## Documentation Layers

To make the platform understandable, the architecture has been broken down into its operational layers. Choose a layer to dive into the technical details:

### 1. Entry & Configuration
Everything starts with how you boot up the framework.
- [Getting Started: Running & Experimenting](../entry_and_config/getting_started.md)
- [Configuration Reference](../entry_and_config/configuration_reference.md)

### 2. Orchestration & Infrastructure
How the framework scales across physical hardware using Ray.
- [Ray & Virtual Nodes (Lazy Materialization)](../orchestration/ray_and_virtual_nodes.md)
- [Topology Manager](../orchestration/topology_manager.md)
- [Global Object Store](../orchestration/global_object_store.md)

### 3. Schemas & Applications
How the federated paradigms are defined and mapped to execution engines.
- [Schemas SDK](../schemas_and_apps/schemas_sdk.md)
- [Applications & AppFactory](../schemas_and_apps/applications_and_appfactory.md)

### 4. Federated Core & Communication
The mathematical heart of the framework and the Inter-Cluster Ray Fabric.
- [**Inter-Cluster Ray Fabric (ICRF)**](../federated_core/icrf.md) ← *Start here for multi-cluster deployments*
- [Federated Base](../federated_core/federated_base.md)
- [Aggregators](../federated_core/aggregators.md)
- [Model Compression & Chunking](../federated_core/model_compression.md)
- [Shapley Value Analysis](../federated_core/shapley_analysis.md)

### 5. Tool Registries
How to inject custom logic without editing core files. The platform has four decorator-based plugin registries:
- [Model Registry](../registries/model_registry.md)
- [Topology Registry](../registries/topology_registry.md)
- [Metrics Registry](../registries/metrics_registry.md)
- [Topology Adaptation Registry](../registries/topology_adaptation_registry.md)

### 6. Security & Privacy
Protecting distributed data from inference attacks.
- [Differential Privacy](../security_and_privacy/differential_privacy.md)
- [Cryptography & Secure Aggregation](../security_and_privacy/cryptography.md)

### 7. Dashboards & Telemetry
Deep visibility into your experiments and production networks.
- [Metrics Exporting](../dashboards_and_telemetry/metrics_exporting.md)
- [Ray Dashboard](../dashboards_and_telemetry/ray_dashboard.md)
- [Streamlit Dashboard](../dashboards_and_telemetry/streamlit_dashboard.md)
- [Deployment Guide](../dashboards_and_telemetry/deployment_guide.md)
