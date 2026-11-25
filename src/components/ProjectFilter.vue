<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

interface ProjectLite {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  github: string;
  rubygems?: string;
  status: string;
  language: string;
}

interface RoleMetaLite {
  role: string;
  label: string;
  description: string;
  token: string;
}

const props = withDefaults(defineProps<{ roles: RoleMetaLite[] }>(), {});

const active = ref('all');
const projects = ref<ProjectLite[]>([]);
const roleList = ref<RoleMetaLite[]>(props.roles);

const TOKEN_CLASS: Record<string, string> = {
  blue: 'emf',
  violet: 'svg',
  amber: 'png',
  green: 'raster',
  ink: 'brand',
};

const filtered = computed(() =>
  active.value === 'all'
    ? projects.value
    : projects.value.filter((p) => p.role === active.value)
);

const groups = computed(() =>
  roleList.value
    .map((meta) => ({
      meta,
      items: filtered.value.filter((p) => p.role === meta.role),
    }))
    .filter((group) => group.items.length > 0)
);

const totalVisible = computed(() => filtered.value.length);

function syncUrl() {
  const url = new URL(window.location.href);
  if (active.value === 'all') url.searchParams.delete('role');
  else url.searchParams.set('role', active.value);
  window.history.replaceState({}, '', url);
}

onMounted(() => {
  const host = document.querySelector('.projects-filterable');
  if (!host) return;
  const data = host.getAttribute('data-projects');
  if (data) projects.value = JSON.parse(data);
  const roles = host.getAttribute('data-roles');
  if (roles) roleList.value = JSON.parse(roles);

  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('role');
  if (fromUrl && roleList.value.some((r) => r.role === fromUrl)) {
    active.value = fromUrl;
  }
});

watch(active, syncUrl);
</script>

<template>
  <div class="filter-bar" role="tablist" aria-label="Filter projects by role">
    <button
      :class="['chip', { active: active === 'all' }]"
      @click="active = 'all'"
      role="tab"
      :aria-selected="active === 'all'"
    >All</button>
    <button
      v-for="r in roleList"
      :key="r.role"
      :class="['chip', `chip-${TOKEN_CLASS[r.token]}`, { active: active === r.role }]"
      @click="active = r.role"
      role="tab"
      :aria-selected="active === r.role"
    >{{ r.label }}</button>
    <span class="result-count" aria-live="polite">
      {{ totalVisible }} project{{ totalVisible === 1 ? '' : 's' }}
    </span>
  </div>

  <section
    v-for="group in groups"
    :key="group.meta.role"
    :id="`role-filter-${group.meta.role}`"
    class="role-section"
  >
    <header class="role-head">
      <h2>
        <span :class="['role-dot', `dot-${TOKEN_CLASS[group.meta.token]}`]" aria-hidden="true"></span>
        {{ group.meta.label }}
      </h2>
      <p>{{ group.meta.description }}</p>
    </header>
    <div class="filtered-grid">
      <article
        v-for="p in group.items"
        :key="p.id"
        :class="['card', `tk-${TOKEN_CLASS[group.meta.token]}`]"
      >
        <div :class="['card-stripe', `st-${TOKEN_CLASS[group.meta.token]}`]"></div>
        <div class="card-body">
          <header class="card-header">
            <h3 class="card-title">{{ p.title }}</h3>
            <span :class="['status', { 'status-in-build': p.status === 'in-build' }]">
              {{ p.status === 'released' ? 'released' : 'in build' }}
            </span>
          </header>
          <p class="card-tagline">{{ p.tagline }}</p>
          <p class="card-desc">{{ p.description }}</p>
          <div class="card-meta">
            <span class="lang">{{ p.language }}</span>
          </div>
          <div class="card-links">
            <a :href="p.github" target="_blank" rel="noopener" class="link-primary">GitHub</a>
            <a v-if="p.rubygems" :href="p.rubygems" target="_blank" rel="noopener" class="link-secondary">RubyGems</a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
}
.chip {
  border: 1px solid var(--color-line);
  background: var(--color-canvas);
  color: var(--color-ink-muted);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.chip:hover { color: var(--color-ink); }
.chip.active { background: var(--color-ink); color: var(--color-canvas); border-color: var(--color-ink); }
.chip-emf.active    { background: var(--color-fmt-emf); border-color: var(--color-fmt-emf); color: #fff; }
.chip-svg.active    { background: var(--color-fmt-svg); border-color: var(--color-fmt-svg); color: #fff; }
.chip-png.active    { background: var(--color-fmt-png); border-color: var(--color-fmt-png); color: #2a2a2a; }
.chip-raster.active { background: var(--color-fmt-raster); border-color: var(--color-fmt-raster); color: #fff; }
.chip-brand.active  { background: var(--color-ink-brand); border-color: var(--color-ink-brand); color: #fff; }
.result-count {
  margin-left: auto;
  font-size: 0.82rem;
  color: var(--color-ink-muted);
}

.role-section { margin: 2rem 0 2.5rem; }
.role-head { margin: 0 0 1rem; }
.role-head h2 {
  margin: 0 0 0.3rem;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}
.role-dot {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  transform: rotate(45deg);
  display: inline-block;
}
.dot-emf    { background: var(--color-fmt-emf); }
.dot-svg    { background: var(--color-fmt-svg); }
.dot-png    { background: var(--color-fmt-png); }
.dot-raster { background: var(--color-fmt-raster); }
.dot-brand  { background: var(--color-ink-brand); }
.role-head p {
  margin: 0;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 640px;
}

.filtered-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  margin: 1.25rem 0 0;
}
.card {
  position: relative;
  background: var(--color-canvas);
  border: 1px solid var(--color-line);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.card:hover { transform: translateY(-3px); box-shadow: var(--shadow-card-hover); }
.card-stripe { height: 4px; }
.st-emf    { background: var(--color-fmt-emf); }
.st-svg    { background: var(--color-fmt-svg); }
.st-png    { background: var(--color-fmt-png); }
.st-raster { background: var(--color-fmt-raster); }
.st-brand  { background: var(--color-ink-brand); }

.card-body { padding: 1.25rem 1.4rem 1.4rem; display: flex; flex-direction: column; gap: 0.6rem; flex: 1; }
.card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; }
.card-title { margin: 0; font-size: 1.15rem; font-weight: 600; font-family: var(--font-mono); }
.card-tagline { margin: 0; color: var(--color-ink); font-size: 0.95rem; font-weight: 500; line-height: 1.4; }
.card-desc { margin: 0; color: var(--color-ink-muted); font-size: 0.88rem; line-height: 1.55; flex: 1; }
.card-meta { display: flex; gap: 0.5rem; }
.lang {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--color-canvas-soft);
  color: var(--color-ink-muted);
  border: 1px solid var(--color-line);
}
.status {
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid var(--color-fmt-raster);
  color: var(--color-fmt-raster);
}
.status-in-build { border-color: var(--color-fmt-png); color: var(--color-fmt-png); }
.card-links { display: flex; gap: 0.5rem; margin-top: 0.25rem; }
.link-primary, .link-secondary {
  font-size: 0.85rem;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
}
.link-primary { background: var(--color-ink); color: var(--color-canvas); }
.link-secondary { background: var(--color-canvas-soft); color: var(--color-ink); border: 1px solid var(--color-line); }
.link-secondary:hover { border-color: var(--color-ink-muted); }
</style>
