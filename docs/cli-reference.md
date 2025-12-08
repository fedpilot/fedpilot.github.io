---

layout: default
title: cli-reference
nav_order: 7
---

# CLI Reference Guide

Complete reference for all FedPilot command-line interface (CLI) commands powered by Make. This guide explains every command available through the `make` system.

## Main Commands Overview

```bash
make help                         # Show all available commands
make version                       # Show version information
make info                          # Display system information
```

---

## Command Categories

### Training Commands

#### `make train`

Start interactive federated learning training with configuration selection. Here you have tune all of your configs

```bash
make train

# This command:
# 1. Displays all available configurations in templates/
# 2. Allows interactive navigation through directory structure
# 3. Selects a YAML configuration file
# 4. Validates the configuration
# 5. Starts training in a tmux session
```

**Use When**: You want to explore available configurations and start training.

<details markdown="1">
<summary><strong>Show example interactive output</strong></summary>

```text
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

</details>

#### `make run`

Run training with existing `config.yaml` file without interactive selection.

```bash
make run
# Requirements:
# - config.yaml must exist in current directory
# - Configuration must be valid (run 'make validate' first)

# This command:
# 1. Loads config.yaml
# 2. Validates configuration
# 3. Starts training immediately
```

**Use When**: You have a configuration file ready and want to start immediately.

---

### Configuration Management

#### `make config`

Browse and select configurations without starting training (browse-only mode).

```bash
make config

# This command:
# 1. Shows all available configurations
# 2. Allows navigation through directory tree
# 3. Displays configuration details
# 4. No training is started
```

**Use When**: You want to explore available options without training.

#### `make show-config`

Display the currently active configuration.

```bash
make show-config

# Shows the contents of config.yaml
# Displays all parameters and their values
```

**Use When**: You need to verify which configuration is currently loaded.

<details markdown="1">
<summary><strong>Show example output for <code>make show-config</code></strong></summary>

```text
Current configuration
========================================================
Path: ./config.yaml
  federation_id:        '0.0.32'
  production_mode:      false
  model_type:           "cnn"
  dataset_type:         "fmnist"
  schema:               'DecentralizedFederatedLearning'
  topology:             'ring'
  device:               cuda
  gpu_index:            0
  adjacency_matrix:     'adjacency_matrix_2.csv'
  client_role:          'train'
```

</details>

#### `make validate-config`

Validate the current configuration for errors and consistency.

```bash
make validate-config

# This command:
# 1. Checks required fields are present
# 2. Validates parameter ranges
# 3. Checks model-dataset compatibility
# 4. Verifies aggregation strategy availability
# 5. Reports all errors with helpful messages
```

**Use When**: You've modified configuration and want to verify it's valid.

<details markdown="1">
<summary><strong>Show example validation output</strong></summary>

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

#### `make fill-config`

Fill missing configuration fields with default values.

```bash
make fill-config
# This command:
# 1. Scans config.yaml for missing fields
# 2. Fills them with framework default values
# 3. Saves updated config.yaml
```

**Use When**: You want to ensure all configuration fields are set.

<details markdown="1">
<summary><strong>Show example output for <code>make fill-config</code></strong></summary>

```text
Filling missing defaults in config.yaml
========================================================
Filled config written to /home/Disquiet/Desktop/fed/core/config.yaml (backup: /home/Disquiet/Desktop/fed/core/config.yaml.bak)
Added fields:
  - aggregation_sample_scaling
  - client_k_neighbors
  - shapley
  - shapley_type
  - use_global_accuracy_for_noniid
```

</details>

#### `make clean-config`

Remove the currently active configuration file.

```bash
make clean-config

# Removes config.yaml from current directory
# After running, 'make show-config' will show: No configuration
```

**Use When**: You want to start fresh without existing configuration.

#### `make config-summary`

Display a summary of the current configuration.

```bash
make config-summary
# Shows key parameters of config.yaml in a concise format
```

**Use When**: You want a quick overview of the current configuration.

<details markdown="1">
<summary><strong>Show example config-summary output</strong></summary>

```text
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

#### `make list-configs`

Display all available configurations in a flat list.

```bash
make list-configs

# Shows:
# - All .yaml files found in templates/ directory
# - File paths
# - Count of total configurations
```

**Use When**: You want a quick overview of all available configurations.

