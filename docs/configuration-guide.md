---

layout: default
title: Configuration Guide
nav_order: 6
---

# Configuration Guide

Complete guide to configuring FedPilot for your federated learning experiments. Learn how to customize every aspect of your training pipeline through YAML configuration files.

## Configuration File Structure

A FedPilot configuration is a YAML file that defines all aspects of your federated learning experiment:

<details markdown="1">
<summary><strong>Show full configuration template</strong></summary>

```yaml
# ============================================================
# 0. EXPERIMENT IDENTITY & RUNTIME
# ============================================================
federation_id: "0.0.32"          # Unique identifier for this experiment
production_mode: false           # If true, reduce extra logging and checks

# ============================================================
# 1. DEVICE & RESOURCE CONFIGURATION
# ============================================================
device: "cuda"                   # "cpu" or "cuda"
gpu_index: 0                     # Single GPU: 0, 1, 2, etc.
                                 # Multi-GPU: "0:3" (GPUs 0,1,2)
random_seed: 42                  # Reproducibility
placement_group_strategy: "SPREAD"  # Ray placement: SPREAD/PACK/STRICT_PACK/STRICT_SPREAD

# ============================================================
# 2. MODEL & FRAMEWORK CONFIGURATION
# ============================================================
runtime_engine: "torch"          # "torch", "tensorflow", "onnx"
model_type: "cnn"                # See Model Reference
transformer_model_size: "base"   # For BERT/ViT: "base", "large"
pretrained_models: false         # Use pre-trained weights
dataset_type: "fmnist"           # See Dataset Reference

# ============================================================
# 3. TRAINING CONFIGURATION
# ============================================================
learning_rate: 0.001             # Learning rate
optimizer: "sgd"                 # "sgd", "adam", "rmsprop"
loss_function: "CrossEntropy"    # Loss function type
weight_decay: null               # L2 regularisation (null = use framework default)

# Training loop parameters
number_of_epochs: 1              # Local epochs per round
train_batch_size: 64             # Local training batch size
test_batch_size: 128             # Evaluation batch size
transform_input_size: 28         # Input image size for transforms

# ============================================================
# 4. DATA DISTRIBUTION & SAMPLING
# ============================================================
# Data distribution
data_distribution_kind: "20"     # Options: "iid", "20", "50", "90", "dir"
dirichlet_beta: 0.1              # Beta for Dirichlet distribution (for "dir")
desired_distribution: null       # null = automatic, or provide custom distribution

# Sampling and federation size
number_of_clients: 10            # Total number of clients
client_sampling_rate: 1.0        # Fraction of clients sampled per round

# ============================================================
# 5. FEDERATED LEARNING PARAMETERS & TOPOLOGY
# ============================================================
# Federation schema and topology
federated_learning_schema: "DecentralizedFederatedLearning"
                                 # e.g. "DecentralizedFederatedLearning", "CentralizedFederatedLearning"
federated_learning_topology: "ring"  # e.g. "star", "ring", "k_connected", "custom"
k_value: 2                       # For "k_connected" topology: number of neighbours

# Optional adjacency matrix for custom graphs
adjacency_matrix_file_name: "adjacency_matrix_2.csv"  # CSV for custom graph (or null)
draw_topology: false            # If true, draw and save a visualisation of the graph
client_role: "train"            # Role of this client in the federation (e.g. "train")

# Core FL parameters
federated_learning_rounds: 8     # Total number of FL rounds
aggregation_strategy: "FedAvg"   # "FedAvg", "FedProx", etc.
fed_avg: true                    # Enable FedAvg aggregation (legacy flag)
aggregation_sample_scaling: false  # Scale updates by client sample size (advanced)

# Clustering
do_cluster: true                 # Enable clustering across clients
clustering_period: 6             # How often to re-cluster (in rounds)
pre_computed_data_driven_clustering: false  # Use external clustering assignments

# Early stopping
stop_avg_accuracy: 0.99          # Stop when average accuracy reaches this threshold

# Model checkpointing
save_before_aggregation_models: false  # Save local client models before aggregation
save_global_models: false              # Save global model after each round

# ============================================================
# 6. DISTANCE & SIMILARITY METRICS
# ============================================================
distance_metric: "cosine"        # "cosine", "euclidean", "coordinate"
distance_metric_on_parameters: true  # true = distance on parameters, false = alternative space
dynamic_sensitivity_percentage: false  # If true, adapt sensitivity over time
sensitivity_percentage: 100      # Percentage of "most important" parameters or chunks
remove_common_ids: false         # Remove coordinates common to many clients (advanced)

# Neighbour-based settings (for k-NN style algorithms)
client_k_neighbors: null         # If set, limit number of neighbours per client

# ============================================================
# 7. MODEL COMPRESSION & OPTIMISATION
# ============================================================
# Chunking (model compression)
chunking: false                  # Enable model segmentation into chunks
chunking_with_gradients: false   # Must be true with chunking=true for importance analysis
chunking_parts: 100              # Number of chunks to split model into
chunking_random_section: false   # true=random selection, false=importance-based selection

# Pruning
do_pruning: false                # Enable model pruning
pruning_threshold: 0.1           # Pruning sensitivity threshold

# ============================================================
# 8. DIFFERENTIAL PRIVACY
# ============================================================
dp_enabled: false                # Enable DP-SGD
dp_epsilon: 1.0                  # Privacy budget (lower = more privacy)
dp_delta: 1e-5                   # Failure probability
dp_clipping_norm: 1.0            # Gradient clipping threshold
dp_noise_multiplier: 0.1         # Noise scale for DP

# ============================================================
# 9. LOGGING, METRICS & OUTPUT
# ============================================================
mean_accuracy_to_csv: true       # Export mean accuracy per round to CSV
ray_dashboard: true              # Start or expose Ray dashboard
ray_dashboard_port: 8266         # Port for Ray dashboard

# Fine-grained metrics control
metrics:
  round: true                    # Per-round summary metrics
  memory: true                   # Memory usage metrics
  performance: true              # Timing/throughput metrics
  communication: true            # Communication volume/latency metrics
  system: true                   # System-level metrics (CPU/GPU etc.)
  convergence: true              # Convergence metrics across rounds
  throughput: true               # Global throughput metrics
  availability: true             # Availability / liveness of clients

# ============================================================
# 10. ADVANCED ANALYSIS & FAIRNESS
# ============================================================
shapley: false                   # Enable Shapley value computation for clients
shapley_type: "value"            # Type of Shapley metric (e.g. "value")
use_global_accuracy_for_noniid: true  # Use a global accuracy metric under non-IID settings

# ============================================================
# 11. NOTES
# ============================================================
# The fields near the end (aggregation_sample_scaling, client_k_neighbors,
# shapley, shapley_type, use_global_accuracy_for_noniid, etc.) are often
# automatically added using framework defaults when you run the config
# validator or auto-fill tools.

```

