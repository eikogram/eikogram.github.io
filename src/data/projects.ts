/**
 * The eikogram project register.
 *
 * Every entry here describes a real repository in the claricle or eikogram
 * organization. RubyGems links are only present for gems that are actually
 * published; the Rust engines are GitHub-only while they are in build-out.
 */

export type Role = 'model' | 'transformer' | 'lens' | 'rasterization' | 'engine';

export interface RoleMeta {
  label: string;
  token: 'ink' | 'blue' | 'violet' | 'amber' | 'green';
  description: string;
}

export const ROLE_ORDER: Role[] = [
  'model',
  'transformer',
  'lens',
  'rasterization',
  'engine',
];

export const ROLE_META: Record<Role, RoleMeta> = {
  model: {
    label: 'Models',
    token: 'blue',
    description:
      'Typed domain models that make a format programmable — parse the bytes, walk the records, serialize back.',
  },
  transformer: {
    label: 'Transformers',
    token: 'violet',
    description:
      'Convert between format models — strictly model to model, never bytes to bytes.',
  },
  lens: {
    label: 'Lenses',
    token: 'amber',
    description:
      'Conformance views over a format — validate files against the standard they claim, not the decoder’s tolerance.',
  },
  rasterization: {
    label: 'Rasterization',
    token: 'green',
    description:
      'Project vector drawings onto the pixel surface — explicit fonts, pinned encoders, packaged natives.',
  },
  engine: {
    label: 'Engines · in build-out',
    token: 'ink',
    description:
      'Rust native cores carrying the per-format models, the eikogram VIM, and the transformers between them.',
  },
};

export interface Project {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  role: Role;
  github: string;
  rubygems?: string;
  status: 'released' | 'in-build';
  language: 'ruby' | 'rust';
  featured: boolean;
  order: number;
}

