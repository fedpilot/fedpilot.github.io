---
layout: default
title: Models & Datasets Reference
parent: Guides
nav_order: 1
---


# Models & Datasets Reference

Complete reference for all supported machine learning models and datasets in FedPilot.

## Supported Models

### Computer Vision Models

#### CNN (Convolutional Neural Network)
```yaml
model_type: "cnn"
dataset_type: "mnist"  # or fashion-mnist, cifar-10, femnist

# Architecture:
# Conv2d(1, 32) -> ReLU -> Conv2d(32, 64) -> ReLU -> FC(128) -> FC(10)
```

**Use When:**
- Quick prototyping
- Baseline comparisons
- Resource-constrained environments
- Testing new algorithms

**Performance:**
- Parameters: ~200K
- Training Time: ~5-10 min (per round)
- Memory: ~500MB

---

#### LeNet
```yaml
model_type: "lenet"
dataset_type: "mnist"  # or femnist

# Architecture:
# Classic LeNet-5 network
# Conv -> Pool -> Conv -> Pool -> FC -> FC
```

**Use When:**
- MNIST-like tasks
- Embedded systems
- Quick iterations
- Baseline comparisons

**Performance:**
- Parameters: ~60K
- Training Time: ~3-5 min
- Memory: ~200MB

---

#### ResNet-18
```yaml
model_type: "resnet18"
dataset_type: "cifar10"  # or cifar100, svhn, stl10, tiny-imagenet

# Architecture:
# Residual blocks with skip connections
# Efficient 18-layer network
```

**Use When:**
- Medium-scale image tasks
- Production baselines
- CIFAR experiments
- Standard benchmarks

**Performance:**
- Parameters: ~11M
- Training Time: ~20-30 min
- Memory: ~2-3GB

---

#### ResNet-50
```yaml
model_type: "resnet50"
dataset_type: "cifar100"  # or other image datasets

# Architecture:
# Deeper residual network
# 50 layers for improved feature extraction
```

**Use When:**
- Large-scale image tasks
- Fine-grained classification
- Transfer learning
- Advanced research

**Performance:**
- Parameters: ~25M
- Training Time: ~40-60 min
- Memory: ~5-8GB

---

#### VGG-16
```yaml
model_type: "vgg16"
dataset_type: "tiny-imagenet"  # or other large datasets

# Architecture:
# Sequential convolutional blocks
# 16 weight layers
```

**Use When:**
- Large models
- ImageNet-scale tasks
- Transfer learning
- Feature extraction research

**Performance:**
- Parameters: ~138M
- Training Time: ~2-4 hours
- Memory: ~8-12GB

---

#### MobileNet V2
```yaml
model_type: "mobilenet"
dataset_type: "cifar10"  # or other image datasets

# Architecture:
# Lightweight inverted residuals
# Optimized for mobile/edge devices
```

**Use When:**
- Edge devices
- Resource-constrained
- Real-time applications
- Communication-efficient FL

**Performance:**
- Parameters: ~4M
- Training Time: ~10-15 min
- Memory: ~800MB

---

#### Vision Transformer (ViT)
```yaml
model_type: "vit_small"
dataset_type: "cifar10"

# Architecture:
# Transformer-based vision model
# Self-attention on image patches
```

**Use When:**
- Vision transformer research
- Attention mechanism studies
- Transfer learning
- Pre-trained models

**Performance:**
- Parameters: ~22M
- Training Time: ~30-50 min
- Memory: ~3-5GB

---

#### Swin Transformer
```yaml
model_type: "swin_base"
dataset_type: "imagenet-scale"

# Architecture:
# Hierarchical transformer
# Shifted window attention
```

**Use When:**
- State-of-the-art vision tasks
- Hierarchical feature extraction
- Large-scale datasets
- Advanced research

**Performance:**
- Parameters: ~87M
- Training Time: ~1-2 hours
- Memory: ~6-10GB

---

### Natural Language Processing Models

#### BERT (Bidirectional Encoder Representations from Transformers)
```yaml
model_type: "bert"
dataset_type: "shakespeare"  # or bbc, yahoo
transformer_model_size: "base"  # or "large"
```

