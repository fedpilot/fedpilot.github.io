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
make validate-setup
```

This command performs dependency checks and creates all required directories.

### Launching Training

Once setup is complete, initiate the interactive training session with:

```bash
make train
```


<details markdown="1">
<summary><strong>Show example interactive output and explanation</strong></summary>

**Example Output**:

```bash
Configuration browser
========================================================
Found 796 configuration(s)


Choose mode: [prod/dev]
Enter mode (default: dev): dev

Detected 1 GPU(s).
Choose device: [cpu/gpu]
Enter device type (default: gpu): gpu
Current directory: templates

1. bert
2. cnn
3. enhanced_chunking
4. lenet
5. mobilenet
6. others
7. resnet18
8. resnet50
9. vgg16

Enter your choice (1-9) or 'q' to quit: 2

Current directory: templates/cnn

1. [Go back]
2. dir
3. label-100
4. label-20
5. label-30
...
```

This command launches an interactive configuration browser that guides you through the setup process:

* Navigates through available configuration templates in the `templates/` directory
* Prompts for key experiment parameters (device type, federation schema, topology)
* Automatically generates a federation ID with version tracking
* Creates a complete `config.yaml` file tailored to your selections

The interactive system is designed to be beginner-friendly while providing access to all of FedPilot's advanced features.

</details>

### Configuration Files

Configuration files like `config.yaml` that is created during the `make train` process contain all the necessary parameters to run your experiments. The example below shows a simplified version of what a configuration file contains:


<details markdown="1">
<summary><strong>Show example configuration</strong></summary>

```yaml
device: cpu

federation_id: '0.0.1'
federated_learning_schema: 'DecentralizedFederatedLearning'
draw_topology: false
federated_learning_topology: 'k_connect'
adjacency_matrix_file_name: 'adjacency_matrix_2.csv'
client_k_neighbors: 2
client_role: 'train'
placement_group_strategy: 'SPREAD'

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

</details>

### Understanding Configurations

Configurations are YAML files in the `templates/` directory. They define:

* **Model**: Which ML model to train (CNN, ResNet, BERT, etc.)
* **Dataset**: Training data source (MNIST, CIFAR-10, etc.)
* **Topology**: Communication structure (Star, Ring, K-connected)
* **Privacy**: Differential privacy settings
* **Optimization**: Aggregation strategies and parameters

You can modify these configuration files manually or create your own custom configurations. FedPilot includes validation checks that run before training sessions begin, which helps prevent configuration errors and ensures your experiments start with valid parameters.

### Run with Current Configuration

To execute training with an existing configuration without going through the interactive setup:

```bash
make run
```

---

## Configuration Management

### Create a configuration from template

Explore available configuration templates without starting training:

```bash
make config
```
### View Current Configuration

Display the active configuration:

```bash
make show-config
```

### Show grouped summary of template families
You can view a categorized list of available configuration templates:

```bash
make config-summary 
```

<details markdown="1">
<summary><strong>Show example output of config-summary</strong></summary>

```bash
Available configuration templates
========================================================
Root directory: templates
Total templates: 796

bert - 1 templates
    examples: bert_fl.yaml

cnn - 132 templates
    examples: cfl-coordinate-dp.yaml, cfl-cosine-dp.yaml, cfl-cosine-grads-dp.yaml

enhanced_chunking - 1 templates
    examples: config.yaml

lenet - 132 templates
    examples: cfl-coordinate-dp.yaml, cfl-cosine-dp.yaml, cfl-cosine-grads-dp.yaml

mobilenet - 132 templates
    examples: cfl-coordinate-dp.yaml, cfl-cosine-dp.yaml, cfl-cosine-grads-dp.yaml

others - 2 templates
    examples: shapley_lenet_test.yaml, test.yaml

resnet18 - 132 templates
    examples: cfl-coordinate-dp.yaml, cfl-cosine-dp.yaml, cfl-cosine-grads-dp.yaml

resnet50 - 132 templates
    examples: cfl-coordinate-dp.yaml, cfl-cosine-dp.yaml, cfl-cosine-grads-dp.yaml

vgg16 - 132 templates
    examples: cfl-coordinate-dp.yaml, cfl-cosine-dp.yaml, cfl-cosine-grads-dp.yaml

Use 'make config' to browse and select a specific template interactively.
```
</details>

### List All Available Configurations
You can list all available configuration templates in the `templates/` directory (uses less command):

```bash
make list-configs
``` 

### Validate Configuration

You can also validate a configuration file. This includes checking for required fields, as well as the dataset and model compatibility:

```bash
make validate-config
```


