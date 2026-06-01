# Configuration Reference

The `config.yaml` file acts as the ultimate source of truth for a FedPilot experiment. It defines the ML models, the federated schemas, network topologies, and privacy constraints.

Below is an overview of the most critical configuration blocks.

## Hardware & Framework
```yaml
device: "cuda"                   # "cpu" or "cuda"
gpu_index: "0:4"                 # Multi-GPU support (e.g., use GPUs 0,1,2,3)
placement_group_strategy: "SPREAD" # Ray placement strategy
runtime_engine: "torch"          # Engine backend
```

## Models & Datasets
FedPilot abstracts the data loading and model instantiation.
```yaml
model_type: "resnet18"           # Options: cnn, lenet, resnet18/50, vgg16, mobilenet, vit, bert
pretrained_models: false         # Fetch pre-trained weights
dataset_type: "cifar10"          # Options: mnist, fmnist, cifar10/100, femnist, shakespeare, bbc
```

## Data Distribution & Heterogeneity
To simulate realistic federated learning, you must partition data across clients.
```yaml
number_of_clients: 20
data_distribution_kind: "90"     # Options: iid, 20 (low non-iid), 50 (medium), 90 (high), dir (dirichlet)
dirichlet_beta: 0.1              # Controls the skew if kind="dir"
```

## Federation Topologies & Schemas
Define the network graph and execution paradigm.
```yaml
federated_learning_schema: "DecentralizedFederatedLearning"
federated_learning_topology: "k_connected" 
k_value: 3                       # If k_connected, number of neighbors per node
adjacency_matrix_file_name: null # Provide a custom .csv graph
```

## Training & Aggregation
```yaml
learning_rate: 0.001
optimizer: "sgd"
number_of_epochs: 5              # Local training epochs before aggregation
federated_learning_rounds: 100   # Total global synchronization rounds
aggregation_strategy: "FedProx"  # Options: FedAvg, FedProx
aggregation_sample_scaling: true # Scale weight updates by local sample count
```

## Model Compression
To reduce network bottlenecks, you can chunk and sparsify the model weights before transmission.
```yaml
chunking: true                   # Enable model segmentation
chunking_parts: 50               # Split model into N parts
sensitivity_percentage: 80       # Only transmit the top 80% most important updates
distance_metric: "cosine"        # Options: cosine, euclidean, coordinate
```

## Advanced Security & Checkpointing
```yaml
save_before_aggregation_models: false  # Save local client checkpoints
save_global_models: true               # Save the global consensus model
dp_enabled: true                       # Enable Differential Privacy (DP-SGD)
dp_epsilon: 1.0                        # Lower is more private
```

### Telemetry & Dashboard Integration
See [Layer 6](../security_and_privacy/differential_privacy.md) for deep-dive DP tuning guides and [Layer 7](../dashboards_and_telemetry/metrics_exporting.md) for OpenTelemetry properties.