**Configurations:**
- **Base**: 12 layers, 768 hidden units, ~110M parameters
- **Large**: 24 layers, 1024 hidden units, ~340M parameters

**Use When:**
- NLP tasks
- Text classification
- Language understanding
- Pre-trained fine-tuning

**Performance:**
- Base: ~20-30 min per round
- Large: ~1-2 hours per round
- Memory: 4-6GB (Base), 8-12GB (Large)

---

#### ALBERT (A Lite BERT)
```yaml
model_type: "albert"
dataset_type: "shakespeare"
transformer_model_size: "base"
```

**Advantages:**
- Lighter than BERT
- Parameter-efficient
- Faster training
- Less memory

**Use When:**
- Resource-constrained NLP
- Real-time applications
- Mobile/edge deployment
- Parameter efficiency research

---

#### Transformer-based Models

```yaml
model_type: "vit_hyper"              # Vision Transformer
model_type: "shakes_hyper"           # Optimized for Shakespeare
```

---

## Supported Datasets

### Image Datasets

#### MNIST
```yaml
dataset_type: "mnist"
# Classes: 10 (digits 0-9)
# Samples: 70K (60K train, 10K test)
# Size: 28×28 grayscale
```

**Characteristics:**
- Simplest digit classification
- Perfect for quick testing
- Very fast training
- Limited challenge

**Use When:** Testing, prototyping, baseline comparisons

---

#### Fashion-MNIST
```yaml
dataset_type: "fashion-mnist"
# Classes: 10 (clothing types)
# Samples: 70K (60K train, 10K test)
# Size: 28×28 grayscale
```

**Characteristics:**
- Similar to MNIST but harder
- Clothing item classification
- Good for algorithm testing
- Intermediate difficulty

**Use When:** Standard benchmarks, algorithm validation

---

#### CIFAR-10
```yaml
dataset_type: "cifar10"
# Classes: 10 (car, bird, cat, dog, etc.)
# Samples: 60K (50K train, 10K test)
# Size: 32×32 RGB
```

**Characteristics:**
- Color natural images
- More realistic than MNIST
- Moderate training time
- Standard benchmark

**Use When:** Most federated learning experiments

---

#### CIFAR-100
```yaml
dataset_type: "cifar100"
# Classes: 100 (fine-grained objects)
# Samples: 60K (50K train, 10K test)
# Size: 32×32 RGB
```

**Characteristics:**
- Fine-grained classification
- Challenging task
- Long training time
- Difficult for FL

**Use When:** Advanced research, challenging scenarios

---

#### FEMNIST (Federated MNIST)
```yaml
dataset_type: "femnist"
# Classes: 62 (digits + lowercase + uppercase)
# Samples: 814K
# Size: 28×28 grayscale
# Natural non-IID distribution
```

**Characteristics:**
- Handwritten character recognition
- Real federated setting (multiple writers)
- Natural data heterogeneity
- Practical FL scenarios

**Use When:** Realistic federated learning experiments

---

#### SVHN (Street View House Numbers)
```yaml
dataset_type: "svhn"
# Classes: 10 (digits)
# Samples: 630K
# Size: 32×32 RGB
```

**Characteristics:**
- Real-world digit recognition
- Multi-digit images
- More challenging than MNIST
- Real-world scenarios

**Use When:** Real-world digit recognition, challenging tasks

---

#### STL-10
```yaml
dataset_type: "stl10"
# Classes: 10 (same as CIFAR)
# Samples: 13K labeled
# Size: 96×96 RGB
```

**Characteristics:**
- Higher resolution than CIFAR
- Limited labeled data
- Unsupervised learning possible
- Semi-supervised scenarios

**Use When:** Limited labels, semi-supervised learning

---

#### Tiny ImageNet
```yaml
dataset_type: "tiny-imagenet"
# Classes: 200
# Samples: 100K (per split)
# Size: 64×64 RGB
```

**Characteristics:**
- Subset of ImageNet
- 200 fine-grained classes
- Challenging task
- Medium resolution

