#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  bash scripts/check-supply-chain-indicators.sh [since] [patterns_file]

Arguments:
  since          Only inspect node_modules directories newer than this date.
                 Default: 2025-11-20
  patterns_file  Optional file containing one filename pattern per line.

Environment:
  SECURITY_INDICATOR_PATTERNS
                 Optional comma-separated filename patterns. When set, these
                 replace the built-in defaults.
USAGE
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

since="${1:-2025-11-20}"
patterns_file="${2:-}"

default_patterns=(
  "setup_bun.js"
  "bun_environment.js"
  "cloud.json"
  "environment.json"
  "actionsSecrets.json"
)

patterns=()
if [ -n "${SECURITY_INDICATOR_PATTERNS:-}" ]; then
  IFS="," read -r -a patterns <<<"$SECURITY_INDICATOR_PATTERNS"
elif [ -n "$patterns_file" ]; then
  if [ ! -f "$patterns_file" ]; then
    echo "Patterns file not found: $patterns_file" >&2
    exit 2
  fi

  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in
      "" | \#*) continue ;;
      *) patterns+=("$line") ;;
    esac
  done <"$patterns_file"
else
  patterns=("${default_patterns[@]}")
fi

if [ "${#patterns[@]}" -eq 0 ]; then
  echo "No indicator patterns configured." >&2
  exit 2
fi

mapfile -t node_modules_dirs < <(
  find . \
    -path "./.git" -prune -o \
    -type d -name "node_modules" -newermt "$since" -prune -print 2>/dev/null
)

if [ "${#node_modules_dirs[@]}" -eq 0 ]; then
  echo "No node_modules directories newer than ${since} were found."
  exit 0
fi

find_args=()
for pattern in "${patterns[@]}"; do
  if [ "${#find_args[@]}" -gt 0 ]; then
    find_args+=("-o")
  fi
  find_args+=("-name" "$pattern")
done

tmpfile="$(mktemp)"
trap 'rm -f "$tmpfile"' EXIT

for node_modules_dir in "${node_modules_dirs[@]}"; do
  project_dir="$(dirname "$node_modules_dir")"
  find "$project_dir" \
    -path "$project_dir/.git" -prune -o \
    \( "${find_args[@]}" \) -print 2>/dev/null
done | sort -u >"$tmpfile"

if [ -s "$tmpfile" ]; then
  echo "Potential npm supply-chain indicator files were found:" >&2
  cat "$tmpfile" >&2
  exit 1
fi

echo "No npm supply-chain indicator files found."