<details markdown="1">
<summary><strong>Show example validation output and common errors</strong></summary>

**Example Output**:

```bash
Validating config.yaml
========================================================
Validating config: /home/Disquiet/Desktop/fed/core/config.yaml
Checks:
  1) YAML parsing and default loading via yaml_loader
  2) Semantic validation using ConfigValidator
  3) Required field presence and missing-field warnings
  4) Model and dataset modality compatibility

Step 1/4: YAML parsing and default loading ... ok
Step 2/4: semantic validation (ConfigValidator) ... using default value for `SENSITIVITY_PERCENTAGE` which is 100
ok
Step 3/4: checking required fields and defaults ... ok (with warnings)
[WARN] The following fields are missing from config.yaml; framework defaults will be used:
  - aggregation_sample_scaling
  - client_k_neighbors
  - gpu_index
  - shapley
  - shapley_type
  - use_global_accuracy_for_noniid
  Consider running 'make fill-config' to write these defaults into the file.
Step 4/4: model/dataset modality check ... ok

Config validation complete.
Summary:
  model_type:                 'cnn'
  dataset_type:               'fmnist'
  federated_learning_schema:  'DecentralizedFederatedLearning'
  federated_learning_topology:'ring'

```

</details>



### Session Management

FedPilot automatically creates tmux sessions for long-running experiments to ensure they continue running even if you disconnect. You can manage these sessions using:

```bash
# 1. View active sessions
make sessions (Currently unavailable)

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

<details markdown="1">
<summary><strong>Show supported models, datasets, and distribution levels</strong></summary>

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

</details>

---

## Monitoring and Analysis

### Training Logs

Access training logs:

```bash
make logs
```

<details markdown="1">
<summary><strong>Show example log output and explanation</strong></summary>

```bash
FedPilot training logs and metrics
========================================================

Available runs:
  1) run_20251207_183858
  0) Cancel
Select a run [0-1]: 1

Selected run: logs/run_20251207_183858

Contents of this run directory:
client-0-communication-metrics.csv  client-3-round-metrics.csv          client-7-memory-metrics.csv
client-0-convergence-metrics.csv    client-3-system-metrics.csv         client-7-performance-metrics.csv
client-0-memory-metrics.csv         client-4-communication-metrics.csv  client-7-round-metrics.csv
client-0-performance-metrics.csv    client-4-convergence-metrics.csv    client-7-system-metrics.csv
client-0-round-metrics.csv          client-4-memory-metrics.csv         client-8-communication-metrics.csv
client-0-system-metrics.csv         client-4-performance-metrics.csv    client-8-convergence-metrics.csv
client-1-communication-metrics.csv  client-4-round-metrics.csv          client-8-memory-metrics.csv
client-1-memory-metrics.csv         client-4-system-metrics.csv         client-8-performance-metrics.csv
client-1-performance-metrics.csv    client-5-communication-metrics.csv  client-8-round-metrics.csv
client-1-round-metrics.csv          client-5-convergence-metrics.csv    client-8-system-metrics.csv
client-1-system-metrics.csv         client-5-memory-metrics.csv         client-9-communication-metrics.csv
client-2-communication-metrics.csv  client-5-performance-metrics.csv    client-9-memory-metrics.csv
client-2-convergence-metrics.csv    client-5-round-metrics.csv          client-9-performance-metrics.csv
client-2-memory-metrics.csv         client-5-system-metrics.csv         client-9-round-metrics.csv
client-2-performance-metrics.csv    client-6-communication-metrics.csv  client-9-system-metrics.csv
client-2-round-metrics.csv          client-6-memory-metrics.csv         config.yaml
client-2-system-metrics.csv         client-6-performance-metrics.csv    topology-manager-memory-metrics.csv
client-3-communication-metrics.csv  client-6-round-metrics.csv          topology-manager-performance-metrics.csv
client-3-convergence-metrics.csv    client-6-system-metrics.csv         topology-manager-system-metrics.csv
client-3-memory-metrics.csv         client-7-communication-metrics.csv
client-3-performance-metrics.csv    client-7-convergence-metrics.csv

Metric groups available:
  1) Client metrics
  2) Topology-manager metrics
  0) Cancel
Select metric group [0-2]: 
```

</details>

### Ray Dashboard Monitoring

Ray dashboard runs on `http://localhost:8266`.

---

## Troubleshooting

<details markdown="1">
<summary><strong>Show troubleshooting guide</strong></summary>


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

</details>

---


**Ready to dive deeper?** Check out the [Configuration Guide]({{ site.baseurl }}/configuration-guide)
{: .text-center }

