---
layout: default
title: Requirements & Installation  
nav_order: 4 
---
# Requirements & Installation

Hardware & software requirements for using FedPilot.

---

## System Requirements
While FedPilot can dynamically utilize available resources to scale experiments, it still imposes baseline hardware and software requirements.

### Minimum System Requirements

* **RAM**: 8GB for basic experiments
* **Storage**: 20GB free space for dependencies and models
* **CPU**: Multi-core processor (4+ cores recommended, Intel 8th generation or equivalent AMD CPU)

### Operating System Support

* **Linux**, **macOS**, **Windows** (via WSL2 recommended)

### Optional Requirements

* **Docker**: For containerized deployment
* **Ray Cluster**: For distributed training
* **Prometheus + Grafana**: For monitoring

---

## Python Environment

### Required Python Version

* **Python 3.12**

### Package Managers

* **pip** 20.0+ (primary installation method)
* **conda** (optional, for environment management)

---

## Core Dependencies

| Package      | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| torch        | 2.7.1   | Deep learning framework         |
| torchvision  | 0.22.1  | Vision models and datasets      |
| transformers | 4.53.0  | Pre-trained models (BERT, etc.) |
| ray          | 2.47.1  | Distributed computing           |
| numpy        | 1.26.4  | Numerical computing             |
| scipy        | 1.16.0  | Scientific computing            |
| pandas       | 2.2.3   | Data analysis                   |
| scikit-learn | 1.6.1   | Machine learning utilities      |

### Monitoring & Tracing

| Package           | Version | Purpose                |
| ----------------- | ------- | ---------------------- |
| opentelemetry-api | 1.25.0+ | Distributed tracing    |
| opentelemetry-sdk | 1.25.0+ | Tracing implementation |
| prometheus_client | 0.22.1  | Metrics collection     |
| tensorboardX      | 2.6.4   | Experiment tracking    |

---

## Platform-Specific Considerations (Obsolete)

### x86 Systems (requirements.txt)

* Full compatibility with all dependencies
* Standard CUDA support via PyTorch (Optional)

### ARM Architecture (requirements_arm.txt) 

* ARM-optimized builds where available
* NVIDIA CUDA support for ARM systems
* Additional NVIDIA library packages included

---

## GPU Acceleration

### CUDA Requirements

* **CUDA 11.8** or **CUDA 12.1** (compatible with PyTorch 2.7.1)
* **cuDNN 8.9.0+** for optimized deep learning operations
* **NVIDIA drivers** 525.60.13+ for CUDA 11.8, 535.86.10+ for CUDA 12.1

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/fedpilot/core
cd core
```


### Installing dependencies using uv

**uv** is a modern package and project manager that replaces many existing Python tools (such as `pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine`, `virtualenv`, and others).

To install *uv*, you can run:

```
pip install uv
```

or follow the binary installation guide at:

[https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

After installing *uv*, go to the root of this project and run the following command:

```bash
uv sync
```

This creates a virtual environment (default `.venv/`) and installs all dependencies listed in `pyproject.toml`.


### Virtual Environment (optional)

Using a virtual environment is **recommended** to avoid dependency conflicts. A virtual environment is already created by uv. You can activate it using the following command.

```bash
source .venv/bin/activate # On Windows: .venv\Scripts\activate
```
### Run the Project
Execute `uv run main.py` to run the project.

---
## Verify Installation
To verify installation, you can run the following:

```bash
python --version 

# Check core dependencies
python -c "import torch; print(f'PyTorch: {torch.__version__}')"
python -c "import ray; ray.init(); print('Ray initialized successfully')"
python -c "import transformers; print(f'Transformers: {transformers.__version__}')"

# Check CUDA availability (if you are using a GPU)
python -c "import torch; print(f'CUDA Available: {torch.cuda.is_available()}')"
python -c "import torch; print(f'GPU Count: {torch.cuda.device_count()}')"
```

or simply execute:
```bash
make setup
```

---

## GPU Setup (Nvidia)

```bash
# Make sure your gpu is detected
nvidia-smi

# Using apt (Debian)
sudo apt-get update
sudo apt-get install nvidia-cuda-toolkit

# Using pacman (Arch)
sudo pacman -Syu
sudo pacman -S cuda
```

You can also install nvidia Cuda Toolkit using the [official Nvidia download page](https://developer.nvidia.com/cuda-downloads).

#### PyTorch with CUDA Support:

```bash
# Install PyTorch with CUDA 12.1 support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Or for CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Verify CUDA
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

---

## CPU-Only Installation

```bash
# Install PyTorch CPU version
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Update config to use CPU
# In your config.yaml:
device: "cpu"
gpu_index: null
```

---

## Version Compatibility

All dependency versions are pinned to ensure:

* Reproducible experiments across different systems
* Compatibility between Ray, PyTorch, and supporting libraries
* Stable performance and known behavior

---
## Troubleshooting
### Issue: "ModuleNotFoundError: No module named 'torch'"

**Solution:**
```bash
# Reinstall PyTorch
pip uninstall torch torchvision torchaudio -y
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Or verify PYTHONPATH
echo $PYTHONPATH
```


### Issue: "ImportError: cannot import name 'ConfigValidator'"

**Solution:**
```bash
# Verify project structure
ls -la src/validators/

# Reinstall in development mode
pip install -e .

# Check PYTHONPATH
export PYTHONPATH="/path/to/FedPilot/core:$PYTHONPATH"
```

### Issue: Python version mismatch

**Solution:**
```bash
# Check Python version
python --version

# Use specific Python version
python3.12 --version
python3.12 -m venv fedpilot_env
source fedpilot_env/bin/activate
```
---




**Installation complete?** Check out [Getting Started Guide]({{ site.baseurl }}/getting-started) to start using FedPilot!
{: .text-center }