</details>

---

## Configuration Examples

Please note that you cannot just copy paste these values inside your `config.yaml` file and start, as these examples are simplified versions that are missing some values. It is recommended to use `make fill-config` to populate missing values after copying an example, or use `make config` to select a base configuration and then modify it accordingly.

### Example 1: Quick Testing Setup

<details markdown="1">
<summary><strong>Show YAML for Example 1 (Quick Testing Setup)</strong></summary>

```yaml
# Fast training for quick testing
device: "cuda"
gpu_index: 0
random_seed: 42

model_type: "cnn"
dataset_type: "mnist"
learning_rate: 0.01
optimizer: "sgd"

number_of_clients: 5
number_of_epochs: 1
train_batch_size: 128
federated_learning_rounds: 10
clustering_period: 2

data_distribution_kind: "iid"
aggregation_strategy: "FedAvg"

mean_accuracy_to_csv: true
```

</details>

### Example 2: Realistic Non-IID Scenario

<details markdown="1">
<summary><strong>Show YAML for Example 2 (Realistic Non-IID Scenario)</strong></summary>

```yaml
# Highly non-IID federated learning
device: "cuda"
gpu_index: 0
random_seed: 42

model_type: "resnet18"
dataset_type: "cifar10"
learning_rate: 0.001
optimizer: "sgd"
weight_decay: 1e-4

number_of_clients: 20
number_of_epochs: 5
train_batch_size: 32
federated_learning_rounds: 100
clustering_period: 10

data_distribution_kind: "90"     # Highly non-IID
dirichlet_beta: 0.01
aggregation_strategy: "FedAvg"

mean_accuracy_to_csv: true
```

</details>

### Example 3: Privacy-Preserving Training

