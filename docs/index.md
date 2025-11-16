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
| [overview]({{ site.baseurl }}/overview) | Introduction to FedPilot | 10 min | Beginner |
| [Framework Overview]({{ site.baseurl }}/fedpilot-framework-overview) | FedPilot framework overview | 15 min | Beginner |
| [Installation]({{ site.baseurl }}/requirements-and-installation) | Setup & environment configuration | 20 min | All |
| [Getting Started]({{ site.baseurl }}/getting-started) | Quick start guide & first training | 15 min | All |
| [CLI Reference]({{ site.baseurl }}/cli-reference) | Command-line interface guide | 10 min | Beginners |

**Recommended Path for New Users:**
1. Read: [Framework Overview]({{ site.baseurl }}/fedpilot-framework-overview) (understand what it is)
2. Start: [Installation]({{ site.baseurl }}/requirements-and-installation) (set up environment)
3. Follow: [Getting Started]({{ site.baseurl }}/getting-started) (run first model)
4. Reference: [CLI Reference]({{ site.baseurl }}/cli-reference) (understand commands)

---

## Configuration & Reference

Complete configuration guides:

| Document | Purpose | Use Case |
|----------|---------|----------|
| [Configuration Guide]({{ site.baseurl }}/configuration-guide) | YAML config reference & examples | Learning YAML format |
| [CLI Reference]({{ site.baseurl }}/cli-reference) | Command-line interface guide | Learning how to create configurations |

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
| [Models & Datasets]({{ site.baseurl }}/guides/models-and-datasets) | Available models and data sources | Choosing model/dataset |
| [Aggregation Strategies]({{ site.baseurl }}/guides/aggregation-strategies) | FedAvg, FedProx, variants | Understanding aggregation |


---

## Examples & Tutorials


**By Use Case:**
- First training -> Example 1 in [Basic Training]({{ site.baseurl }}/examples/basic-training)
- Non-IID data -> Example 2 in [Basic Training]({{ site.baseurl }}/examples/basic-training)
- Privacy-preserving -> Example 3 in [Basic Training]({{ site.baseurl }}/examples/basic-training)
- Compression -> Example 4 in [Basic Training]({{ site.baseurl }}/examples/basic-training)

---

## Quick Reference Tables

### Documentation by Topic

| Topic | Primary Doc | Secondary Docs |
|-------|-------------|-----------------|
| **Installation** | [Installation]({{ site.baseurl }}/requirements-and-installation) | - |
| **First Run** | [Getting Started]({{ site.baseurl }}/getting-started) | [CLI Reference]({{ site.baseurl }}/cli-reference) |
| **Configuration** | [Configuration Guide]({{ site.baseurl }}/configuration-guide) | -
| **Models** | [Models & Datasets]({{ site.baseurl }}/guides/models-and-datasets) | [Basic Examples]({{ site.baseurl }}/examples/basic-training) |
| **Aggregation** | [Aggregation Strategies]({{ site.baseurl }}/guides/aggregation-strategies) | - |
| **Examples** | [Basic Training]({{ site.baseurl }}/examples/basic-training) | - |


---

## Cross-References

### Common Questions & Answers

| Question | Answer |
|----------|--------|
| "How do I install FedPilot?" | [Installation]({{ site.baseurl }}/requirements-and-installation) |
| "How do I run my first training?" | [Getting Started]({{ site.baseurl }}/getting-started) |
| "How do I use make commands?" | [CLI Reference]({{ site.baseurl }}/cli-reference) |
| "How do I configure my experiment?" | [Configuration Guide]({{ site.baseurl }}/configuration-guide) |
| "Which model should I use?" | [Models & Datasets]({{ site.baseurl }}/guides/models-and-datasets) |
| "How does it work internally?" | [Framework Overview]({{ site.baseurl }}/fedpilot-framework-overview) |

---

## Getting Help

### Troubleshooting

1. **Installation Issues** -> [Installation Troubleshooting]({{ site.baseurl }}/requirements-and-installation#troubleshooting)
2. **Training Issues** -> [Getting Started Troubleshooting]({{ site.baseurl }}/getting-started#troubleshooting)
3. **Configuration Issues** -> [Configuration Guide]({{ site.baseurl }}/configuration-guide#configuration-validation)

---

## Version Info

- **FedPilot Version**: v2.0.0
- **Documentation Version**: 1.0
- **Last Updated**: 2024
- **Status**: Active & Maintained

---
**Ready to install FedPilot?** Check out
[Requirements & Installation]({{ site.baseurl }}/requirements-and-installation)!
{: .text-center }