# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

SearchSpace is a static Jekyll site for competition-based technical hiring: companies post
data science / ML / algorithmic competitions, competitors submit solutions, and a deterministic
benchmark ranks entries. Top finishers get guaranteed interviews and cash prizes. The whole
site is static HTML/CSS + Jekyll templating — no JS framework, no build step beyond Jekyll,
no client-side app logic.

Deployed via GitHub Pages (legacy Jekyll build, not a GitHub Actions workflow) at the custom
domain `searchspace.net` (see `CNAME`). Pushing to `main` triggers GitHub's own build — it does
NOT use this repo's `Gemfile`/`Gemfile.lock`; those are for local dev only.

## Commands

Ruby 3.3.11 is pinned via `.ruby-version` (managed with rbenv). The system Ruby is too old
(2.6) for any current Jekyll, so always load rbenv first in a fresh shell:

```bash
eval "$(rbenv init -)"
bundle install          # first time / after Gemfile changes
bundle exec jekyll build --trace
bundle exec jekyll serve             # http://127.0.0.1:4000/
```

There is no test suite, linter, or CI — verification is: does `jekyll build` succeed, and do
the rendered pages in `_site/` contain the expected resolved Liquid output (no leftover `{{ }}`,
correct hrefs, correct asset paths).

## Architecture

**Collection-driven content**: every competition lives as one Markdown file in `_competitions/`,
with all competition-specific data (prizes, deadlines, scoring rules, company info, submission
codename) in YAML front matter — not in the page body. The front matter schema is the contract;
`_layouts/competition.html` renders every section (outline, prize breakdown, company background,
roles, fine print, submission instructions) purely from `page.*` variables. When adding a new
competition, copy an existing file's front matter shape rather than improvising new keys, since
`_layouts/competition.html` and `index.html`'s card grid both read specific field names
(`title`, `company_name`, `category`, `status`, `deadline`, `total_prize_pool`,
`guaranteed_interviews`, `scoring_metric`, `codename`, `prize_tiers`, etc.).

An optional `color` front matter field (`"pink"`, `"purple"`, `"blue"`, or `"red"`) picks that
competition's grain-gradient palette — it drives both its card on the landing grid
(`.competition-card.grain-*`) and its own hero banner (`.competition-hero.grain-*`). Falls back to
`pink` for cards and `purple` for the hero if omitted.

**Two layouts, applied by `_config.yml` defaults** (not per-file `layout:` front matter):
- `type: competitions` scope → `_layouts/competition.html`
- everything else → `_layouts/default.html`

`_layouts/competition.html` itself declares `layout: default`, so it nests inside the site chrome
(header/footer) — competition pages compose both layouts.

**`index.html`** loops `site.competitions` (sorted by `deadline`) to build the card grid, and also
derives the hero stats (open count, total prize pool) with Liquid `{% for %}` accumulators — if
you add fields to competition front matter that should feed into site-wide stats, update those
loops too.

**baseurl / url are load-bearing**: `_config.yml`'s `baseurl` and `url` must match wherever the
site is actually served from. Every internal link and asset path in the layouts goes through
Jekyll's `relative_url` filter (e.g. `{{ '/assets/css/style.css' | relative_url }}`), which
prefixes `site.baseurl`. If the site is ever moved back to a GitHub Pages project subpath
(`username.github.io/repo/`) instead of a custom domain at the root, `baseurl` must be set back
to `/repo-name` — leaving it wrong is the single most common cause of "CSS isn't loading" /
"links have the wrong prefix" bugs here. Currently `baseurl: ""` and `url: "https://searchspace.net"`
because the custom domain serves from the root.

**Styling**: single stylesheet at `assets/css/style.css`, no preprocessor, no build step. The site
is a white canvas with color concentrated in a rotating set of noisy mesh-gradient "grain" cards
(competition cards, how-it-works step cards, the competition hero banner, the top prize tier, the
submission box) rather than solid backgrounds. Each palette is a `--grain-a/b/c/d` custom property
(radial-gradient recipes) plus a shared `--grain-noise` SVG-turbulence data URI applied via
`::before` (gradient) and `::after` (noise, `mix-blend-mode: overlay`) pseudo-elements — add a new
palette by defining another `--grain-*` variable and a matching `.grain-*` class rather than
inlining gradients ad hoc. The how-it-works step cards pick their palette from the ancestor
`.two-column__col--competitors`/`--companies` class, not from a `.grain-*` class.

**"Submit a Competition" and submission email are config-driven**: the "Submit a Competition"
link (`site.submit_competition_form_url`, a relative path to `submit-competition.html`, run
through `relative_url` at each call site) and the submission email domain
(`site.submissions_domain`, combined with each competition's `page.codename` to form
`codename@domain`) live in `_config.yml`, not hardcoded in templates.

**`submit-competition.html`** is a real page (not an external form): a plain HTML `<form>`
posting to a Formspree endpoint (Basic HTML integration — no JS). Its category `<select>` loops
over `site.competition_categories`, the same list documented above for a competition's `color`-
adjacent `category` front-matter field — add new categories there, not just in the form.
