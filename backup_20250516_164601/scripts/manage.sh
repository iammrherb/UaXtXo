#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LEGACY="$ROOT/legacy"

show_help() {
  cat <<EOH
Usage: $(basename "$0") <command> [args]

Commands:
  list         - list all legacy scripts
  run <name>   - run legacy/<name>.sh
  fix-all      - run all legacy scripts starting with fix
  merge-help   - stub for migrating functions here
  help         - show this message
EOH
}

case "${1:-help}" in
  list)
    ls -1 "$LEGACY"/*.sh | xargs -n1 basename
    ;;
  run)
    [[ -z "${2:-}" ]] && { echo "Specify script name"; exit 1; }
    SCRIPT="$LEGACY/${2}.sh"
    [[ -f "$SCRIPT" ]] || { echo "$2.sh not found"; exit 1; }
    bash "$SCRIPT" "${@:3}"
    ;;
  fix-all)
    for f in "$LEGACY"/fix*.sh; do
      echo "→ Running $(basename "$f")"
      bash "$f"
    done
    ;;
  merge-help)
    echo "Stub: migrate functions into this block as subcommands."
    ;;
  *)
    show_help
    ;;
esac
