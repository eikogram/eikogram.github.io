import { describe, expect, it } from 'vitest';
import { PROJECTS, ROLE_META, ROLE_ORDER, presentRoles, byRole } from '../src/data/projects';

describe('project register', () => {
  it('has unique ids and names', () => {
    const ids = PROJECTS.map((p) => p.id);
    const names = PROJECTS.map((p) => p.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every github link points at the eikogram or claricle org', () => {
    for (const p of PROJECTS) {
      expect(p.github).toMatch(/^https:\/\/github\.com\/(eikogram|claricle)\//);
    }
  });

  it('every rubygems link points at rubygems.org and matches the gem name', () => {
    for (const p of PROJECTS) {
      if (!p.rubygems) continue;
      expect(p.rubygems).toBe(`https://rubygems.org/gems/${p.name}`);
    }
  });

  it('gems marked released are published on rubygems, engines are not', () => {
    for (const p of PROJECTS) {
      if (p.status === 'released') {
        expect(p.rubygems, `${p.name} is released but has no rubygems link`).toBeDefined();
        expect(p.language).toBe('ruby');
      }
      if (p.status === 'in-build') {
        expect(p.rubygems, `${p.name} is in build and must not claim a rubygems link`).toBeUndefined();
      }
    }
  });

  it('roles are defined, ordered, and MECE', () => {
    for (const p of PROJECTS) {
      expect(ROLE_ORDER).toContain(p.role);
      expect(ROLE_META[p.role]).toBeDefined();
    }
    // collectively exhaustive: every role in ROLE_ORDER has at least one project
    for (const role of ROLE_ORDER) {
      expect(byRole(role).length, `role ${role} has no projects`).toBeGreaterThan(0);
    }
  });

  it('presentRoles covers exactly the roles that have projects', () => {
    const present = presentRoles().map((r) => r.role);
    expect(present).toEqual(ROLE_ORDER);
  });
});
