---
title: "Layout Optimization Challenge"
company_name: "Mvidia"
category: "Algorithmic"
status: "open"
color: "green"
summary: "Design a placement-and-routing heuristic that minimizes wirelength and congestion on a real macro-cell benchmark netlist."
deadline: 2026-08-28
scoring_metric: "Weighted Wirelength + Congestion Penalty"
total_prize_pool: 60000
guaranteed_interviews: 4
codename: "latticeworks-pnr-117"

background: >
  Mvidia designs custom silicon for high-performance
  networking applications. Physical design teams spend enormous engineering
  effort tuning placement and routing to hit power, performance, and area
  targets. This competition asks entrants to build an automated placement
  heuristic for a simplified but realistic macro-cell layout problem drawn
  from one of Mvidia's internal netlists.

target_benchmark: >
  Given a fixed die area, a netlist of ~1,800 macro and standard cells, and
  a connectivity graph, competitors must produce (x, y) placement
  coordinates for every cell. Submissions are scored on a weighted
  combination of total half-perimeter wirelength (HPWL) and a routing
  congestion penalty estimated from cell density per routing region. The
  benchmark to beat is Mvidia's production simulated-annealing
  placer, which scores 8.42 (lower is better) on the held-out layout.

dataset_url: "https://github.com/symbench/spice-datasets"

scoring_rules: |
  - The scoring function is `score = HPWL_normalized + 0.4 * congestion_penalty`, where lower scores are better.
  - All cells must be placed fully within the provided die boundary with zero overlap between macro cells.
  - Fixed-position cells (I/O pads and pre-placed macros) specified in the input file must not be moved.
  - Submissions are validated against a legality checker before scoring; illegal placements (overlaps, out-of-bounds cells) receive no score.
  - Runtime is capped at 30 minutes on a single 16-core reference machine; solutions exceeding this are disqualified.
  - Each competitor may submit only one submission.

prize_tiers:
  - rank: "1st Place"
    cash: 28000
    interview: "Guaranteed final-round interview"
  - rank: "2nd Place"
    cash: 15000
    interview: "Guaranteed final-round interview"
  - rank: "3rd Place"
    cash: 9000
    interview: "Guaranteed final-round interview"
  - rank: "4th Place"
    cash: 4000
    interview: "Guaranteed first-round interview"

company_background: >
  Mvidia is a fabless chip design company building
  ASICs for data center networking and switching. Founded by veteran
  physical design engineers from the semiconductor industry, Mvidia
  is investing heavily in machine learning-assisted EDA tooling to shorten
  design cycles and reduce dependence on legacy commercial placers.

roles_description: |
  This competition sources full-time and intern candidates for:

  - **Physical Design Engineer** — own placement, routing, and timing
    closure for next-generation networking ASICs.
  - **EDA Algorithms Engineer** — build internal tooling that applies
    optimization and machine learning techniques to placement, routing,
    and floorplanning problems.

  Both roles are full-time and based in Cave City, Arkansas, with relocation
  assistance available.

fine_print: |
  - This is NOT a real competition. This is just a placeholder for future competitions that may be hosted on SearchSpace.
  - Open to individual competitors only.
  - Source code for the placement algorithm must be submitted alongside results and may be reviewed for correctness and originality.
  - The provided netlist is a modified, non-production dataset and does not represent an active Mvidia product design.
  - Mvidia employees, contractors, and their immediate family members are not eligible to compete.
  - Mvidia reserves the right to disqualify submissions using pre-computed or hard-coded solutions specific to the benchmark instance rather than a general algorithm.
  - Guaranteed interviews require passing standard identity verification and a right-to-work confirmation for the U.S.
---

Submit a placement coordinate file in the format specified in the dataset
README, along with your full solution source code and a brief description
of your placement algorithm (simulated annealing, force-directed, ML-based,
or otherwise).

Entries that do not include runnable source code will not be eligible for
prizes or interviews, even if the results file scores well.
