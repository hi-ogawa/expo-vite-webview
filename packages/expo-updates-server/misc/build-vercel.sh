#!/bin/bash
set -eu -o pipefail

CONFIG_RAKKAS_ADAPTER=vercel npm run build:vercel
# cp -f misc/vercel/config.json .vercel/output/config.json
# cp -f misc/vercel/.vc-config.json .vercel/output/functions/index.func/.vc-config.json
