---
title: Home
layout: home
nav_order: 1 
---

# FedPilot Wiki

Welcome to the **FedPilot** comprehensive documentation. FedPilot is a  Federated Learning framework designed for scalable, distributed machine learning with advanced features like clustering, differential privacy, and model pruning.

---

## Documentation Structure


Start here if you're new to FedPilot:

| Document | Purpose | Time | Audience |
|----------|---------|------|----------|
| [overview](./overview) | Introduction to FedPilot | 10 min | Beginner |
| [FEDPILOT_OVERVIEW](./FEDPILOT_OVERVIEW) | FedPilot framework overview | 15 min | Beginner |
| [Installation](./requirements-and-installation) | Setup & environment configuration | 20 min | All |
| [Getting Started](./getting-started) | Quick start guide & first training | 15 min | All |
| [CLI Reference](./cli-reference) | Command-line interface guide | 10 min | Beginners |

**Recommended Path for New Users:**
1. Read: [FedPilot Overview](./FEDPILOT_OVERVIEW) (understand what it is)
2. Start: [Installation](./requirements-and-installation) (set up environment)
3. Follow: [Getting Started](./getting-started) (run first model)
4. Reference: [CLI Reference](./cli-reference) (understand commands)

---

## Architecture & Core Concepts

Deep dive into how FedPilot works:

| Document | Focus | Prerequisites | Level |
|----------|-------|--------------|-------|
| [Architecture Overview](./architecture/overview) | System design & layers | None | Intermediate |
| [Core Components](./architecture/core-components) | Detailed component breakdown | Architecture Overview | Intermediate |
| [Communication System](./architecture/communication) | Message passing details | Components | Advanced |

**Recommended Path:**
1. Read: [Architecture Overview](./architecture/overview)
2. Study: [Core Components](./architecture/core-components)

---

## Configuration & Reference

Complete configuration guides:

| Document | Purpose | Use Case |
|----------|---------|----------|
| [Configuration Guide](./configuration-guide) | YAML config reference & examples | Learning YAML format |

---

## Supported Features

| Feature area            | Supported items |
|---|---|
| Architectures           | Centralized FL (Star Topology), Decentralized FL (Ring, K-connected), Custom Topologies |
| Models                  | CNN, LeNet, ResNet (18, 50), VGG16, MobileNet, Vision Transformer (ViT), Swin, BERT, ALBERT, Custom models |
| Datasets — Image        | MNIST, Fashion-MNIST, FEMNIST, CIFAR-10/100, SVHN, STL-10, Tiny ImageNet |
| Datasets — Text         | Shakespeare, BBC News, Yahoo QA |
| Optimization            | FedAvg, FedProx, Model pruning & compression, Parameter quantization, Gradient clipping, Enhanced chunking |
| Security & Privacy      | Differential Privacy (DP), Gradient clipping, Secure aggregation, Client sampling |
| Monitoring              | OpenTelemetry tracing, Prometheus metrics, Grafana dashboards, Jaeger distributed tracing |



---

## Features & Guides

Learn about specific features:

| Guide | Topic | Best For |
|-------|-------|----------|
| [Models & Datasets](./guides/models-and-datasets) | Available models and data sources | Choosing model/dataset |
| [Aggregation Strategies](./guides/aggregation-strategies) | FedAvg, FedProx, variants | Understanding aggregation |
| [Differential Privacy](./guides/differential-privacy) | Privacy-preserving training | Privacy requirements |


---

## Examples & Tutorials


**By Use Case:**
- First training -> Example 1 in [Basic Training](./examples/basic-training)
- Non-IID data -> Example 2 in [Basic Training](./examples/basic-training)
- Privacy-preserving -> Example 3 in [Basic Training](./examples/basic-training)
- Compression -> Example 4 in [Basic Training](./examples/basic-training)

---

## Quick Reference Tables

### Documentation by Topic

