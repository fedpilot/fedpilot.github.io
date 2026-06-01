---
title: Getting Started
layout: default
parent: Entry & Configuration
---
# Getting Started & CLI Reference

FedPilot is designed to be highly accessible for both rapid local prototyping and heavy cluster deployment. You can interact with the framework via the terminal CLI (using the Makefile) or through a visual GUI.

## Prerequisites

Before starting, ensure your system has:
- A Linux-based environment (e.g., Fedora or Arch Linux) or WSL2.
- **Python >= 3.12**
- **uv**: The ultra-fast Python package installer (`pip install uv`).
- **Tmux**: For background session management.
- **Docker**: (Optional) for telemetry and monitoring stacks.

## 1. Environment Setup

Clone the repository and install all locked dependencies.

```bash
$ make setup
```
This command uses `uv sync` to establish the virtual environment and fetch core dependencies like PyTorch and Ray. 

To verify your CUDA, Ray, and Tmux configurations:
```bash
$ make validate-setup
```

## 2. Configuration Management

You rarely edit `config.yaml` blindly. FedPilot provides a powerful set of CLI commands to manage configurations.

### Interactive Creation
Launch a terminal UI to navigate the `templates/` directory and select a base configuration:
```bash
$ make config
```

### Validation & Auto-Fill
Before running an experiment, ensure your configuration is semantically valid (e.g., ensuring your selected model architecture matches the dataset modality):
```bash
$ make validate-config
```
If you are missing parameters, FedPilot can automatically inject the framework defaults for you:
```bash
$ make fill-config
```

### Visual Dashboard (Recommended)
If you prefer a visual approach over the CLI, boot the Streamlit Dashboard:
```bash
$ cd fedpilot-dashboard
$ streamlit run app.py
```
Use the **Setup Experiment Modal** to visually tweak configurations and write directly to `config.yaml`.

## 3. Execution & Monitoring

Once configured, launch the training loop.

```bash
$ make run
```

### Background Execution (Tmux)
`make run` automatically detaches the experiment into a background Tmux session. This prevents training from crashing if your SSH connection drops. 
- **View Active Sessions**: `make sessions`
- **Re-attach**: `tmux attach -t <session-name>`
- **Detach manually**: `Ctrl+B`, then `D`

### Real-Time Logs & Telemetry
To view live training logs with filtering capabilities:
```bash
$ make logs
```
To visualize convergence directly in the terminal via ASCII plots:
```bash
$ make plot
```

For advanced observability (Prometheus, Grafana, Jaeger), start the OpenTelemetry Docker stack:
```bash
$ make monitoring-up
```

## Further Development
To start developing custom tools, look at the [Registries](../registries/model_registry.md). If you wish to build entirely new paradigms, study the [Schemas SDK](../schemas_and_apps/schemas_sdk.md).

