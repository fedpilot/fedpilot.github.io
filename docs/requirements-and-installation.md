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

* **Linux**
* **macOS**
* **Windows** (via WSL2 recommended)

### Optional Requirements

* **Docker**: For containerized deployment
* **Ray Cluster**: For distributed training
* **Prometheus + Grafana**: For monitoring
* **tmux**: For running training in a detached session (the `make run` target uses tmux if available)

---

## Python Environment

### Required Python Version

* **Python 3.12**

FedPilot is developed and tested against Python 3.12. Other versions may work but are not officially supported.

### Package Managers

* **uv** (recommended; used by the Makefile)
* **pip** 20.0+ (underlying installer used by uv)
* **conda** (optional, for advanced environment management)

---

## Core Dependencies

<details markdown="1">
<summary><strong>Show full dependency tables</strong></summary>

<br>

### Core Libraries

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

These versions are pinned in `pyproject.toml` and installed via `uv sync` (typically through `make setup`).

</details>

---

## GPU Acceleration

<details markdown="1">
<summary><strong>Show CUDA version and driver requirements</strong></summary>

<br>

### CUDA Requirements

* **CUDA 11.8** or **CUDA 12.1** (compatible with PyTorch 2.7.1)
* **cuDNN 8.9.0+** for optimized deep learning operations
* **NVIDIA drivers**:

  * 525.60.13+ for CUDA 11.8
  * 535.86.10+ for CUDA 12.1

</details>

---

## Installation

FedPilot ships with a Make-based CLI. The commands shown below assume that:

* `make` is available in your shell
* `uv` is installed (or can be installed) for Python dependency management

### Clone the Repository

```bash
git clone https://github.com/fedpilot/core
cd core
```

### Installing dependencies using uv

`uv` is a modern package and project manager that replaces many existing Python tools (such as `pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine`, `virtualenv`, and others).

To install `uv`, you can run:

```bash
pip install uv
```

or follow the binary installation guide at:

