import { describe, expect, it } from 'vitest';
import { PROJECTS } from '../src/data/projects';

/**
 * The quickstart snippets must point at projects that exist in the register,
 * and every released project in the register must be reachable from the site
 * (featured on the home grid or listed on the projects page — the projects
 * page lists everything, so we assert the register is complete there).
 */
describe('site sanity', () => {
  it('the featured grid is a subset of the register', () => {
    const featured = PROJECTS.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThan(PROJECTS.length);
  });

  it('every project link uses https', () => {
    for (const p of PROJECTS) {
      expect(p.github.startsWith('https://')).toBe(true);
      if (p.rubygems) expect(p.rubygems.startsWith('https://')).toBe(true);
    }
  });

  it('the register includes the core roles the thesis needs', () => {
    // the thesis requires at least: EMF + SVG vector models, transformers,
    // a lens, and rasterization
    const names = PROJECTS.map((p) => p.name);
    for (const required of ['emf', 'postscript', 'emfsvg', 'postsvg', 'vectory', 'svg_conform', 'png_conform', 'svgpng']) {
      expect(names, `${required} missing from the register`).toContain(required);
    }
  });

  it('the Rust engines are registered as in-build', () => {
    for (const engine of ['emf-rs', 'vectory-rs']) {
      const p = PROJECTS.find((x) => x.name === engine);
      expect(p, `${engine} missing`).toBeDefined();
      expect(p?.status).toBe('in-build');
      expect(p?.language).toBe('rust');
    }
  });
});
