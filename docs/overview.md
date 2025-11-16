---
layout: default
title: Overview  
nav_order: 2 
---

# FedPilot Overview

A toolkit for orchestrating federated learning (FL) experiments—configuration-first, resource-aware, and reproducible.

---
## An overview to Federated Learning

Federated Learning (FL) is a distributed machine-learning paradigm where the training data remains local to many participating devices or institutions (clients), and only model updates—not raw data—are exchanged and aggregated. This lets multiple parties collaboratively train a shared model while reducing privacy risk and avoiding large centralized data transfers.

**Core concepts**

* **Clients** — data holders (phones, hospitals, edge devices, orgs). Each client computes updates using its local data.
* **Coordinator / Server** — orchestrates rounds, aggregates updates, and distributes the global model.
* **Communication rounds** — repeated cycles where the server sends the current global model to selected clients, clients compute local updates, and the server aggregates those updates into a new global model.
* **Aggregation** — the server combines client updates; the canonical algorithm is Federated Averaging (FedAvg), but more sophisticated aggregation schemes (weighted averages, robust aggregation, secure aggregation) are common.
* **Cross-device vs cross-silo** — FL can be used on millions of intermittent low-power devices (cross-device) or across a small number of reliable institutions (cross-silo).
* **Privacy & security** — FL reduces raw-data sharing but requires additional mechanisms (differential privacy, secure multiparty computation / secure aggregation, and encryption-in-transit) to provide stronger guarantees.
* **Heterogeneity** — clients differ in data distribution, compute, and availability; FL algorithms must tolerate statistical and systems heterogeneity.

---

## Why FedPilot

**FedPilot** is an orchestration layer built to make federated experiments practical, repeatable and scalable. It focuses on experiment engineering: reproducible configs, resource-aware execution, stateful participants, and efficient data movement. Here are the refined reasons to pick FedPilot.

**Reproducible experiments**

* Configuration-first runs capture model, optimizer, client selection, stopping criteria, and environment. That makes experiments auditable and comparable.
* Structured outputs: standardized logs, checkpoints, and metrics artifacts so runs can be replayed and analyzed consistently.

**Scales naturally**

* Uses Ray actors to represent clients and servers: the same experiment script runs locally or on a multi-node cluster with no orchestration code changes.
* Dynamic scheduling and autoscaling capabilities let you test cross-device and cross-silo setups at realistic scale.

**Resource-aware placement**

* Reserve CPU/GPU bundles per participant and place actors to favor locality (co-locate compute with data) or resilience. This reduces resource contention and gives predictable runtime behavior across experiments. 

**Observability & debugging**

* Centralized logging, metrics collection, and per-actor traces make diagnosing convergence issues, client skew, or system faults easier.
* Built to integrate with monitoring stacks (prometheus/grafana) when deployed on clusters.

**Privacy & security hooks**

* Provides integration points for differential-privacy mechanisms, secure aggregation protocols, and encrypted communication—so you can experiment with privacy/utility trade-offs.

**When to use FedPilot**

* You need repeatable benchmarking of FL algorithms across many seeds, datasets, and resource configurations.
* You want to prototype complex client/server behaviors (stateful clients, personalized heads, partial participation) and run them on a cluster.
* You require integrated artifact management, observability, and resource isolation for rigorous comparisons.

---

## Typical FL Workflows
- Centralized (star / FedAvg-style). Clients train locally and send updates to a server that aggregates and broadcasts a new global model. Actors keep per-client state; resource placement supports consistent round execution.
- Decentralized (ring/mesh). Clients exchange updates with neighbors to enable peer-to-peer schemes; a controller still coordinates rounds and termination criteria.
- Multi-trial experiments. Sweep client counts, non-IID partitions, learning rates, or aggregation rules, scheduled concurrently.

---

## Supported Models and Datasets

### Available Models
FedPilot supports various neural network architectures suitable for federated learning:
- CNN
- ResNet
- Transformer-based models
- Custom PyTorch models

### Supported Datasets
The framework includes built-in support for several benchmark datasets:
- FMNIST
- CIFAR-10
- Custom datasets

### Models Table

| Model | Type | Params | Use Case |
|-------|------|--------|----------|
| CNN | Image | ~200K | Quick testing, baseline |
| LeNet | Image | ~60K | Fast training, embedded |
| ResNet-18 | Image | ~11M | Standard baseline |
| ResNet-50 | Image | ~25M | Realistic tasks |
| VGG-16 | Image | ~138M | Large-scale tasks |
| MobileNet | Image | ~4M | Edge devices, compression |
| ViT-Small | Image | ~22M | Vision transformers |
| BERT | NLP | ~110M | Language tasks |

### Datasets Table

| Dataset | Type | Classes | Samples |
|---------|------|---------|---------|
| MNIST | Image | 10 | 70K |
| Fashion-MNIST | Image | 10 | 70K |
| CIFAR-10 | Image | 10 | 60K |
| CIFAR-100 | Image | 100 | 60K |
| FMNIST | Image | 10 | 70K |
| Shakespeare | Text | 80 | 4M characters |
| BBC News | Text | 5 | 2.2K docs |


### Data Distribution Levels
- IID (Uniform)
- 20/50/90
- Dir (Dirichlet)

---

## Federation Topologies

### Star Topology (Centralized)
- Configuration: `federated_learning_topology: 'star'`
- Use Case: Traditional FedAvg algorithms with a central server
- Communication Pattern: All clients communicate through a central aggregator
- Scalability: Well-suited for moderate numbers of clients (tens to hundreds)

### Ring Topology (Decentralized)
- Configuration: `federated_learning_topology: 'ring'`
- Use Case: Peer-to-peer federated learning without central coordination
- Communication Pattern: Circular message passing between neighboring clients
- Scalability: Excellent for large-scale deployments with many clients

### K-Connect Topology
- Configuration: `federated_learning_topology: 'k_connect'`
- Use Case: Balanced connectivity with controlled communication overhead
- Communication Pattern: Each client connects to k neighbors for efficient information exchange
- Scalability: Provides a tunable balance between connectivity and communication costs

### Custom Topologies
- Configuration: `federated_learning_topology: 'custom'`
- Use Case: Research experiments requiring specific communication patterns
- Communication Pattern: Defined by custom adjacency matrices
- Flexibility: Complete control over client connectivity for specialized research needs

---

## Who is FedPilot for?
- Researchers and engineers who want repeatable FL experiments that scale from a workstation to a Ray cluster without rewriting orchestration code.
- Teams that prefer a clear separation between FL logic (clients, aggregation, topology) and infrastructure (resources, scheduling, data movement).


---

## Next Steps

1. Review [Installation]({{ site.baseurl }}/requirements-and-installation) for setup
2. Read [Getting Started]({{ site.baseurl }}/getting-started) for first training
3. Explore [Framework Overview]({{ site.baseurl }}/fedpilot-framework-overview) for system design
4. Check [Examples]({{ site.baseurl }}/examples/basic-training) for practical implementations
5. Visit [GitHub Repository](https://github.com/fedpilot) for source code

---

**Ready to install FedPilot?** Check out
[Requirements & Installation]({{ site.baseurl }}/requirements-and-installation)!
{: .text-center }