<details markdown="1">
<summary><strong>Show YAML for Example 3 (Privacy-Preserving Training)</strong></summary>

```yaml
# Differential Privacy enabled
device: "cuda"
gpu_index: 0
random_seed: 42

model_type: "lenet"
dataset_type: "mnist"
learning_rate: 0.01
optimizer: "sgd"

number_of_clients: 10
number_of_epochs: 1
federated_learning_rounds: 50
aggregation_strategy: "FedAvg"

# Differential Privacy Configuration
dp_enabled: true
dp_epsilon: 1.0              # Strong privacy
dp_delta: 1e-5
dp_clipping_norm: 1.0
dp_noise_multiplier: 0.2

mean_accuracy_to_csv: true
```

</details>

### Example 4: Model Compression

<details markdown="1">
<summary><strong>Show YAML for Example 4 (Model Compression)</strong></summary>

```yaml
# Enhanced chunking for compression
device: "cuda"
gpu_index: 0
learning_rate: 0.001

model_type: "resnet50"
dataset_type: "cifar100"

number_of_clients: 20
federated_learning_rounds: 50
aggregation_strategy: "FedAvg"

# Model Compression
chunking: true
chunking_with_gradients: true
chunking_parts: 50

# Communication optimization
sensitivity_percentage: 80    # Send only top 80%
dynamic_sensitivity_percentage: true

mean_accuracy_to_csv: true
```

</details>

### Example 5: Decentralized Federated Learning

<details markdown="1">
<summary><strong>Show YAML for Example 5 (Decentralized Federated Learning)</strong></summary>

```yaml
# Peer-to-peer training
device: "cuda"
gpu_index: 0

model_type: "cnn"
dataset_type: "mnist"

number_of_clients: 8
federated_learning_rounds: 100
aggregation_strategy: "FedAvg"

# Decentralized setup
federated_learning_schema: "decentralized"
federated_learning_topology: "ring"
placement_group_strategy: "spread"

mean_accuracy_to_csv: true
```

</details>

### Example 6: K-Connected Topology

<details markdown="1">
<summary><strong>Show YAML for Example 6 (K-Connected Topology)</strong></summary>

```yaml
# K-connected decentralized topology
device: "cuda"
gpu_index: 0

model_type: "resnet18"
dataset_type: "cifar10"

number_of_clients: 16
federated_learning_rounds: 100

# K-connected topology
federated_learning_schema: "decentralized"
federated_learning_topology: "k_connected"
k_value: 3                   # Each node connected to 3 others
placement_group_strategy: "spread"

mean_accuracy_to_csv: true
```

</details>

---

## Parameter Reference

<details markdown="1">
<summary><strong>Show full parameter reference tables</strong></summary>

### Model Types

| Type      | Parameters | Use Case          | Speed     |
| --------- | ---------- | ----------------- | --------- |
| CNN       | ~200K      | Quick testing     | Very Fast |
| LeNet     | ~60K       | Baseline          | Very Fast |
| ResNet-18 | ~11M       | Standard          | Fast      |
| ResNet-50 | ~25M       | Larger tasks      | Medium    |
| VGG-16    | ~138M      | Complex tasks     | Slow      |
| MobileNet | ~4M        | Edge devices      | Very Fast |
| ViT-Small | ~22M       | Vision transforms | Medium    |
| BERT      | ~110M      | NLP tasks         | Slow      |

### Dataset Types

| Name          | Type  | Classes | Size      |
| ------------- | ----- | ------- | --------- |
| MNIST         | Image | 10      | 70K       |
| Fashion-MNIST | Image | 10      | 70K       |
| CIFAR-10      | Image | 10      | 60K       |
| CIFAR-100     | Image | 100     | 60K       |
| FEMNIST       | Image | 62      | 814K      |
| Shakespeare   | Text  | 80      | 4M chars  |
| BBC           | Text  | 5       | 2.2K docs |

### Aggregation Strategies

| Strategy | Formula            | Use Case              |
| -------- | ------------------ | --------------------- |
| FedAvg   | `average(updates)` | Standard FL           |
| FedProx  | `update + μ·prox`  | Heterogeneous clients |

### Distance Metrics

| Metric     | Formula              | Use Case   |    |                 |
| ---------- | -------------------- | ---------- | -- | --------------- |
| Cosine     | `1 - (u·v / ‖u‖‖v‖)` | Normalized |    |                 |
| Euclidean  | `‖u - v‖`            | Geometric  |    |                 |
| Coordinate | `sum(                | u_i - v_i  | )` | Parameter-based |

