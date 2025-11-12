---
layout: default
title: Getting Started   
nav_order: 5
---

# Getting Started with FedPilot

A step-by-step guide to setting up and running your first federated learning experiment with FedPilot.

---

## Prerequisites

Before running FedPilot, make sure your environment meets the hardware and software requirements described in [Requirements & Installation]({{ site.baseurl }}/requirements-and-installation).



---

## Getting Started with Training

### Interactive Configuration Setup

FedPilot streamlines the setup process through a Make-based command-line interface. Begin by verifying your environment with:

```bash
make setup
```

This command performs dependency checks and creates all required directories.

### Launching Training

Once setup is complete, initiate the interactive training session with:

```bash
make train
```

**Example Output**:


🚀 FedPilot - Training Mode
========================================================
✓ Found 796 configuration(s) - Starting interactive navigation...

make[1]: Entering directory '/home/Disquiet/Desktop/fed/core'
📁 Current directory: templates

1. 📂 bert/
2. 📂 cnn/
3. 📂 enhanced_chunking/
4. 📂 lenet/
5. 📂 mobilenet/
...
```

This command launches an interactive configuration browser that guides you through the setup process:

* Navigates through available configuration templates in the `templates/` directory
* Prompts for key experiment parameters (device type, federation schema, topology)
* Automatically generates a federation ID with version tracking
* Creates a complete `config.yaml` file tailored to your selections

The interactive system is designed to be beginner-friendly while providing access to all of FedPilot's advanced features.

### Configuration Files

Configuration files like `config.yaml` that is created during the `make train` process contain all the necessary parameters to run your experiments. The example below shows a simplified version of what a configuration file contains:

```yaml
device: cpu

federation_id: '0.0.1'
federated_learning_schema: 'DecentralizedFederatedLearning'
draw_topology: false
federated_learning_topology: 'k_connect'
adjacency_matrix_file_name: 'adjacency_matrix_2.csv'
client_k_neighbors: 2
client_role: 'train'
placement_group_strategy: 'PLACEMENT_GROUP_SPREAD'

random_seed: 42

learning_rate: 0.001
runtime_engine: "torch"
model_type: "cnn"
transformer_model_size: "base"
pretrained_models: false
dataset_type: "fmnist"
loss_function: "CrossEntropy"
optimizer: "sgd"

# Data distribution settings
data_distribution_kind: "20"
desired_distribution: null
dirichlet_beta: 0.1

# Aggregation strategy
aggregation_strategy: "FedAvg"
fed_avg: true
```

### Understanding Configurations

Configurations are YAML files in the `templates/` directory. They define:

* **Model**: Which ML model to train (CNN, ResNet, BERT, etc.)
* **Dataset**: Training data source (MNIST, CIFAR-10, etc.)
* **Topology**: Communication structure (Star, Ring, K-connected)
* **Privacy**: Differential privacy settings
* **Optimization**: Aggregation strategies and parameters

You can modify these configuration files manually or create your own custom configurations. FedPilot includes validation checks that run before training sessions begin, which helps prevent configuration errors and ensures your experiments start with valid parameters.

> Note: For the time being, you need to manually add `placement_group_strategy` in the configuration file.

### Quick Training

If you already have a configuration file from a previous session, use the quick training mode to start immediately:

```bash
make quick-train
```

### Run with Current Configuration

To execute training with an existing configuration without going through the interactive setup:

```bash
make run
```

---

## Configuration Management

### Browse Available Configurations

Explore available configuration templates without starting training:

```bash
make config
```

### Validate Configuration

Check your current configuration for errors:

```bash
make validate
```

**Example Output**:

```bash
✅ Configuration Validation
========================================================
✓ Configuration file exists
Validating YAML syntax...
✓ Valid YAML syntax
Checking required fields...
  ✓ device: cpu
  ✓ random_seed: 42
  ✓ learning_rate: 0.001
  ✓ model_type: cnn
  ...
  🎉 Configuration validation complete!
```

### View Current Configuration

Display the active configuration:

```bash
make show-config
```

### Session Management

FedPilot automatically creates tmux sessions for long-running experiments to ensure they continue running even if you disconnect. You can manage these sessions using:

```bash
# 1. View active sessions
make sessions

# 2. List all available sessions
tmux list-sessions             

# 3. Attach to specific session
tmux attach -t fl-resnet-cifar-12345

# 4. View logs for specific session
tail -100 logs/resnet_cifar10_*.log