**Use When:** Challenging classification, ImageNet-style tasks

---

### Text Datasets

#### Shakespeare
```yaml
dataset_type: "shakespeare"
# Task: Character-level language modeling
# Data: Shakespeare's complete works
# Samples: ~4M characters
```

**Characteristics:**
- Character prediction
- Sequence modeling
- Non-IID natural distribution
- Federated across writers

**Use When:** NLP federated learning, text modeling

---

#### BBC News
```yaml
dataset_type: "bbc"
# Classes: 5 (Business, Entertainment, Politics, Sport, Tech)
# Samples: 2.2K documents
# Task: Text classification
```

**Characteristics:**
- News article classification
- 5-category classification
- Real-world text
- Medium-scale

**Use When:** Text classification, NLP tasks

---

#### Yahoo Answers
```yaml
dataset_type: "yahoo"
# Classes: 10 (question categories)
# Samples: 1.4M
# Task: Question classification
```

**Characteristics:**
- Question classification
- Large-scale text
- 10-category classification
- Real user-generated content

**Use When:** Large-scale NLP, question classification

---

## Model-Dataset Compatibility Matrix

| Model | MNIST | CIFAR-10 | CIFAR-100 | ImageNet | Shakespeare |
|-------|-------|----------|-----------|----------|------------|
| CNN | ✅ | ✅ | ✅ | ✅ | ❌ |
| LeNet | ✅ | ✅ | ✅ | ✅ | ❌ |
| ResNet-18 | ✅ | ✅ | ✅ | ✅ | ❌ |
| ResNet-50 | ✅ | ✅ | ✅ | ✅ | ❌ |
| VGG-16 | ✅ | ✅ | ✅ | ✅ | ❌ |
| MobileNet | ✅ | ✅ | ✅ | ✅ | ❌ |
| BERT | ❌ | ❌ | ❌ | ❌ | ✅ |
| ALBERT | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## Performance Comparison

### Training Time (per round, single GPU)

| Model | Small Data | Medium Data | Large Data |
|-------|-----------|-----------|-----------|
| CNN | 2 min | 5 min | 10 min |
| LeNet | 1 min | 3 min | 6 min |
| ResNet-18 | 10 min | 20 min | 40 min |
| ResNet-50 | 20 min | 40 min | 80 min |
| MobileNet | 8 min | 15 min | 30 min |
| BERT (Base) | 20 min | 40 min | 80 min |

### Memory Usage (during training)

| Model | Batch Size 32 | Batch Size 64 | Batch Size 128 |
|-------|--------------|--------------|---------------|
| CNN | 400MB | 600MB | 1GB |
| LeNet | 200MB | 300MB | 500MB |
| ResNet-18 | 2GB | 3GB | 4GB |
| ResNet-50 | 4GB | 6GB | 8GB |
| BERT (Base) | 4GB | 6GB | 8GB |

---

## Configuration Examples

### Quick Testing
```yaml
model_type: "cnn"
dataset_type: "mnist"
number_of_clients: 5
federated_learning_rounds: 10
```

### Standard Experiment
```yaml
model_type: "resnet18"
dataset_type: "cifar10"
number_of_clients: 20
federated_learning_rounds: 100
```

### Large-Scale
```yaml
model_type: "resnet50"
dataset_type: "cifar100"
number_of_clients: 100
federated_learning_rounds: 500
```

### NLP Task
```yaml
model_type: "bert"
dataset_type: "shakespeare"
transformer_model_size: "base"
number_of_clients: 10
federated_learning_rounds: 50
```

---

## Resources

- **[Configuration Guide]({{ site.baseurl }}/configuration-guide)**: Full parameter reference
- **[Getting Started]({{ site.baseurl }}/getting-started)**: Quick start
- **[Basic Examples]({{ site.baseurl }}/examples/basic-training)**: Practical examples

---

**Ready to start training?** Check [Getting Started]({{ site.baseurl }}/getting-started) or [Basic Examples]({{ site.baseurl }}/examples/basic-training)
{: .text-center }