#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="gzweb"
REMOTE_DIR="/var/www/html"
DRY_RUN=0

usage() {
  cat <<'USAGE'
Deploy this static site to gzweb:/var/www/html using local SSH config.

Usage:
  scripts/deploy-gzweb.sh [--dry-run]
  scripts/deploy-gzweb.sh --host gzweb --dest /var/www/html

Options:
  -n, --dry-run     Preview changes without copying files.
  --host HOST       SSH config host alias to use. Default: gzweb
  --dest PATH       Remote destination directory. Default: /var/www/html
  -h, --help        Show this help message.

The script overwrites files with matching paths on the remote server, but it
does not delete remote-only files or directories.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -n|--dry-run)
      DRY_RUN=1
      shift
      ;;
    --host)
      REMOTE_HOST="${2:-}"
      if [[ -z "$REMOTE_HOST" ]]; then
        echo "Missing value for --host" >&2
        exit 2
      fi
      shift 2
      ;;
    --dest)
      REMOTE_DIR="${2:-}"
      if [[ -z "$REMOTE_DIR" ]]; then
        echo "Missing value for --dest" >&2
        exit 2
      fi
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required but was not found in PATH." >&2
  exit 1
fi

if ! command -v ssh >/dev/null 2>&1; then
  echo "ssh is required but was not found in PATH." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

RSYNC_ARGS=(
  -az
  --human-readable
  --itemize-changes
  --rsh "${DEPLOY_SSH_COMMAND:-ssh -T -o RemoteCommand=none -o RequestTTY=no}"
  --exclude ".git/"
  --exclude ".gitignore"
  --exclude ".DS_Store"
  --exclude "scripts/"
  --exclude "node_modules/"
  --exclude ".next/"
  --exclude "out/"
  --exclude "*.log"
)

if [[ "$DRY_RUN" -eq 1 ]]; then
  RSYNC_ARGS+=(--dry-run)
  echo "Dry run: no files will be copied."
fi

echo "Deploying $PROJECT_ROOT/ to $REMOTE_HOST:$REMOTE_DIR/"
echo "Remote-only files and directories will be left in place."

rsync "${RSYNC_ARGS[@]}" "$PROJECT_ROOT/" "$REMOTE_HOST:$REMOTE_DIR/"
