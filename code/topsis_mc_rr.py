#!/usr/bin/env python
"""
This file is part of the master's thesis with the title Measuring Technical Debt in Mission Critical Trading Systems

It is designed to evaluate the TOPSIS rankings created as part of this thesis and contains these functionalities:
- TOPSIS ranking evaluation with Monte Carlo method.
- TOPSIS ranking stability with rank reversal testing.

running command: python topsis_mc_rr.py services2025.csv --mode absolute --weights equal
running command: python topsis_mc_rr.py services2025.csv --mode absolute --weights equal
"""

import argparse
import sys
import re

import numpy as np
import pandas as pd
from pathlib import Path
from topsis_ranking import topsis_classic, topsis_absolute, rank_table, load_csv, CRITERIA, SCORERS, EQUAL_WEIGHTS, ADJUSTED_WEIGHTS

def ranked_order(df, closeness):
    tmp = df.assign(_ci=closeness).sort_values(["_ci", "service"])
    return list(tmp["service"])


def monte_carlo_weights(df, scorer, n_samples=20000, seed=None):
    rng = np.random.default_rng(seed)

    services = list(df["service"])
    n = len(services)
    counts = {s: [0] * n for s in services}

    for _ in range(n_samples):
        rand = rng.dirichlet(np.ones(5))
        ci = scorer(df, rand)
        order = ranked_order(df, ci)

        for position, service in enumerate(order):
            counts[service][position] += 1

    acc = pd.DataFrame(counts).T / n_samples
    acc.columns = [f"R{i + 1}" for i in range(n)]
    return acc

def rank_reversal_test(df, weights, scorer):
    full_order = ranked_order(df, scorer(df, weights))
    results = []
    for removed in df["service"]:
        sub = df[df["service"] != removed].reset_index(drop=True)
        sub_order = ranked_order(sub, scorer(sub, weights))
        reference = [s for s in full_order if s != removed]
        results.append({
            "removed": removed,
            "preserved": sub_order == reference,
            "order_after": sub_order,
        })
    return full_order, results


#--- printing results -----------------------------------------------------------------------
def print_reversal(df, weights, scorer, mode):
    full_order, results = rank_reversal_test(df, weights, scorer)
    n_reversed = sum(not r["preserved"] for r in results)
    print("\n" + "=" * 60)
    print(f"  Remove one service / rank-reversal test ({mode} mode)")
    print("=" * 60)
    print(f"  Reference order: {', '.join(full_order)}")
    print("-" * 60)
    for r in results:
        status = "preserved" if r["preserved"] else ", ".join(r["order_after"])
        print(f"  remove {r['removed']:<8} -> {status}")
    print("-" * 60)
    print(f"  Reversals detected: {n_reversed} of {len(results)} removals\n")


def print_monte_carlo(df, scorer, mode, n_samples, seed):
    acc = monte_carlo_weights(df, scorer, n_samples=n_samples, seed=seed)
    print("\n" + "=" * 60)
    print(f"  Monte Carlo weight-space analysis ({mode} mode)")
    print(f"  {n_samples} Dirichlet samples, seed = {seed}")
    print("=" * 60)
    print("  Rank-acceptability (probability of each priority rank):")
    print(acc.round(3).to_string())
    print("=" * 60 + "\n")


#--- main -----------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("csv_file", nargs="?", help="Path to the input CSV file")
    parser.add_argument("--mode", choices=["classic", "absolute"], default="absolute",
                        help="Scoring variant (default: absolute, the rank-reversal-safe method)")
    parser.add_argument("--weights", choices=["equal", "adjusted"], default="equal",
                        help="Weight configuration for the point ranking and reversal test")
    parser.add_argument("--montecarlo", type=int, default=20000, metavar="N",
                        help="Number of Dirichlet weight samples (0 disables the analysis)")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    parser.add_argument("--selftest", action="store_true", help="Run internal tests and exit")
    args = parser.parse_args()

    df = load_csv(args.csv_file)
    scorer = SCORERS[args.mode]
    weights = EQUAL_WEIGHTS if args.weights == "equal" else ADJUSTED_WEIGHTS

    print_reversal(df, weights, scorer, args.mode)
    if args.montecarlo > 0:
        print_monte_carlo(df, scorer, args.mode, args.montecarlo, args.seed)

if __name__ == '__main__':
    main()