#!/bin/bash
set -eu -o pipefail

current_branch="$(git rev-parse --abbrev-ref HEAD)"

# make sure git is clean
test -z "$(git status --porcelain)"

# output timestamp and tag name
runtimeVersion=0.0.0  # TODO: read app.config.js instead of hard-coding it
createdAt="$(date -u -d @"$(stat -c %W dist/metadata.json)" +"%Y-%m-%dT%H-%M-%S")"
name="expo-updates-$runtimeVersion-$createdAt"
echo "$createdAt" > dist/createdAt.txt
echo "$name" > dist/tag.txt

# move assets to release
rm -rf release
cp -r dist release

# commit from detached HEAD
git checkout --detach
git add release
git commit -m "chore: release $name"

# push tag
git tag "$name"
git push origin "$name"

# restore branch
git checkout "$current_branch"
