---
title: "Portfolio Optimization Challenge"
company_name: "Three Sigma Investments"
category: "Data Science"
status: "open"
color: "purple"
summary: "Build a portfolio allocation model that maximizes risk-adjusted return on five years of held-out market data."
deadline: 2026-09-15
scoring_metric: "Sharpe Ratio (held-out)"
total_prize_pool: 45000
guaranteed_interviews: 5
codename: "three-sigma-042"

background: >
  Three Sigma Investments manages systematic multi-asset portfolios and is
  expanding its quantitative research team. This competition mirrors a real
  internal research problem: allocating capital across a fixed universe of
  40 liquid instruments (equities, rates, and commodities futures) to
  maximize risk-adjusted return under realistic transaction cost assumptions.

target_benchmark: >
  Competitors must produce daily portfolio weights across the provided
  40-instrument universe for an out-of-sample test window. Submissions are
  scored purely on the resulting portfolio's annualized Sharpe Ratio, net of
  a 3bps transaction cost charged on every rebalance. The benchmark to beat
  is Three Sigma's internal equal-risk-contribution baseline, which scores 1.14.

dataset_url: "https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets"

scoring_rules: |
  - Submissions are evaluated on a held-out 12-month period not included in the training data.
  - Final score is the **net-of-cost annualized Sharpe Ratio** of your daily rebalanced portfolio.
  - A 3bps transaction cost is applied to the notional value of every position change.
  - Position weights must sum to 1.0 (fully invested, long-only) at every rebalance date.
  - Leverage is not permitted; individual position weights are capped at 15%.
  - Ties are broken by lower realized maximum drawdown over the test window.

prize_tiers:
  - rank: "1st Place"
    cash: 20000
    interview: "Guaranteed final-round interview"
  - rank: "2nd Place"
    cash: 12000
    interview: "Guaranteed final-round interview"
  - rank: "3rd Place"
    cash: 7000
    interview: "Guaranteed final-round interview"
  - rank: "4th – 5th Place"
    cash: 3000
    interview: "Guaranteed first-round interview"

company_background: >
  Three Sigma Investments is a systematic asset manager founded in 2011,
  managing approximately $6.2B across multi-asset macro and equity
  market-neutral strategies. The research team is split between
  signal-generation and portfolio construction, with a strong bias toward
  reproducible, benchmark-tested research over discretionary judgment.

roles_description: |
  This competition is being used to source full-time candidates for:

  - **Quantitative Researcher** — design and validate alpha signals and
    portfolio construction methods for the multi-asset macro book.
  - **Portfolio Optimization Engineer** — build and maintain the
    production allocation and risk-budgeting systems that turn signals
    into tradable positions.

  Both roles are full-time, on-site in New York, and report directly into
  the Head of Quantitative Research.

fine_print: |
  - This is NOT a real competition. This is just a placeholder for future competitions that may be hosted on SearchSpace.
  - Open to all individual competitors 18 or older. 
  - All submitted code and models remain the intellectual property of the competitor; Meridian receives a non-exclusive license to evaluate submissions.
  - Meridian employees and contractors are not eligible to compete.
  - Cash prizes are subject to applicable tax withholding and reporting requirements.
  - Meridian reserves the right to disqualify submissions that show evidence of look-ahead bias, data leakage, or benchmark data scraping.
  - Guaranteed interviews are contingent on passing a standard identity and background verification.
---

Submit your solution as a single CSV of daily portfolio weights following the
format described in the dataset README, along with the source code used to
generate it (Python or R accepted).

Include a short (1-page max) write-up describing your modeling approach —
this is not scored but is reviewed by the hiring panel for finalists.
