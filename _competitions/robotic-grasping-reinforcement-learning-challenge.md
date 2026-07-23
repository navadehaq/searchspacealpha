---
title: "Robotic Reinforcement Learning Environment"
company_name: "Houston Dynamics"
category: "Machine Learning / Robotics"
status: "open"
color: "blue"
summary: "Train a reinforcement learning policy that learns robust multi-object grasping in a simulated warehouse-picking environment."
deadline: 2026-10-05
scoring_metric: "Grasp Success Rate (held-out object set)"
total_prize_pool: 50000
guaranteed_interviews: 6
codename: "houston-rl-233"

background: >
  Houstin Dynamics builds robotic picking systems for warehouse fulfillment
  centers. A core bottleneck is generalizing grasp policies to novel,
  previously unseen objects without extensive per-SKU tuning. This
  competition provides a simulated pick-and-place environment (built on an
  open-source physics simulator) where competitors train and submit a
  policy for grasping a diverse set of household and warehouse objects.

target_benchmark: >
  Competitors train a reinforcement learning agent to control a simulated
  6-DOF arm with a parallel-jaw gripper, picking objects from a cluttered
  bin and placing them in a target zone. Policies are evaluated on a
  held-out set of 50 object meshes not included in the provided training
  set. The benchmark to beat is HD's internal PPO baseline policy,
  which achieves a 71.4% grasp success rate on the held-out set.

dataset_url: "https://rail-berkeley.github.io/bridgedata/"

scoring_rules: |
  - Policies are evaluated over 500 held-out episodes using 50 object meshes not seen during training.
  - Score is the **grasp success rate**: the fraction of episodes where the target object is successfully placed in the goal zone within 200 simulation steps.
  - Submitted policies must run inference within 100ms per step on the provided reference GPU to be considered valid.
  - Competitors must submit trained model weights and the exact inference code used to produce actions; training code is optional but encouraged for tie-breaking review.
  - Any policy found to exploit simulator physics bugs rather than performing genuine grasps (as judged by a human review pass) will be disqualified.

prize_tiers:
  - rank: "1st Place"
    cash: 22000
    interview: "Guaranteed final-round interview"
  - rank: "2nd Place"
    cash: 13000
    interview: "Guaranteed final-round interview"
  - rank: "3rd – 4th Place"
    cash: 6000
    interview: "Guaranteed final-round interview"
  - rank: "5th – 6th Place"
    cash: 1500
    interview: "Guaranteed first-round interview"

company_background: >
  Houston Dynamics designs and deploys robotic picking arms for third-party
  logistics providers and e-commerce fulfillment centers across North
  America. The company's research group focuses on sim-to-real transfer,
  reinforcement learning, and grasp generalization, with deployed systems
  currently operating in 12 fulfillment centers.

roles_description: |
  This competition is sourcing internship candidates for:

  - **Robot Learning Research Engineer** — develop reinforcement learning
    and imitation learning methods for manipulation, and drive sim-to-real
    transfer onto physical hardware.
  - **Simulation Infrastructure Engineer** — build and scale the training
    environments, domain randomization pipelines, and evaluation
    infrastructure used to develop and validate grasping policies.

  Both roles are based in Houston, TX for the summer of 2027.

fine_print: |
  - This is NOT a real competition. This is just a placeholder for future competitions that may be hosted on SearchSpace.
  - Submitted model weights and inference code may be reviewed and re-run by HD to confirm reported results; discrepancies beyond normal simulation variance may result in disqualification.
  - The provided simulation environment is a modified, research-only version of HD's internal training stack and does not reflect current production performance.
  - HD employees, contractors, and immediate family members are not eligible to compete.
  - Cash prizes are subject to applicable tax withholding and reporting requirements.
  - Guaranteed interviews require passing standard identity verification and, where applicable, work authorization confirmation.
---

Submit your trained model weights, inference code, and a short (1-page max)
description of your training approach (algorithm, reward shaping, domain
randomization, etc.) as a single zipped archive.

Submissions using pretrained foundation models are permitted as long as the
final policy is fine-tuned or adapted using reinforcement learning on the
provided environment.
