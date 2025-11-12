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

**Example Output**:
```
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
...
```

#### `make quick-train`
Run training with existing `config.yaml` file without interactive selection.

```bash
make quick-train

# Requirements:
# - config.yaml must exist in current directory
# - Configuration must be valid (run 'make validate' first)

# This command:
# 1. Loads config.yaml
# 2. Validates configuration
# 3. Starts training immediately
```

**Use When**: You have a configuration file ready and want to start immediately.

**Example**:
```bash
# First, prepare your config
cp templates/lenet/label-20/encryption-free/fl.yaml config.yaml

# Then run
make quick-train
```

#### `make run`
Execute training with current configuration (lowest-level training command).

```bash
make run

# Directly runs:
# python main.py

# Use for:
# - Direct Python debugging
# - Integration with other tools
# - Automated scripts
```

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

**Example Output**:
```
📄 Current Active Configuration
========================================================
✓ Configuration loaded:
----------------------------------------
# Source: templates/cnn/label-20/encryption-free/fl.yaml

device: cpu

federation_id: '0.0.2'
federated_learning_schema: 'DecentralizedFederatedLearning'
draw_topology: false
federated_learning_topology: 'ring'
adjacency_matrix_file_name: 'adjacency_matrix_2.csv'
client_k_neighbors: 2
client_role: 'train'

# GPU Configuration Examples:
# Single GPU configurations:
#   gpu_index: 0     # Use GPU 0
#   gpu_index: 1     # Use GPU 1
#   gpu_index: 2     # Use GPU 2
# Multi-GPU configurations:
#   gpu_index: "0:3" # Use GPUs 0, 1, 2 (multi-GPU training)
#   gpu_index: "1:4" # Use GPUs 1, 2, 3 (multi-GPU training)
... (showing first 20 lines)

📁 Full config available in ./config.yaml

Configuration Type: cnn/fmnist
```

#### `make validate`
Validate the current configuration for errors and consistency.

```bash
make validate

# This command:
# 1. Checks required fields are present
# 2. Validates parameter ranges
# 3. Checks model-dataset compatibility
# 4. Verifies aggregation strategy availability
# 5. Reports all errors with helpful messages
```

**Use When**: You've modified configuration and want to verify it's valid.

**Example**:
```bash
✅ Configuration Validation
========================================================
✓ Configuration file exists
Validating YAML syntax...
❌ Invalid YAML syntax
```

#### `make clean-config`
Remove the currently active configuration file.

```bash
make clean-config

# Removes config.yaml from current directory
# After running, 'make show-config' will show: No configuration
```

**Use When**: You want to start fresh without existing configuration.

#### `make list`
Display all available configurations in a flat list.

```bash
make list

# Shows:
# - All .yaml files found in templates/ directory
# - File paths
# - Count of total configurations
```

**Use When**: You want a quick overview of available configurations.

**Example Output**:
```
📋 All Available Configurations (Flat View)
========================================================
1. bert/label-20/bert_fl.yaml
2. cnn/dir/beta_0.1/diffential-privacy/cfl-coordinate-dp.yaml
3. cnn/dir/beta_0.1/diffential-privacy/cfl-cosine-dp.yaml
4. cnn/dir/beta_0.1/diffential-privacy/cfl-cosine-grads-dp.yaml
5. cnn/dir/beta_0.1/diffential-privacy/cfl-data-driven-dp.yaml
6. cnn/dir/beta_0.1/diffential-privacy/cfl-euclidean-dp.yaml
7. cnn/dir/beta_0.1/diffential-privacy/fl-dp.yaml
8. cnn/dir/beta_0.1/encryption-free/cfl-coordinate.yaml
9. cnn/dir/beta_0.1/encryption-free/cfl-cosine-grads.yaml
10. cnn/dir/beta_0.1/encryption-free/cfl-cosine.yaml
11. cnn/dir/beta_0.1/encryption-free/cfl-darta-driven.yaml
12. cnn/dir/beta_0.1/encryption-free/cfl-euclidean.yaml
...
```

---

### Monitoring & Analysis

#### `make status`
Display framework status and system information.

```bash
make status

# Shows:
# - Framework version
# - Number of available configurations
# - Active configuration status
# - System resources (CPU, GPU, RAM)
# - Directory status (logs, models, results)
```

**Use When**: You want a quick health check of the system.

**Example Output**:
```
📈 FedPilot Status
========================================================
🔧 Framework Information:
  Version: v2.0.0
  Configurations: 796 available
  Active Config: ✓ Loaded
  Config Type: cnn/fmnist

📁 Directory Status:
  logs/: ✓        0 files
  saved_models/: ✓        0 files
  results/: ✓        0 files
  experiments/: ✓        0 files

🖥️  System Resources:
  GPUs: ⚠ Not detected
  Python: /bin/sh: python: command not found
  PyTorch: Not installed

```