[https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

Once `uv` is installed, the **recommended** way to install dependencies is:

```bash
make setup
```

This will:

* Check that `uv` is available
* Run `uv sync` to install and lock Python dependencies

<details markdown="1">
<summary><strong>Show example output</strong></summary>

```bash
FedPilot setup
Checking for uv...
uv detected: /home/Disquiet/.local/bin/uv

Running uv sync to install and lock Python dependencies...
Using CPython 3.12.8
Creating virtual environment at: .venv
Resolved 131 packages in 0.80ms
Installed 129 packages in 199ms
 + accelerate==1.11.0
 + aiohappyeyeballs==2.6.1
 + aiohttp==3.13.2
 + aiohttp-cors==0.8.1
 + aiosignal==1.4.0
 + annotated-types==0.7.0
 + attrs==23.2.0
 + cachetools==6.2.1
 + certifi==2025.6.15
 + cffi==1.17.1
 + charset-normalizer==3.4.2
 + click==8.1.6
 + colorful==0.5.8
 + contourpy==1.3.2
 + cryptography==41.0.7
 + cycler==0.12.1
 + datasets==2.14.4
 + dill==0.3.7
 + distlib==0.4.0
 + distro==1.9.0
 + docutils==0.21.2
 + filelock==3.13.1
 + fonttools==4.58.5
 + frozenlist==1.8.0
 + fsspec==2025.5.1
 + google-api-core==2.28.1
 + google-auth==2.43.0
 + googleapis-common-protos==1.72.0
 + grpcio==1.74.0
 + hf-xet==1.1.5
 + huggingface-hub==0.33.2
 + idna==3.10
 + importlib-metadata==8.7.0
 + jinja2==3.1.2
 + joblib==1.5.1
 + jsonschema==4.24.0
 + jsonschema-specifications==2025.4.1
 + kiwisolver==1.4.8
 + markdown-it-py==3.0.0
 + markupsafe==3.0.2
 + matplotlib==3.10.3
 + mdurl==0.1.2
 + mpmath==1.3.0
 + msgpack==1.1.1
 + multidict==6.7.0
 + multiprocess==0.70.15
 + networkx==3.5
 + numpy==1.26.4
 + nvidia-cublas-cu12==12.8.4.1
 + nvidia-cuda-cupti-cu12==12.8.90
 + nvidia-cuda-nvrtc-cu12==12.8.93
 + nvidia-cuda-runtime-cu12==12.8.90
 + nvidia-cudnn-cu12==9.10.2.21
 + nvidia-cufft-cu12==11.3.3.83
 + nvidia-cufile-cu12==1.13.1.3
 + nvidia-curand-cu12==10.3.9.90
 + nvidia-cusolver-cu12==11.7.3.90
 + nvidia-cusparse-cu12==12.5.8.93
 + nvidia-cusparselt-cu12==0.7.1
 + nvidia-nccl-cu12==2.27.5
 + nvidia-nvjitlink-cu12==12.8.93
 + nvidia-nvshmem-cu12==3.3.20
 + nvidia-nvtx-cu12==12.8.90
 + opencensus==0.11.4
 + opencensus-context==0.1.3
 + opentelemetry-api==1.38.0
 + opentelemetry-exporter-otlp-proto-common==1.38.0
 + opentelemetry-exporter-otlp-proto-grpc==1.38.0
 + opentelemetry-exporter-prometheus==0.59b0
 + opentelemetry-proto==1.38.0
 + opentelemetry-sdk==1.38.0
 + opentelemetry-semantic-conventions==0.59b0
 + packaging==25.0
 + pandas==2.2.3
 + peft==0.17.1
 + pillow==10.2.0
 + platformdirs==4.5.0
 + prometheus-client==0.22.1
 + propcache==0.4.1
 + proto-plus==1.26.1
 + protobuf==5.29.3
 + psutil==7.1.3
 + py-spy==0.4.1
 + pyarrow==20.0.0
 + pyasn1==0.6.1
 + pyasn1-modules==0.4.2
 + pycparser==2.22
 + pydantic==2.7.4
 + pydantic-core==2.18.4
 + pygments==2.17.2
 + pyopenssl==23.2.0
 + pyparsing==3.2.3
 + python-dateutil==2.9.0.post0
 + pytz==2025.2
 + pyyaml==6.0.1
 + ray==2.51.1
 + referencing==0.36.2
 + regex==2024.11.6
 + requests==2.32.4
 + rich==13.7.1
 + rpds-py==0.26.0
 + rsa==4.9.1
 + safetensors==0.5.3
 + scikit-learn==1.6.1
 + scipy==1.16.0
 + setuptools==80.9.0
 + shellingham==1.5.4
 + six==1.17.0
 + smart-open==7.4.4
 + sympy==1.14.0
 + tensorboardx==2.6.4
 + threadpoolctl==3.6.0
 + timm==1.0.15
 + tokenizers==0.21.2
 + torch==2.9.0
 + torchvision==0.24.0
 + tqdm==4.67.1
 + transformers==4.53.0
 + triton==3.5.0
 + typer==0.15.3
 + typing-extensions==4.10.0
 + tzdata==2025.2
 + urllib3==2.5.0
 + virtualenv==20.35.4
 + wheel==0.42.0
 + wrapt==2.0.1
 + xxhash==3.6.0
 + yarl==1.22.0
 + zipp==3.23.0

uv sync completed successfully.

Virtual environment activation hints
  On Linux/macOS (bash/zsh) Run the following:   source .venv/bin/activate
use make validate-setup to make sure everything is installed correctly
```
</details>

If you prefer to run `uv` directly, you can still do:

```bash
uv sync
```


from the project root. This creates a virtual environment (by default `.venv/`) and installs all dependencies listed in `pyproject.toml`. On some systems `uv` may use a different environment location; see the official `uv` documentation if `.venv/` is not created.

### Virtual Environment (optional but recommended)

Using a virtual environment is **recommended** to avoid dependency conflicts. If you used `uv sync` (either directly or via `make setup`), a virtual environment is already created.

You can activate it using:

```bash
# On Linux/macOS
source .venv/bin/activate

# On Windows (cmd)
.venv\Scripts\activate.bat
```

If `uv` created an environment in a different location, consult:

[https://docs.astral.sh/uv/guides/environments/](https://docs.astral.sh/uv/guides/environments/)

for how to inspect and activate that environment.

### Quick environment check (recommended)

Before running any experiments, it is recommended to validate your setup:

```bash
make validate-setup
```

This command:

* Ensures core directories (logs, models, results, experiments) exist
* Checks for key tools (`uv`, `tmux`, `ray`)
* Reports Python version and core package availability (`torch`, `numpy`, `yaml`)
* Summarizes basic GPU / CUDA visibility (if available)

Resolve any errors or warnings here before proceeding to training.

### Run the Project

The Make-based CLI is the preferred entry point.

After installation and environment validation, you can launch a full training workflow with:

```bash
make train
```

This will:

* Guide you through interactive configuration selection (`make config` internally)
* Start training using `python main.py` (wrapped in `tmux` if available)

If you already have a `config.yaml` in the project root and just want to run it:

```bash
make run
```

For direct execution without the Makefile helpers, you can also run:

```bash
python main.py
# or, if you prefer using uv:
uv run main.py
```

---

## Verify Installation

<details markdown="1">
<summary><strong>Show detailed verification commands</strong></summary>

<br>

First, use the built-in environment check:

```bash
# Validate tools, directories, Python, and GPU visibility
make validate-setup
```

You can additionally verify core Python dependencies manually:

```bash
python --version 

# Check core dependencies
python -c "import torch; print(f'PyTorch: {torch.__version__}')"
python -c "import ray; ray.init(); print('Ray initialized successfully')"
python -c "import transformers; print(f'Transformers: {transformers.__version__}')"

# Check CUDA availability (if GPU)
python -c "import torch; print(f'CUDA Available: {torch.cuda.is_available()}')"
python -c "import torch; print(f'GPU Count: {torch.cuda.device_count()}')"
```

If you have a `config.yaml` and want to validate it end-to-end:

```bash
make validate-config
```

This runs YAML parsing, semantic validation, and a model/dataset modality check.

</details>

---

## GPU Setup (Nvidia)

<details markdown="1">
<summary><strong>Show Nvidia GPU setup commands</strong></summary>

<br>

```bash
# Make sure your GPU is detected
nvidia-smi

# Using apt (Debian/Ubuntu)
sudo apt-get update
sudo apt-get install nvidia-cuda-toolkit

# Using pacman (Arch)
sudo pacman -Syu
sudo pacman -S cuda
```

You can also install the Nvidia CUDA Toolkit using the [official Nvidia download page](https://developer.nvidia.com/cuda-downloads).

#### PyTorch with CUDA Support

```bash
# Install PyTorch with CUDA 12.1 support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Or for CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Verify CUDA
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

</details>

---

## CPU-Only Installation

<details markdown="1">
<summary><strong>Show CPU-only PyTorch install commands</strong></summary>

<br>

```bash
# Install PyTorch CPU version
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Update config to use CPU
# In your config.yaml:
device: "cpu"
gpu_index: null
```

</details>

---

## Version Compatibility

<details markdown="1">
<summary><strong>Show version compatibility notes</strong></summary>

<br>

All dependency versions are pinned to ensure:

* Reproducible experiments across different systems
* Compatibility between Ray, PyTorch, and supporting libraries
* Stable performance and known behavior

Whenever you upgrade dependencies in `pyproject.toml`, re-run:

```bash
make setup
make validate-setup
```

to refresh the environment and verify compatibility.

</details>

---

## Troubleshooting

<details markdown="1">
<summary><strong>Show troubleshooting tips</strong></summary>

<br>

### Issue: "ModuleNotFoundError: No module named 'torch'"

**Solution:**

```bash
# Reinstall PyTorch (inside your uv / virtual environment)
pip uninstall torch torchvision torchaudio -y
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Or verify which Python is being used
which python
echo $VIRTUAL_ENV
```

Make sure you have activated the same environment that `uv sync` created (for example, `.venv/`).

---

### Issue: "ImportError: cannot import name 'ConfigValidator'"

This usually indicates that:

* The project is not being run from the repository root, or
* The environment does not include the FedPilot source tree.

**Solution:**

```bash
# From the project root
pwd  # should end with /core or your FedPilot repo root

# Ensure uv environment is up to date
make setup

# Validate that Python can see the project
python -c "import src.validators.config_validator as cv; print(cv.__name__)"
```

If you are using a custom environment or IDE, ensure that the project root is added to `PYTHONPATH`:

```bash
export PYTHONPATH="/path/to/FedPilot/core:$PYTHONPATH"
```

You can also run:

```bash
make validate-config
```

to confirm that the configuration and imports are working as expected.

---

### Issue: Python version mismatch

**Solution:**

```bash
# Check Python version
python --version

# Use specific Python 3.12 interpreter
python3.12 --version
python3.12 -m venv fedpilot_env
source fedpilot_env/bin/activate

# Reinstall dependencies in the new environment
pip install uv
uv sync
```

Make sure `make setup` and `make train` are executed using the same Python environment.

</details>

---

**Installation complete?** Check out the [Getting Started Guide]({{ site.baseurl }}/getting-started) to start using FedPilot.
{: .text-center }
