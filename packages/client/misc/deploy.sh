#!/bin/bash
set -eu -o pipefail

version="$(jq -r '.version' package.json)"
name="client-$version"
current_branch="$(git rev-parse --abbrev-ref HEAD)"

# make sure git is clean
test -z "$(git status --porcelain)"

# move assets to dist
rm -rf dist
cp -r build/release dist

# commit from detached HEAD
git checkout --detach
git add dist
git commit -m "chore: release $name"

# push tag
git tag "$name"
git push origin "$name"

# restore branch
git checkout "$current_branch"
