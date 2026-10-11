#!/usr/bin/env bash
# Builds the site as plain static files in ./dist (no server needed to host it).
# Usage: SITE_URL=https://example.com tools/build-static.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SITE_URL="${SITE_URL:-https://example.com}"
PORT=5299
rm -rf dist .pub && mkdir dist
dotnet publish WebApplication1 -c Release -o .pub >/dev/null
(cd .pub && ASPNETCORE_URLS="http://localhost:$PORT" ASPNETCORE_ENVIRONMENT=Production dotnet WebApplication1.dll >/dev/null 2>&1 &) 
for i in $(seq 1 40); do curl -sf "http://localhost:$PORT/" >/dev/null && break; sleep 1; done
curl -sf "http://localhost:$PORT/" -o dist/index.html
# download every local asset the page references (fingerprinted css/js/images)
grep -oE '(src|href)="/[^"/][^"]*"' dist/index.html | sed -E 's/^(src|href)="//; s/"$//' | sed 's/[?#].*//' | sort -u | while read -r p; do
  mkdir -p "dist/$(dirname "$p")"
  curl -sf "http://localhost:$PORT$p" -o "dist/$p" || echo "skipped $p"
done
# assets referenced only from JS/CSS or meta tags
for p in images/og-image.png favicon.svg images/logo.svg; do
  mkdir -p "dist/$(dirname "$p")"; curl -sf "http://localhost:$PORT/$p" -o "dist/$p" || true
done
pkill -f "WebApplication1.dll" || true
sed -i "s#__SITE_URL__#${SITE_URL%/}#g" dist/index.html
[ -n "${CUSTOM_DOMAIN:-}" ] && echo "$CUSTOM_DOMAIN" > dist/CNAME
touch dist/.nojekyll
rm -rf .pub
echo "Built dist/ for ${SITE_URL}"
