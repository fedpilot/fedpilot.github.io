---
layout: landing
title: FedPilot
description: Topology-aware federated learning and distributed AI on Ray — decouple federation design from physical execution.
nav_exclude: true
---

<section class="landing-section landing-section--hero" id="top">
  <img
    class="hero-banner"
    src="{{ '/assets/images/fedpilot_banner_160-90-px.png' | relative_url }}"
    alt="FedPilot"
    width="320"
    height="180"
  />
  <p class="hero-eyebrow">Distributed & Trustworthy AI</p>
  <h1 class="hero-title">
     <span>Trustworthy AI</span> at Scale
  </h1>
  <p class="hero-lead">
    FedPilot is a Ray-backed platform for topology-aware federated learning and Trustworthy AI research.
    Define schemas, virtual nodes, and adaptation policies before the runtime materializes actors and placement groups.
  </p>
  <div class="hero-actions">
    <a class="btn btn-primary" href="{{ '/docs/' | relative_url }}" target="_blank" rel="noopener noreferrer">Read the documentation</a>
    <a class="btn btn-secondary" href="{{ '/contact/' | relative_url }}">Contact the team</a>
  </div>
</section>

<section class="landing-section" id="distributed-ai">
  <p class="section-label">Distributed AI</p>
  <h2 class="section-title">Train globally, keep data local</h2>
  <p class="section-intro">
    Federated learning coordinates model updates across clients without centralizing raw data — the foundation of privacy-preserving distributed AI.
  </p>
  <div class="distributed-ai-grid">
    <div class="ai-pillar">
      <strong>Cross-silo & cross-device</strong>
      <span>Institutions to edge fleets</span>
    </div>
    <div class="ai-pillar">
      <strong>Non-IID & heterogeneity</strong>
      <span>FedProx, sampling, robust agg</span>
    </div>
    <div class="ai-pillar">
      <strong>Vision & NLP models</strong>
      <span>CNN, ResNet, BERT, custom PyTorch</span>
    </div>
    <div class="ai-pillar">
      <strong>Privacy budgets</strong>
      <span>DP-SGD, secure aggregation</span>
    </div>
  </div>
</section>

<section class="landing-section" id="contributions">
  <p class="section-label">Platform design</p>
  <h2 class="section-title">Four core contributions</h2>
  <p class="section-intro">
    FedPilot treats distributed systems concerns as first-class — not hidden behind FL-only abstractions.
  </p>
  <div class="contributions-grid">
    <article class="contribution-card">
      <h3>Layered architecture</h3>
      <p>Schema, core, communication, infrastructure, and observability layers stay cleanly separated.</p>
    </article>
    <article class="contribution-card">
      <h3>Systems abstractions</h3>
      <p>Lazy virtual-node materialization, topology-aware routing, and ICRF as a core primitive.</p>
    </article>
    <article class="contribution-card">
      <h3>Topology adaptation</h3>
      <p>Data-driven clustering from label distributions drives placement and horizontal scaling.</p>
    </article>
    <article class="contribution-card">
      <h3>Grounded observability</h3>
      <p>OpenTelemetry, Prometheus, Grafana, and Streamlit capture pressure and network I/O as experiment artifacts.</p>
    </article>
  </div>
</section>

<section class="landing-section" id="icrf">
  <p class="section-label">Distributed systems</p>
  <h2 class="section-title">Inter-Cluster Ray Fabric (ICRF)</h2>
  <div class="icrf-panel">
    <p>
      The ICRF is the spine of multi-cluster federation: one logical graph, hybrid transport chosen automatically per hop.
    </p>
    <div class="icrf-routes">
      <span class="route-chip">Ray shared memory · intra-cluster</span>
      <span class="route-chip">HTTP / Ray Serve · inter-cluster</span>
    </div>
    <p>
      Clustering wires the fabric; <code>HybridAdjacencyMatrix</code> encodes routes; <code>HybridTopologyManager</code> enforces them at runtime.
    </p>
    <a class="btn btn-secondary" href="{{ '/federated_core/icrf/' | relative_url }}">ICRF deep-dive →</a>
  </div>
</section>

<section class="landing-section" id="layers">
  <p class="section-label">Documentation map</p>
  <h2 class="section-title">Explore by operational layer</h2>
  <p class="section-intro">
    The docs mirror how FedPilot runs in production — from boot configuration through telemetry.
  </p>
  <div class="layers-grid">
    <a class="layer-card" href="{{ '/entry_and_config/' | relative_url }}">
      <span class="layer-num">01</span>
      <h3>Entry &amp; Configuration</h3>
      <p>Getting started, CLI usage, and the configuration reference.</p>
      <span class="layer-link">Open layer →</span>
    </a>
    <a class="layer-card" href="{{ '/orchestration/' | relative_url }}">
      <span class="layer-num">02</span>
      <h3>Orchestration &amp; Infrastructure</h3>
      <p>Ray virtual nodes, topology manager, and global object store.</p>
      <span class="layer-link">Open layer →</span>
    </a>
    <a class="layer-card" href="{{ '/schemas_and_apps/' | relative_url }}">
      <span class="layer-num">03</span>
      <h3>Schemas &amp; Applications</h3>
      <p>Schemas SDK and AppFactory for mapping paradigms to engines.</p>
      <span class="layer-link">Open layer →</span>
    </a>
    <a class="layer-card" href="{{ '/federated_core/' | relative_url }}">
      <span class="layer-num">04</span>
      <h3>Federated Core &amp; Communication</h3>
      <p>ICRF, FederatedBase, aggregators, compression, Shapley analysis.</p>
      <span class="layer-link">Open layer →</span>
    </a>
    <a class="layer-card" href="{{ '/registries/' | relative_url }}">
      <span class="layer-num">05</span>
      <h3>Tool Registries</h3>
      <p>Plugin registries for models, topology, metrics, and adaptation.</p>
      <span class="layer-link">Open layer →</span>
    </a>
    <a class="layer-card" href="{{ '/security_and_privacy/' | relative_url }}">
      <span class="layer-num">06</span>
      <h3>Security &amp; Privacy</h3>
      <p>Differential privacy and cryptography / secure aggregation.</p>
      <span class="layer-link">Open layer →</span>
    </a>
    <a class="layer-card" href="{{ '/dashboards_and_telemetry/' | relative_url }}">
      <span class="layer-num">07</span>
      <h3>Dashboards &amp; Telemetry</h3>
      <p>Metrics export, Ray and Streamlit dashboards, deployment guide.</p>
      <span class="layer-link">Open layer →</span>
    </a>
  </div>
</section>

<section class="cta-band">
  <h2>Ready to run an experiment?</h2>
  <p>Install FedPilot, configure a topology, and ship reproducible FL runs on a laptop or Ray cluster.</p>
  <div class="hero-actions">
    <a class="btn btn-primary" href="{{ '/entry_and_config/getting_started/' | relative_url }}">Getting started</a>
    <a class="btn btn-secondary" href="{{ '/docs/' | relative_url }}" target="_blank" rel="noopener noreferrer">Full documentation hub</a>
  </div>
</section>