<details markdown="1">
<summary><strong>Show example list of configurations</strong></summary>

```text
All configuration templates
========================================================
Root directory: templates
Total templates: 796

bert/label-20/bert_fl.yaml
cnn/dir/beta_0.1/diffential-privacy/cfl-coordinate-dp.yaml
cnn/dir/beta_0.1/diffential-privacy/cfl-cosine-dp.yaml
cnn/dir/beta_0.1/diffential-privacy/cfl-cosine-grads-dp.yaml
cnn/dir/beta_0.1/diffential-privacy/cfl-data-driven-dp.yaml
cnn/dir/beta_0.1/diffential-privacy/cfl-euclidean-dp.yaml
cnn/dir/beta_0.1/diffential-privacy/fl-dp.yaml
cnn/dir/beta_0.1/encryption-free/cfl-coordinate.yaml
cnn/dir/beta_0.1/encryption-free/cfl-cosine-grads.yaml
...
```

</details>

---

### Monitoring & Analysis

#### `make logs`

View training logs and recent log entries.

```bash
make logs

# Shows:
# An intractive log viewer with:
# 1. Full log output
# 2. Filtering options (by metric, round, client)
```

**Use When**: You want to check training progress and debug issues.

#### `make plot`(Currently unavailable)

Plot training metrics in terminal using ASCII visualization.

```bash
make plot

# Interactive command that:
# 1. Loads available CSV files
# 2. Lets you select which metrics to plot
# 3. Displays plots in terminal
# 4. Shows statistical summary
```

**Use When**: You want to visualize training progress without leaving the terminal.

**Features**:

* Multiple series support
* Zoom and pan
* Statistical summaries
* ASCII graphs

#### `make models` (Currently unavailable)

Display saved models and their sizes.

```bash
make models

# Shows:
# 1. List of saved model files
# 2. Model file sizes
# 3. Storage locations
```

**Use When**: You want to check saved models and free up storage if needed.

<details markdown="1">
<summary><strong>Show example output for <code>make models</code></strong></summary>

```text
Model Management
========================================================
Saved models:
  global_model_round_50.pth (85.2M)
  global_model_round_40.pth (85.2M)
  client_models_round_30.pkl (1.2G)
```

</details>

---

### Session Management

#### `make sessions` (Currently unavailable)

Manage tmux training sessions.

```bash
make sessions

# Shows:
# 1. List of active FL sessions
# 2. Session status (attached/detached)
# 3. Session names
# 4. Available session commands
```

**Use When**: You want to manage background training sessions.

<details markdown="1">
<summary><strong>Show example session output and common tasks</strong></summary>

```text
Tmux Session Management
========================================================
Active Federated Learning Sessions:
  ● fl-cnn-mnist-123456 (detached)
  ● fl-resnet-cifar-987654 (attached)

Session Commands:
  tmux attach -t <session-name>           # Reconnect
  tmux kill-session -t <session-name>     # Stop
  Ctrl+B then D                           # Detach
```

**Common Session Tasks**:

```bash
# List all sessions
make sessions

# Attach to a session
tmux attach -t fl-resnet-cifar-987654

# Detach from session (inside tmux)
# Press Ctrl+B then D

# Kill session
tmux kill-session -t fl-resnet-cifar-987654

# Kill all FL sessions
tmux kill-session -t $(tmux list-sessions -t fl | cut -d: -f1)
```

</details>

---

### Monitoring Stack

#### `make monitoring-up` (Currently unavailable)

Start monitoring services (Prometheus, Grafana, Jaeger, OpenTelemetry).

```bash
make monitoring-up

# Starts Docker services:
# 1. otel-collector    - OpenTelemetry collector (port 4317, 4318)
# 2. prometheus        - Metrics database (port 9090)
# 3. grafana           - Dashboards (port 3000)
# 4. jaeger            - Distributed tracing (port 16686)

# Dependencies:
# - Docker must be installed
# - docker-compose must be available
```

**Use When**: You want to monitor training with advanced metrics and dashboards.

**Access Points**:

```text
- Prometheus:  http://localhost:9090
- Grafana:     http://localhost:3000 (admin/admin)
- Jaeger:      http://localhost:16686
- OTLP gRPC:   localhost:4317
- OTLP HTTP:   localhost:4318
```

#### `make monitoring-down` (Currently unavailable)