### Data Distribution Levels

| Level | Heterogeneity | Beta      |
| ----: | ------------- | --------- |
|   IID | None          | N/A       |
|    20 | Very Low      | 1.0       |
|    50 | Low           | 0.5       |
|    90 | High          | 0.1       |
|   Dir | Custom        | Specified |

</details>

---

## Configuration Validation

### Validate Configuration

```bash
# Validate active configuration
make validate-config

# This checks:
# 1. Required fields present
# 2. Valid combinations (model + dataset compatible)
# 3. Parameter ranges correct
# 4. Dependencies satisfied
```

### Common Validation Errors

```yaml
# ERROR: Invalid model/dataset combination
model_type: "bert"
dataset_type: "mnist"        # ❌ BERT expects text data

# ERROR: Incompatible topology
federated_learning_schema: "traditional"
federated_learning_topology: "ring"  # ❌ Ring requires decentralized

# ERROR: Invalid aggregation
aggregation_strategy: "custom"       # ❌ Not implemented

# ERROR: Incomplete DP config
dp_enabled: true
dp_epsilon: null            # ❌ Must specify epsilon
```

---

## Configuration Tips

### Tip 1: Start Simple

```yaml
# Begin with defaults, increase complexity
device: "cuda"
model_type: "cnn"
dataset_type: "mnist"
number_of_clients: 5
federated_learning_rounds: 10
```

### Tip 2: Adjust for Your Hardware

```yaml
# GPU Memory Optimization
train_batch_size: 32        # Reduce if OOM
test_batch_size: 64
chunking: true              # Enable compression
```

### Tip 3: Non-IID Simulation

```yaml
# Increase non-IID level gradually
data_distribution_kind: "20"     # Start: mild non-IID
# data_distribution_kind: "50"   # Medium
# data_distribution_kind: "90"   # High
```

### Tip 4: Privacy-Utility Tradeoff

```yaml
# Less privacy (better utility)
dp_enabled: true
dp_epsilon: 10.0            # Higher epsilon = more privacy lost

# More privacy (worse utility)
dp_epsilon: 1.0             # Lower epsilon = more private
```

### Tip 5: Communication Efficiency

```yaml
# Reduce communication overhead
chunking: true
chunking_with_gradients: true
sensitivity_percentage: 80   # Send only important 80%
dynamic_sensitivity_percentage: true
```

---

## Configuration Workflow

### Step 1: Choose Base Configuration

```bash
# Browse available templates
make config

# Select one from templates/
# e.g., templates/lenet/label-20/encryption-free/fl.yaml
```

### Step 2: Customize for Your Needs

```yaml
# Modify parameters in config.yaml
number_of_clients: 20           # More clients
federated_learning_rounds: 100  # More rounds
learning_rate: 0.005            # Adjust learning rate
```

### Step 3: Validate Configuration

```bash
make validate-config
```

### Step 4: Run Training

```bash
make run
# or
python main.py
```

### Step 5: Monitor & Analyze

```bash
make logs        # View training logs
```

---

## Advanced Configurations

<details markdown="1">
<summary><strong>Show advanced configuration examples</strong></summary>

### Multi-GPU Training

```yaml
device: "cuda"
gpu_index: "0:4"              # Use GPUs 0, 1, 2, 3
placement_group_strategy: "spread"  # Distribute tasks

number_of_clients: 8
train_batch_size: 128         # Larger batch with multiple GPUs
```

### Research Experiment

```yaml
# Multiple variations for hyperparameter search
learning_rate: 0.001
aggregation_strategy: "FedAvg"

# Data heterogeneity studies
data_distribution_kind: "90"
dirichlet_beta: 0.01

# DP privacy studies
dp_enabled: true
dp_epsilon: 1.0
```

</details>

---

## Resources

* **[Getting Started]({{ site.baseurl }}/getting-started)**: Quick start guide
* **[CLI Reference]({{ site.baseurl }}/cli-reference)**: Command reference
* **[Models & Datasets]({{ site.baseurl }}/guides/models-and-datasets)**: Available options

---

**Next:** Try [CLI Reference]({{ site.baseurl }}/cli-reference) or jump to [Examples]({{ site.baseurl }}/examples/)
{: .text-center }