export const PROJECTS: Project[] = [
  {
    id: 'emf',
    name: 'emf',
    title: 'emf',
    tagline: 'Typed model for WMF, EMF, and EMF+ metafiles.',
    description:
      'Clean-room Ruby parser that reads Microsoft metafile records into an OOP domain model and serializes back to binary — with an optional Rust native backend.',
    role: 'model',
    github: 'https://github.com/claricle/emf',
    rubygems: 'https://rubygems.org/gems/emf',
    status: 'released',
    language: 'ruby',
    featured: true,
    order: 1,
  },
  {
    id: 'postscript',
    name: 'postscript',
    title: 'postscript',
    tagline: 'Typed model for PostScript and EPS source.',
    description:
      'Pure-Ruby PS/EPS parser with a typed domain model and serializer. The lower layer of postsvg — independently reusable for any tool that reads, writes, or transforms PostScript.',
    role: 'model',
    github: 'https://github.com/claricle/postscript',
    rubygems: 'https://rubygems.org/gems/postscript',
    status: 'released',
    language: 'ruby',
    featured: false,
    order: 2,
  },
  {
    id: 'emfsvg',
    name: 'emfsvg',
    title: 'emfsvg',
    tagline: 'EMF ↔ SVG, both directions, clean-room Ruby.',
    description:
      'Converts between Enhanced Metafile and SVG in both directions. Compatibility is enforced by strict byte comparisons against a pinned corpus — no GPL obligation.',
    role: 'transformer',
    github: 'https://github.com/claricle/emfsvg',
    rubygems: 'https://rubygems.org/gems/emfsvg',
    status: 'released',
    language: 'ruby',
    featured: true,
    order: 3,
  },
  {
    id: 'postsvg',
    name: 'postsvg',
    title: 'postsvg',
    tagline: 'PS/EPS ↔ SVG in pure Ruby — no Ghostscript.',
    description:
      'A PostScript and EPS transformer supporting both directions. The same typed Program model is produced whether the source was parsed from PS or built from SVG, so round-trips are trivial.',
    role: 'transformer',
    github: 'https://github.com/claricle/postsvg',
    rubygems: 'https://rubygems.org/gems/postsvg',
    status: 'released',
    language: 'ruby',
    featured: true,
    order: 4,
  },
  {
    id: 'vectory',
    name: 'vectory',
    title: 'vectory',
    tagline: 'Pairwise conversion across every vector format.',
    description:
      'EPS, PS, EMF, and SVG convert pairwise, with PNG output from each. One CLI and one Ruby API over the transformer gems — a publication pipeline moves a single diagram across every format it touches.',
    role: 'transformer',
    github: 'https://github.com/claricle/vectory',
    rubygems: 'https://rubygems.org/gems/vectory',
    status: 'released',
    language: 'ruby',
    featured: true,
    order: 5,
  },
  {
    id: 'svg_conform',
    name: 'svg_conform',
    title: 'svg_conform',
    tagline: 'SVG conformance: validate, then remediate.',
    description:
      'Profile-based SVG validation with automatic remediation of requirement violations. SVGCheck-compatible diagnostics; the operative profile lives with the consumer.',
    role: 'lens',
    github: 'https://github.com/claricle/svg_conform',
    rubygems: 'https://rubygems.org/gems/svg_conform',
    status: 'released',
    language: 'ruby',
    featured: true,
    order: 6,
  },
  {
    id: 'png_conform',
    name: 'png_conform',
    title: 'png_conform',
    tagline: 'PNG validation down to the chunk.',
    description:
      'Pure-Ruby PNG validator: 47 chunk validators across PNG/APNG/MNG/JNG, CRC checks, ordering rules, six profiles, and pngcheck-compatible output.',
    role: 'lens',
    github: 'https://github.com/claricle/png_conform',
    rubygems: 'https://rubygems.org/gems/png_conform',
    status: 'released',
    language: 'ruby',
    featured: false,
    order: 7,
  },
  {
    id: 'lens_core',
    name: 'lens_core',
    title: 'lens_core',
    tagline: 'Shared diagnostics core for the lens gems.',
    description:
      'Canonical conformance-issue rendering and profiling machinery, declared as a runtime dependency by the lenses.',
    role: 'lens',
    github: 'https://github.com/claricle/lens_core',
    rubygems: 'https://rubygems.org/gems/lens_core',
    status: 'released',
    language: 'ruby',
    featured: false,
    order: 8,
  },
  {
    id: 'svgpng',
    name: 'svgpng',
    title: 'svgpng',
    tagline: 'SVG onto the pixel surface, deterministically.',
    description:
      'Byte-oriented SVG → PNG rendering with explicit font selection and a pinned PNG encoder. No filesystem, network, or loader input — packaged native, per platform.',
    role: 'rasterization',
    github: 'https://github.com/claricle/svgpng',
    rubygems: 'https://rubygems.org/gems/svgpng',
    status: 'released',
    language: 'ruby',
    featured: true,
    order: 9,
  },
  {
    id: 'emf-rs',
    name: 'emf-rs',
    title: 'emf-rs',
    tagline: 'Rust native core for the emf model.',
    description:
      'Rust workspace parsing EMF, EMF+, and WMF — the native core behind the emf gem, matching the Ruby backend on the valid and corrupt fixture corpora.',
    role: 'engine',
    github: 'https://github.com/claricle/emf-rs',
    status: 'in-build',
    language: 'rust',
    featured: false,
    order: 10,
  },
  {
    id: 'vectory-rs',
    name: 'vectory-rs',
    title: 'vectory-rs',
    tagline: 'The SVG model, the eikogram VIM, and the transformers.',
    description:
      'Rust engine carrying the SVG model, the eikogram Vector Image Model, and the transformers between models — the native heart of the conversion program.',
    role: 'engine',
    github: 'https://github.com/claricle/vectory-rs',
    status: 'in-build',
    language: 'rust',
    featured: false,
    order: 11,
  },
];

export const byRole = (role: Role): Project[] =>
  PROJECTS.filter((p) => p.role === role).sort((a, b) => a.order - b.order);

export const presentRoles = (): { role: Role; meta: RoleMeta }[] =>
  ROLE_ORDER.filter((role) => PROJECTS.some((p) => p.role === role)).map(
    (role) => ({ role, meta: ROLE_META[role] })
  );