Stop monitoring services.

```bash
make monitoring-down

# Stops all monitoring containers
# Data preserved in volumes
```

**Use When**: You want to free up resources.

#### `make monitoring-restart` (Currently unavailable)

Restart monitoring services (restart stack).

```bash
make monitoring-restart

# Equivalent to:
# 1. make monitoring-down
# 2. make monitoring-up

# Useful for:
# - Clearing metrics
# - Resetting dashboards
# - Troubleshooting connectivity
```

---

### Utility Commands

#### `make setup`

Setup framework environment and verify dependencies.

```bash
make setup

# This command:
# 1. Uses uv to install dependencies 
# 2. Verifies Python version
```

**Use When**: Setting up FedPilot for the first time.

#### `make validate-setup`

Validate the current environment setup.

```bash
make validate-setup
# This command:
# 1. Checks Python version
# 2. Verifies required packages are installed
# 3. Confirms CUDA availability if GPU is used
```

<details markdown="1">
<summary><strong>Show example validate-setup output</strong></summary>

```text
Validating FedPilot environment

Directories
  logs: exists (61 files)
  saved_models: exists (0 files)
  results: exists (0 files)
  experiments: exists (0 files)

Tools
  uv: /home/Disquiet/.local/bin/uv
  tmux: tmux 3.5a
  ray: ray, version 2.51.1

Python and core packages
  Python: 3.12.8
  torch:  2.9.0+cu128
  numpy:  1.26.4
  yaml:   6.0.1

GPU / CUDA
  nvidia-smi: available
  torch.cuda: 1 visible via torch.cuda

Validation complete. Review any warnings or errors above before running experiments.
```

</details>

**Use When**: You want to ensure your environment is correctly configured.

#### `make info`

Display detailed system information.

```bash
make info

# Shows:
# - Python version and location
# - Installed packages and versions
# - CUDA/GPU details
# - Memory and CPU information
```

<details markdown="1">
<summary><strong>Show example system info output</strong></summary>

```text
FedPilot version: v2.0.0

System information
OS:      Linux 6.17.4-arch2-1 x86_64
Shell:   /bin/bash

Hardware
CPU:     12th Gen Intel(R) Core(TM) i7-12700KF
Memory:  31Gi total
GPUs:    nvidia-smi detected
          0, NVIDIA GeForce RTX 4080, 16376 MiB
CUDA:    1 visible via torch.cuda
```

</details>

**Use When**: You need diagnostic information or system details.

#### `make version`

Display FedPilot version and framework information.

```bash
make version

# Output:
# FedPilot v2.0.0
# Ray 2.47.1
# PyTorch 2.7.1
# CUDA 12.1
```

#### `make help`

Display complete help with all available commands.

```bash
make help

# Shows:
# - All available commands
# - Brief description of each
# - Example usage
# - Color-coded for easy reading
```

---

## Workflow Example

```bash
# 1. Setup environment
make setup

# 2. Verify installation
make validate-setup

# 3. Browse and select configuration
make config
# (Selects configuration and starts training)

# 4. Validate configuration (optional)
make validate-config

# 5. If anything was missing, fix and re-validate
make fill-config

# 4. After training completes
make logs
```

---

## Quick Reference Table

| Task                      | Command                |
| ------------------------- | ---------------------- |
| setup environment         | `make setup`           |
| Validate setup            | `make validate-setup`  |
| Start training            | `make train`           |
| Quick training            | `make run`             |
| Check logs                | `make logs`            |
| Create a config           | `make config`          |
| Show active config        | `make show-config`     |
| Validate config           | `make validate-config` |
| Fill config with defaults | `make fill-config`     |
| Clean config              | `make clean-config`    |
| Config summary            | `make config-summary`  |
| List all configs          | `make list-configs`    |
| System info               | `make info`            |
| Show version              | `make version`         |
| Show help                 | `make help`            |

---

## Resources

* **[Getting Started]({{ site.baseurl }}/getting-started)**: Quick start guide
* **[Configuration Guide]({{ site.baseurl }}/configuration-guide)**: Config reference
* **[Troubleshooting]({{ site.baseurl }}/getting-started#troubleshooting)**: Common issues

---

**Need help?** Check [Getting Started]({{ site.baseurl }}/getting-started) or run `make help`
{: .text-center }
