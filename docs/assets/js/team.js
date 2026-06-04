(function () {
  const ORG = "fedpilot";
  const API = "https://api.github.com";
  const SECOND_MEMBER_LOGIN = "mmRoshani";
  const PINNED_LOGINS = new Set(["fkhunjush", "mmroshani"]);
  const FARSHAD_PROFILE_URL = "/assets/data/farshad-khunjush.json";

  const orgPanel = document.getElementById("org-panel");
  const teamGrid = document.getElementById("team-grid");

  if (!teamGrid) return;

  async function apiGet(path) {
    const res = await fetch(`${API}${path}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`${path} (${res.status})`);
    return res.json();
  }

  function escapeHtml(text) {
    const el = document.createElement("span");
    el.textContent = text ?? "";
    return el.innerHTML;
  }

  function blogUrl(blog) {
    if (!blog) return null;
    return blog.startsWith("http") ? blog : `https://${blog}`;
  }

  function normalizeLogin(login) {
    return (login || "").toLowerCase();
  }

  async function loadFarshadProfile() {
    const res = await fetch(FARSHAD_PROFILE_URL);
    if (!res.ok) throw new Error("Farshad profile data");
    const data = await res.json();
    return {
      name: data.name,
      title: data.title,
      affiliation: data.affiliation,
      bio: data.bio,
      html_url: data.profile_url,
      avatar_url: data.avatar_url,
      login: "fkhunjush",
      cta: "Academic profile →",
      pinned: true,
    };
  }

  async function loadMmRoshaniProfile() {
    const user = await apiGet(`/users/${SECOND_MEMBER_LOGIN}`);
    return {
      ...user,
      title: "Distributed and Trusted AI Engineer",
      pinned: true,
      cta: "View GitHub profile →",
    };
  }

  async function loadOrg() {
    if (!orgPanel) return;
    try {
      const org = await apiGet(`/orgs/${ORG}`);
      const site = blogUrl(org.blog);
      orgPanel.innerHTML = `
        <div class="org-header">
          <img class="org-avatar" src="${escapeHtml(org.avatar_url)}" alt="" width="64" height="64" />
          <div>
            <h3>${escapeHtml(org.name || ORG)}</h3>
            <p class="org-tagline">${escapeHtml(org.description || "")}</p>
          </div>
        </div>
        <ul class="org-meta">
          ${site ? `<li><a href="${escapeHtml(site)}" target="_blank" rel="noopener noreferrer">${escapeHtml(org.blog)}</a></li>` : ""}
          <li><a href="${escapeHtml(org.html_url)}" target="_blank" rel="noopener noreferrer">@${ORG} on GitHub</a></li>
        </ul>
      `;
    } catch {
      orgPanel.innerHTML =
        '<p class="team-error">Could not load organization profile. <a href="https://github.com/fedpilot" target="_blank" rel="noopener noreferrer">Open GitHub</a></p>';
    }
  }

  async function fetchPublicMembers() {
    const members = await apiGet(`/orgs/${ORG}/public_members?per_page=100`);
    return Array.isArray(members) ? members : [];
  }

  async function fetchContributorsFromRepos() {
    const repos = await apiGet(`/orgs/${ORG}/repos?per_page=100&type=public`);
    const byLogin = new Map();

    await Promise.all(
      repos.map(async (repo) => {
        try {
          const contributors = await apiGet(
            `/repos/${ORG}/${repo.name}/contributors?per_page=100`
          );
          for (const c of contributors) {
            const key = normalizeLogin(c.login);
            if (PINNED_LOGINS.has(key)) continue;
            const prev = byLogin.get(c.login);
            byLogin.set(c.login, {
              login: c.login,
              avatar_url: c.avatar_url,
              html_url: c.html_url,
              contributions: (prev?.contributions || 0) + (c.contributions || 0),
            });
          }
        } catch {
          /* skip repos without contributor API access */
        }
      })
    );

    return [...byLogin.values()].sort(
      (a, b) => (b.contributions || 0) - (a.contributions || 0)
    );
  }

  async function resolveGithubProfiles(people) {
    const logins = [...new Set(people.map((p) => p.login))];
    return Promise.all(
      logins.map(async (login) => {
        try {
          const user = await apiGet(`/users/${login}`);
          return { ...user, cta: "View GitHub profile →" };
        } catch {
          const stub = people.find((p) => p.login === login);
          return {
            login,
            name: login,
            bio: null,
            avatar_url: stub?.avatar_url,
            html_url: stub?.html_url || `https://github.com/${login}`,
            cta: "View GitHub profile →",
          };
        }
      })
    );
  }

  function renderTeamCard(user) {
    const name = user.name || user.login;
    const bio = user.bio || "GitHub profile";
    const subtitle = user.affiliation
      ? escapeHtml(user.affiliation)
      : user.login
        ? `@${escapeHtml(user.login)}`
        : "";
    const roleLine = user.title
      ? `<p class="team-role">${escapeHtml(user.title)}</p>`
      : "";

    return `
      <article class="team-card${user.pinned ? " team-card--pinned" : ""}">
        <a class="team-card-link" href="${escapeHtml(user.html_url)}" target="_blank" rel="noopener noreferrer">
          <img class="team-avatar" src="${escapeHtml(user.avatar_url)}" alt="" width="80" height="80" loading="lazy" />
          <h3 class="team-name">${escapeHtml(name)}</h3>
          ${roleLine}
          <p class="team-login">${subtitle}</p>
          <p class="team-bio">${escapeHtml(bio)}</p>
          <span class="team-cta">${escapeHtml(user.cta || "View profile →")}</span>
        </a>
      </article>
    `;
  }

  function renderTeam(profiles) {
    if (!profiles.length) {
      teamGrid.innerHTML =
        '<p class="team-error">No team profiles found. <a href="https://github.com/fedpilot" target="_blank" rel="noopener noreferrer">Visit the organization on GitHub</a></p>';
      return;
    }

    teamGrid.innerHTML = profiles.map(renderTeamCard).join("");
  }

  async function loadOtherContributors() {
    let people = await fetchPublicMembers();
    people = people.filter((p) => !PINNED_LOGINS.has(normalizeLogin(p.login)));

    if (!people.length) {
      people = await fetchContributorsFromRepos();
    }

    return resolveGithubProfiles(people);
  }

  async function loadTeam() {
    try {
      const [farshad, mmRoshani, others] = await Promise.all([
        loadFarshadProfile(),
        loadMmRoshaniProfile(),
        loadOtherContributors(),
      ]);

      const profiles = [
        farshad,
        mmRoshani,
        ...others.filter((p) => !PINNED_LOGINS.has(normalizeLogin(p.login))),
      ];

      renderTeam(profiles);
    } catch {
      teamGrid.innerHTML =
        '<p class="team-error">Unable to load team profiles. <a href="https://github.com/fedpilot" target="_blank" rel="noopener noreferrer">Open github.com/fedpilot</a></p>';
    }
  }

  loadOrg();
  loadTeam();
})();
