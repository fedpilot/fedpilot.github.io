---
layout: default
title: Basic Training Examples
parent: Examples
nav_order: 1
---
# Basic Training Examples

Step-by-step examples to get you started with FedPilot training.

## Example 1: Your First FL Training

### Objective
Train a simple CNN on MNIST dataset with federated learning.

### Step-by-Step Guide

**1. Create Configuration**

```bash
# Make a configuration
make config
```

**2. Validate Configuration**

```bash
# Check configuration is valid
make validate
```
Expected output:
```bash
**Example**:
```bash
✅ Configuration Validation
========================================================
✓ Configuration file exists
Validating YAML syntax...
❌ Invalid YAML syntax
```


**3. Start Training**

```bash
# Method 1: Interactive (recommended for first time)
make train

# Method 2: Direct with existing config
make quick-train
```

**4. Monitor Training**

```bash
# In another terminal, check progress
make logs

# View real-time updates
tail -f logs/*.log
```

**5. After Training Completes**

```bash
# View results
make experiments

# Plot metrics
make plot

# Check saved models
make models
```

**Expected Results:**
- Training time: ~10-20 minutes
- Final accuracy: 90-95%
- 50 federated rounds
- 10 clients
- Results in `results/accuracy_*.csv`

---

## Example 2: Non-IID Data Distribution

### Objective
Experience federated learning with heterogeneous (non-IID) data.
Please note that the configuration examples below are simplified and should not be copied directly into your configuration file. Instead, adjust the values manually to match your specific setup.
### Configuration

```yaml
# Save as config.yaml
device: "cuda"
gpu_index: 0
random_seed: 42

model_type: "lenet"
dataset_type: "mnist"
learning_rate: 0.01
optimizer: "sgd"

# Key: Highly non-IID distribution
data_distribution_kind: "90"     # 90 means 90% label heterogeneity
dirichlet_beta: 0.01             # Lower = more heterogeneous
number_of_clients: 10

# Training parameters
number_of_epochs: 5
train_batch_size: 32
federated_learning_rounds: 100

aggregation_strategy: "FedAvg"
clustering_period: 10

mean_accuracy_to_csv: true
```

### Run Training

```bash
# Validate
make validate

# Train with non-IID data
make quick-train
```

### What to Observe

1. **Slower Convergence**: Non-IID data makes learning slower
2. **Different Client Distributions**: Each client has unique label distribution
3. **Aggregation Challenges**: Average of different distributions is harder
4. **Clustering Benefits**: System may automatically cluster similar clients

### Compare Results

```bash
# After training with non-IID data
make experiments

# Compare with IID results from Example 1
# Notice the convergence differences
```

---

## Example 3: Multi-Round Training with Metrics

### Objective
Train a ResNet model and track detailed metrics.

### Configuration

```yaml
# Save as config.yaml
device: "cuda"
gpu_index: 0

model_type: "resnet18"
dataset_type: "cifar10"
learning_rate: 0.001
optimizer: "sgd"
weight_decay: 1e-4

number_of_clients: 20
number_of_epochs: 5
train_batch_size: 32
test_batch_size: 128
federated_learning_rounds: 100

data_distribution_kind: "50"
aggregation_strategy: "FedAvg"
clustering_period: 5

# Enable detailed metrics
mean_accuracy_to_csv: true
save_global_models: false
```

### Training Steps

```bash
# 1. Setup (if needed)
make setup

# 2. Validate
make validate

# 3. View config details
make show-config

# 4. Start training
make quick-train

# 5. Monitor in real-time (new terminal)
make status           # Overall status
make logs             # Training logs
tail -f logs/*.log   # Follow logs
```

### Tracking Progress

```bash
# View logs and filter for specific metrics
make logs | grep "Accuracy"
make logs | grep "Loss"
make logs | grep "Communication"

# Extract key metrics
make logs | grep "Round 50"
make logs | grep "Round 100"
```

---



## Example 4: Decentralized Federated Learning

### Objective
Train using peer-to-peer topology instead of centralized server.

### Configuration

```yaml
# Save as config.yaml
device: "cuda"
gpu_index: 0

model_type: "cnn"
dataset_type: "mnist"
learning_rate: 0.001
optimizer: "sgd"

number_of_clients: 8
number_of_epochs: 2
federated_learning_rounds: 100

# Decentralized setup
federated_learning_schema: "decentralized"
federated_learning_topology: "ring"     # Peer-to-peer ring
placement_group_strategy: "spread"

aggregation_strategy: "FedAvg"

mean_accuracy_to_csv: true
```

### Topologies

**Ring Topology:**
```
Each client connected to 2 neighbors
C1 ← C2
↓  ↑
C4 → C3
```

**K-Connected Topology:**
```yaml
federated_learning_topology: "k_connected"
k_value: 3                    # Each client connected to 3 others
```

### Training Observations

```bash
# 1. Train decentralized
make quick-train

# 2. Observe differences:
# - No central bottleneck
# - Different communication pattern
# - May converge differently
# - Resilient to node failures

# 3. View topology in logs
make logs | grep "topology\|neighbors\|ring"
```

---

## Example 5: Long-Running Experiment

### Objective
Run extended training with monitoring.

### Configuration

```yaml
# Save as config.yaml
device: "cuda"
gpu_index: 0
random_seed: 42

model_type: "resnet18"
dataset_type: "cifar10"
learning_rate: 0.001
optimizer: "sgd"
weight_decay: 1e-4

number_of_clients: 30
number_of_epochs: 5
train_batch_size: 64
federated_learning_rounds: 500     # Long training

data_distribution_kind: "90"
aggregation_strategy: "FedAvg"
clustering_period: 10

mean_accuracy_to_csv: true
save_global_models: true            # Save checkpoints
```

### Running Long Experiments

```bash
# 1. Start training in tmux session (background)
make train
# Select configuration

# 2. Detach from session (Ctrl+B then D)

# 3. Monitor from main terminal
make sessions                       # Check status
make logs | tail -50               # Latest logs
make status                        # Overall status

# 4. In another terminal
watch -n 300 "make experiments"    # Check every 5 min

# 5. Re-attach if needed
tmux attach -t fl-resnet-cifar-12345
```

---

## Troubleshooting Common Issues

### Issue: "CUDA out of memory"

```yaml
# Solution: Reduce batch size
train_batch_size: 32    # Reduce from 64
test_batch_size: 64     # Reduce from 128

# Alternative: Enable compression
chunking: true
```

### Issue: "Very slow training"

```yaml
# Solution 1: Fewer clients
number_of_clients: 5    # Reduce from 20

# Solution 2: Fewer rounds
federated_learning_rounds: 20    # Reduce from 100

# Solution 3: Fewer local epochs
number_of_epochs: 1     # Reduce from 5

# Solution 4: Larger batch
train_batch_size: 128   # Increase from 64
```

---


**Ready for to learn more?** Check out [Framework Overview]({{ site.baseurl }}/fedpilot-framework-overview) for more in-depth explanations.
{: .text-center }