# 5. Kill session if needed
tmux kill-session -t fl-resnet-cifar-12345
```

---

## Supported Models and Datasets

### Models

| Model     | Type  | Params | Use Case                  |
| --------- | ----- | ------ | ------------------------- |
| CNN       | Image | ~200K  | Quick testing, baseline   |
| LeNet     | Image | ~60K   | Fast training, embedded   |
| ResNet-18 | Image | ~11M   | Standard baseline         |
| ResNet-50 | Image | ~25M   | Realistic tasks           |
| VGG-16    | Image | ~138M  | Large-scale tasks         |
| MobileNet | Image | ~4M    | Edge devices, compression |
| ViT-Small | Image | ~22M   | Vision transformers       |
| BERT      | NLP   | ~110M  | Language tasks            |

### Datasets

| Dataset       | Type  | Classes | Samples       |
| ------------- | ----- | ------- | ------------- |
| MNIST         | Image | 10      | 70K           |
| Fashion-MNIST | Image | 10      | 70K           |
| CIFAR-10      | Image | 10      | 60K           |
| CIFAR-100     | Image | 100     | 60K           |
| FMNIST        | Image | 10      | 70K           |
| Shakespeare   | Text  | 80      | 4M characters |
| BBC News      | Text  | 5       | 2.2K docs     |

### Data Distribution Levels

* IID (Uniform): All clients have same class distribution
* 20/50/90: Non-IID level (lower = more heterogeneous)
* Dir (Dirichlet): Beta parameter controls distribution

---

## Configuration Selection Guide

### Recommended Starting Configurations

#### Basic Federated Learning Demonstration

**Configuration**: `templates/cnn/label-20/encryption-free/fl.yaml`

* Model: Convolutional Neural Network (CNN)
* Dataset: MNIST with 20% label heterogeneity
* Use Case: Introductory experiments and system validation
* Training Time: 5-10 minutes per federation round
* Characteristics: Minimal configuration with standard FedAvg aggregation

#### Realistic Non-IID Data Distribution

**Configuration**: `templates/lenet/label-90/encryption-free/fl.yaml`

* Model: LeNet architecture
* Dataset: Highly heterogeneous data distribution (90% label skew)
* Use Case: Studying federation under realistic data partitioning
* Characteristics: 10 clients with significant statistical heterogeneity
* Research Focus: Algorithm robustness to non-IID data challenges

#### Privacy-Preserving Federated Learning

**Configuration**: `templates/resnet18/label-50/differential-privacy/fl-dp.yaml`

* Model: ResNet-18 for complex vision tasks
* Privacy: Differential Privacy with DP-SGD optimization
* Use Case: Applications requiring formal privacy guarantees
* Characteristics: Noise injection and gradient clipping mechanisms
* Compliance: Meets rigorous privacy preservation standards

#### Communication-Efficient Federation

**Configuration**: `templates/mobilenet/label-50/encryption-free/cfl-cosine.yaml`

* Model: MobileNet (lightweight architecture)
* Optimization: Cosine similarity clustering and model compression
* Use Case: Bandwidth-constrained environments
* Characteristics: Reduced communication overhead through intelligent chunking
* Efficiency: Balanced trade-off between accuracy and communication costs

#### Advanced Clustering Analysis

**Configuration**: `templates/resnet50/label-50/encryption-free/cfl-euclidean.yaml`

* Model: ResNet-50 for high-performance vision tasks
* Methodology: Data-driven clustering with Euclidean distance metrics
* Use Case: Investigating client similarity and cluster formation
* Characteristics: Multiple clustering rounds with detailed analysis output
* Research Value: Insights into data distribution and client relationships

---

## Monitoring and Analysis

### Training Logs

Access training logs and outputs to monitor your experiment's progress in real-time:

```bash
make logs
```

**Example Output**:

```bash
2025/11/06 19:58:46,     INFO | Logger object created successfully...
2025/11/06 19:58:46,  WARNING | The ./logs/cnn/cosine/Model=cnn-Datase
```

### Experiment Results

```bash
make experiments
```

### Saved Models

```bash
make models
```

### Ray Dashboard Monitoring

Ray dashboard typically runs on `http://localhost:8265`.

---

## Troubleshooting

### Common Issues

**Ray Connection Error**:
### Issue: "\`--address\` is a required flag unless starting a head node with \`--head\`."
### Issue: "ConnectionError: Ray is trying to start at \<ip address\>, but is already running at \<ip address\>. Please specify a different port using the \`--port\` flag of \`ray start\` command."
```bash
ray status
ray stop --force
ray start --head
```

**GPU Not Detected**:
### Issue: "AssertionError: Torch not compiled with CUDA enabled"

### Issue: "RuntimeError: CUDA error: no CUDA-capable device is detected"

First make sure your GPU is detected and that you have installed [Nvidia Cuda Toolkit](https://developer.nvidia.com/cuda-downloads)

```bash
nvidia-smi # Make sure it show the correct information for your GPU
```

Then install PyTorch with CUDA Support:

```bash
# Install PyTorch with CUDA 12.1 support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Or for CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Verify CUDA
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

Finally, verify that your GPU is detected:

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA devices: {torch.cuda.device_count()}")
```

**Configuration Errors**:

Execute the following command to diagnose potential issues in the configuration file:
```bash
make validate
```

**Example output**

```bash
✓ Configuration file exists
Validating YAML syntax...
✓ Valid YAML syntax
Checking required fields...
  ❌ Missing required field: device
  ✓ random_seed: 42
  ✓ learning_rate: 0.001
  ✓ model_type: cnn
```

If you are familiar with the configuration parameters, you may attempt to resolve these issues by modifying the existing configuration file. Alternatively, you may generate a new configuration file by executing the commands below.

```bash 
make clean-config
make config
```

Other common validation errors:
```bash
# ERROR: Invalid model/dataset combination
model_type: "bert"
dataset_type: "mnist"        # BERT expects text data

# ERROR: Incompatible topology
federated_learning_schema: "traditional"
federated_learning_topology: "ring"  # Ring requires decentralized

# ERROR: Invalid aggregation
aggregation_strategy: "custom"       # Not implemented

# ERROR: Incomplete DP config
dp_enabled: true
dp_epsilon: null            # Must specify epsilon
```

**Memory Issues**:

If the program terminates unexpectedly, reducing the resource requirements may alleviate the issue.

```yaml
train_batch_size: 16
test_batch_size: 16
number_of_clients: 2
```



---


**Ready to dive deeper?** Check out the [Configuration Guide]({{ site.baseurl }}/configuration-guide) or [Architecture Overview]({{ site.baseurl }}/architecture/overview)
{: .text-center }