| Topic | Primary Doc | Secondary Docs |
|-------|-------------|-----------------|
| **Installation** | [Installation](./requirements-and-installation) | - |
| **First Run** | [Getting Started](./getting-started) | [CLI Reference](./cli-reference) |
| **Configuration** | [Configuration Guide](./configuration-guide) | -
| **Architecture** | [Overview](./architecture/overview) | [Components](./architecture/core-components) |
| **Models** | [Models & Datasets](./guides/models-and-datasets) | [Basic Examples](./examples/basic-training) |
| **Privacy** | [Differential Privacy](./guides/differential-privacy) | [Examples](./examples/basic-training) |
| **Aggregation** | [Aggregation Strategies](./guides/aggregation-strategies) | - |
| **Examples** | [Basic Training](./examples/basic-training) | - |


---

## Cross-References

### Common Questions & Answers

| Question | Answer |
|----------|--------|
| "How do I install FedPilot?" | [Installation](./requirements-and-installation) |
| "How do I run my first training?" | [Getting Started](./getting-started) |
| "How do I use make commands?" | [CLI Reference](./cli-reference) |
| "How do I configure my experiment?" | [Configuration Guide](./configuration-guide) |
| "Which model should I use?" | [Models & Datasets](./guides/models-and-datasets) |
| "How do I add privacy?" | [Differential Privacy](./guides/differential-privacy) |
| "How does it work internally?" | [Architecture Overview](./architecture/overview) |
| "What are all configuration options?" | [Config Reference](./reference/config-reference) |

---

## Getting Help

### Troubleshooting

1. **Installation Issues** -> [Installation Troubleshooting](./requirements-and-installation#troubleshooting)
2. **Training Issues** -> [Getting Started Troubleshooting](./getting-started#troubleshooting)
3. **Configuration Issues** -> [Configuration Guide](./configuration-guide#configuration-validation)
4. **Advanced Issues** -> Check relevant guide in [Guides](./guides/)

### Performance & Optimization

- Slow training? -> [Configuration Tips](./configuration-guide#configuration-tips)
- Out of memory? -> [Getting Started - Troubleshooting](./getting-started#troubleshooting)
- Privacy-utility tradeoff? -> [Differential Privacy](./guides/differential-privacy)
- Communication overhead? -> [Models & Datasets](./guides/models-and-datasets)

---

## Documentation Statistics

- **Total Files**: 20+
- **Total Pages**: 25+
- **Code Examples**: 100+
- **Configurations**: 50+
- **Quick References**: 10+

---

## Contributing

Want to improve the documentation?

1. Read: [Contributing Guide](./CONTRIBUTING)
2. Follow: Contribution guidelines
3. Submit: Pull request with improvements

---

## Version Info

- **FedPilot Version**: v2.0.0
- **Documentation Version**: 1.0
- **Last Updated**: 2024
- **Status**: Active & Maintained

---

## Quick Links

- **Homepage**: [README](./README.md)
- **Framework Overview**: [FEDPILOT_OVERVIEW](./FEDPILOT_OVERVIEW)
- **Quick Start**: [Getting Started](./getting-started)
- **Installation**: [Installation](./requirements-and-installation)
- **Configuration**: [Configuration Guide](./configuration-guide)
- **CLI Reference**: [CLI Reference](./cli-reference)
- **Architecture**: [Overview](./architecture/overview)
- **Examples**: [Basic Training](./examples/basic-training)
- **API Reference**: [API Docs](./reference/api-reference)

---


**Start Here:** [FedPilot Overview](./FEDPILOT_OVERVIEW) | **Quick Start:** [Getting Started](./getting-started) | **Architecture:** [Overview](./architecture/overview) | **Examples:** [Basic Training](./examples/basic-training){: .text-center }

---
**Ready to install FedPilot?** Check out
[Requirements & Installation]({{ site.baseurl }}/requirements-and-installation)!
{: .text-center }