# Model Registry & Datasets

FedPilot abstracts data loading and model instantiation processes away from the core execution logic. All models and datasets are accessed via string-based keys defined in `config.yaml`, allowing researchers to swap architectures and datasets without altering a single line of training code.

---

## Built-In Models & Performance Characteristics

FedPilot ships with a comprehensive suite of vision and language models, optimized for different experimental scales:

| Model Type | Parameters | Typical Use Case | Training Speed | Memory (Batch 64) |
|------------|------------|------------------|----------------|-------------------|
| `cnn` | ~200K | Baseline prototyping | Very Fast | ~600MB |
| `lenet` | ~60K | Embedded constraints | Very Fast | ~300MB |
| `mobilenet` | ~4M | Edge Devices | Fast | ~1GB |
| `resnet18` | ~11M | Standard benchmark | Fast | ~3GB |
| `resnet50` | ~25M | Fine-grained tasks | Medium | ~6GB |
| `vgg16` | ~138M | Heavy CV Transfer | Slow | ~10GB |
| `vit_small` | ~22M | Vision Transformer | Medium | ~4GB |
| `swin_base` | ~87M | Advanced SOTA CV | Slow | ~8GB |
| `bert` | ~110M | NLP (Base) | Slow | ~6GB |
| `albert` | ~12M | Parameter-efficient NLP| Medium | ~3GB |

---

## Built-In Datasets

Datasets are automatically downloaded, partitioned according to the requested non-IID distribution, and served to the `VirtualNode` instances.

| Dataset | Type | Classes | Distribution Focus |
|---------|------|---------|--------------------|
| `mnist` | Image (Gray) | 10 | IID Testing / Baseline |
| `fashion-mnist` | Image (Gray) | 10 | Standard Benchmark |
| `cifar10` | Image (RGB) | 10 | Standard Benchmark |
| `cifar100` | Image (RGB) | 100 | Advanced CV |
| `femnist` | Image (Gray) | 62 | Natural Non-IID (Writer-based) |
| `svhn` | Image (RGB) | 10 | Real-world digits |
| `tiny-imagenet` | Image (RGB) | 200 | Hard CV |
| `shakespeare` | Text | 80 chars | Natural Non-IID |
| `bbc` | Text | 5 | Text Classification |
| `yahoo` | Text | 10 | Large-scale NLP |

---

## Compatibility Matrix

Not all models work with all datasets due to input dimensionality differences (e.g., trying to feed 1D text tokens into a 2D CNN). Use the chart below to ensure your `config.yaml` is valid:

| Model | MNIST / F-MNIST | CIFAR-10 / 100 | ImageNet / SVHN | Shakespeare / BBC |
|-------|-----------------|----------------|-----------------|-------------------|
| **CNN / LeNet** | ✅ | ✅ | ✅ | ❌ |
| **ResNet / VGG / MobileNet** | ✅ | ✅ | ✅ | ❌ |
| **ViT / Swin** | ✅ | ✅ | ✅ | ❌ |
| **BERT / ALBERT** | ❌ | ❌ | ❌ | ✅ |

---

## Registering Custom Models

FedPilot uses a decorator-based registry pattern. To inject a custom PyTorch model into the platform **without editing the framework core**:

1. Create a standard `torch.nn.Module`.
2. Decorate it with `@register_model("your_custom_key")`.
3. In your `config.yaml`, set `model_type: "your_custom_key"`.

### Example

```python
import torch.nn as nn
from src.registries.models.model_registry import register_model

@register_model("custom_autoencoder")
class MyAutoencoder(nn.Module):
    def __init__(self, config):
        super().__init__()
        # The ConfigValidator is automatically passed to __init__
        self.encoder = nn.Linear(config.INPUT_DIMENSION, 128)
        self.decoder = nn.Linear(128, config.INPUT_DIMENSION)

    def forward(self, x):
        return self.decoder(self.encoder(x))
```

The `app_factory.py` dynamically discovers and instantiates your model when the `VirtualNodes` materialize. You can pass the entire `config` object to your model to parameterize it dynamically (e.g., scaling layer sizes based on dataset choice).

See also: [Ray & Virtual Nodes](../orchestration/ray_and_virtual_nodes.md) · [Configuration Reference](../entry_and_config/configuration_reference.md)
