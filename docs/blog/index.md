---
layout: landing
title: Blog
description: News and notes on distributed systems, federated learning, and trustworthy AI from the FedPilot team.
permalink: /blog/
nav_exclude: true
---

<section class="landing-section landing-section--hero landing-section--compact" id="blog">
  <p class="hero-eyebrow">Blog</p>
  <h1 class="hero-title">FedPilot <span>insights</span></h1>
  <p class="hero-lead">
    Updates on topology-aware federation, Ray orchestration, and trustworthy distributed AI.
  </p>
</section>

<section class="landing-section" id="posts">
  <ul class="blog-list">
    {% for post in site.posts %}
    <li class="blog-list-item">
      <a class="blog-list-link" href="{{ post.url | relative_url }}">
        <time class="blog-list-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
        <span class="blog-list-title">{{ post.title }}</span>
        {% if post.excerpt %}
        <span class="blog-list-excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</span>
        {% endif %}
      </a>
    </li>
    {% endfor %}
  </ul>
</section>
