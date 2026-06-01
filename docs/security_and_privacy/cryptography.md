# Security & Privacy: Cryptography & Secure Aggregation

While Differential Privacy adds statistical noise to protect individual data points, cryptographic techniques protect the model weights themselves from being read by man-in-the-middle attackers or a curious aggregation server.

---

## The Threat Model

FedPilot assumes an honest-but-curious server in the centralized schema: the server correctly executes the aggregation protocol but may attempt to extract sensitive information from the received client updates. Against a fully malicious server — one that actively deviates from the protocol — cryptographic secure aggregation is required.

---

## Cryptography Placeholders

The `config.yaml` provides integration hooks for encryption methodologies:

```yaml
encryption_method: null         # e.g., "ckks" for CKKS Homomorphic Encryption
xmkckks_weight_decimals: null   # Decimal precision for weight quantization before encryption
```

These fields are currently **placeholders** designed for researchers to inject their own cryptographic libraries (such as TenSEAL for CKKS Homomorphic Encryption or PySyft for Secure Multi-Party Computation).

---

## Implementing Secure Aggregation

To integrate a cryptographic scheme into FedPilot, hook into three phases of the Schema lifecycle:

### Phase 1 — Key Distribution (`setup()`)

Generate and distribute cryptographic keys to all participants before training begins:

```python
def setup(self):
    super().setup()
    if self.config.encryption_method == "ckks":
        import tenseal as ts
        self._context = ts.context(ts.SCHEME_TYPE.CKKS, ...)
        self._public_key = self._context.public_key()
        # Distribute public_key to all peers via GlobalObjectStore
```

### Phase 2 — Weight Encryption (before `GlobalObjectStore.put()`)

Before uploading weights, quantize and encrypt:

```python
# Inside the train/sync loop
weights = self.model.state_dict()
quantized = quantize(weights, decimals=self.config.xmkckks_weight_decimals)
encrypted = self._context.encrypt(quantized)
pickled = pickle.dumps(encrypted)
ray.get(self.global_object_store.put.remote(key, pickled))
```

### Phase 3 — Homomorphic Aggregation (`aggregate()`)

With Homomorphic Encryption, mathematical operations can be performed directly on ciphertexts without decryption:

```python
def aggregate(self, incoming_keys):
    ciphertexts = [pickle.loads(ray.get(gos.get.remote(k))) for k in incoming_keys]
    # HE addition works directly on encrypted tensors
    aggregated_ct = sum(ciphertexts)
    # Only decrypt the final result
    decrypted = aggregated_ct.decrypt()
    self.model.load_state_dict(decrypted)
```

---

## Secure Aggregation Approaches

| Approach | Library | Threat Model | FedPilot Hook |
|----------|---------|-------------|---------------|
| **CKKS HE** | TenSEAL | Honest-but-curious server | `aggregate()` on ciphertexts |
| **Paillier HE** | python-paillier | Honest-but-curious server | `aggregate()` on ciphertexts |
| **Shamir Secret Sharing** | PySyft / custom | Colluding clients (up to threshold) | Custom `sync()` + `aggregate()` |
| **Secure MPC** | MP-SPDZ / PySyft | Semi-honest majority | Full schema replacement |

---

## Interaction with Differential Privacy

Cryptographic security and Differential Privacy are **complementary**, not alternatives:

- **DP** protects against model inversion attacks using the weights (adding noise to limit information leakage about individual records).
- **Secure Aggregation** prevents the server from seeing *individual* client updates at all — only the aggregated sum is revealed.

Both can be enabled simultaneously:

```yaml
dp_enabled: true
dp_epsilon: 1.0
encryption_method: "ckks"
```

In this configuration, clients apply DP noise locally before encrypting — ensuring that even the aggregated plaintext reveals no individual.

See also: [Differential Privacy](differential_privacy.md) · [Global Object Store](../orchestration/global_object_store.md) · [Schemas SDK](../schemas_and_apps/schemas_sdk.md)