#### `make logs`
View training logs and recent log entries.

```bash
make logs

# Shows:
# 1. List of available log files
# 2. Last 20 lines of latest log file
# 3. Can pipe to grep for filtering:
#    make logs | grep "Accuracy"
#    make logs | grep "Loss"
#    make logs | grep "Round"
```

**Use When**: You want to check training progress and debug issues.

**Examples**:
```bash
# View all logs
make logs

# Filter for accuracy metrics
make logs | grep "Accuracy"

# Filter for loss values
make logs | grep "Loss"

# Filter for specific round
make logs | grep "Round 10"

# Follow latest log (real-time)
tail -f logs/latest.log
```

#### `make experiments`
Display experiment results and metrics.

```bash
make experiments

# Shows:
# 1. List of result files (CSV, JSON)
# 2. Preview of latest results
# 3. Result file locations
```

**Use When**: You want to check training results and metrics.

**Example Output**:
```
Experiment Results
========================================================
Result files:
  accuracy_lenet_mnist_2024.csv
  metrics_lenet_mnist_2024.csv

Latest results preview:
================================================
Round,Avg_Accuracy,Loss,Communication_Time
1,0.45,2.31,0.12
2,0.52,1.89,0.11
...
```

#### `make plot`
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
- Multiple series support
- Zoom and pan
- Statistical summaries
- ASCII graphs

#### `make models`
Display saved models and their sizes.

```bash
make models

# Shows:
# 1. List of saved model files
# 2. Model file sizes
# 3. Storage locations
```

**Use When**: You want to check saved models and free up storage if needed.

**Example Output**:
```
Model Management
========================================================
Saved models:
  global_model_round_50.pth (85.2M)
  global_model_round_40.pth (85.2M)
  client_models_round_30.pkl (1.2G)
```

---

### Session Management

#### `make sessions`
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

**Example Output**:
```
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

---

### Monitoring Stack

#### `make monitoring-up`
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
```
- Prometheus:  http://localhost:9090
- Grafana:     http://localhost:3000 (admin/admin)
- Jaeger:      http://localhost:16686
- OTLP gRPC:   localhost:4317
- OTLP HTTP:   localhost:4318
```

#### `make monitoring-down`
Stop monitoring services.

```bash
make monitoring-down

# Stops all monitoring containers
# Data preserved in volumes
```

**Use When**: You want to free up resources.

#### `make monitoring-restart`
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
# 1. Creates necessary directories (logs, models, results, experiments)
# 2. Verifies Python installation
# 3. Checks key dependencies
# 4. Initializes Ray
# 5. Tests GPU availability
# 6. Sets up logging
```

**Use When**: Setting up FedPilot for the first time.

#### `make info`
Display detailed system information.

```bash
make info

# Shows:
# - Python version and location
# - Installed packages and versions
# - Ray cluster information
# - CUDA/GPU details
# - Memory and CPU information
```

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

## Workflow Examples

### Workflow 1: Complete Training Session

```bash
# 1. Setup environment
make setup

# 2. Browse and select configuration
make train
# (Selects and starts training)

# 3. In another terminal, monitor
make logs      # Check progress
make status    # System status

# 4. After training completes
make experiments   # View results
make plot          # Plot metrics
make models        # Check saved models
```



### Workflow 2: Configuration Testing

```bash
# 1. View current config
make show-config

# 2. Validate it
make validate

# 3. If valid, run quick training
make quick-train

# 4. Explore results
make experiments
make plot
```

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Start training | `make train` |
| Quick training | `make quick-train` |
| View status | `make status` |
| Check logs | `make logs` |
| View results | `make experiments` |
| Plot metrics | `make plot` |
| Manage models | `make models` |
| Browse configs | `make config` |
| Show active config | `make show-config` |
| Validate config | `make validate` |
| List all configs | `make list` |
| Manage sessions | `make sessions` |
| Start monitoring | `make monitoring-up` |
| Stop monitoring | `make monitoring-down` |
| System info | `make info` |
| Show version | `make version` |
| Show help | `make help` |

---

## Resources

- **[Getting Started]({{ site.baseurl }}/getting-started)**: Quick start guide
- **[Configuration Guide]({{ site.baseurl }}/configuration-guide)**: Config reference
- **[Monitoring Guide]({{ site.baseurl }}/guides/monitoring-and-tracing)**: Advanced monitoring
- **[Troubleshooting]({{ site.baseurl }}/getting-started#-troubleshooting)**: Common issues

---

**Need help?** Check [Getting Started]({{ site.baseurl }}/getting-started) or run `make help`
{: .text-center }
