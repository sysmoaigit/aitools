#!/bin/bash
# AIPT Health Check — run `./check-aipt.sh` to verify full system health
# Part of CORTEX OS — AI Premium Tools autonomous agent

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=== AIPT Health Check · $(date '+%Y-%m-%d %H:%M:%S') ==="
echo ""

# 1. Cloudflare Pages deployment
DEPLOY_URL=$(curl -s "https://aitools-9l4.pages.dev" -o /dev/null -w "%{http_code}")
if [ "$DEPLOY_URL" = "200" ]; then
  echo -e "${GREEN}✅ Cloudflare Pages: LIVE (aitools-9l4.pages.dev)${NC}"
else
  echo -e "${RED}❌ Cloudflare Pages: DOWN (HTTP $DEPLOY_URL)${NC}"
fi

# 2. Custom domain
DOMAIN_STATUS=$(dig +short www.aipremium.tools CNAME 2>/dev/null)
if echo "$DOMAIN_STATUS" | grep -q "aitools-9l4.pages.dev"; then
  echo -e "${GREEN}✅ Custom Domain: www.aipremium.tools → Cloudflare${NC}"
elif [ -z "$DOMAIN_STATUS" ]; then
  echo -e "${YELLOW}⚠️  Custom Domain: DNS not configured (needs CNAME in Squarespace)${NC}"
else
  echo -e "${YELLOW}⚠️  Custom Domain: unexpected DNS ($DOMAIN_STATUS)${NC}"
fi

# 3. Supabase
SUPABASE_HEALTH=$(curl -s "https://qipgnmifgfgzxqusoyro.supabase.co/rest/v1/" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcGdubWlmZ2ZnenhxdXNveXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjM4NjEsImV4cCI6MjA5NTI5OTg2MX0.hF9KAP0HBGXegrraB_6eexGfF4B13De-kYgk5tuFDFk" \
  -o /dev/null -w "%{http_code}" 2>/dev/null)
if [ "$SUPABASE_HEALTH" = "200" ]; then
  echo -e "${GREEN}✅ Supabase: Connected${NC}"
else
  echo -e "${RED}❌ Supabase: FAILED (HTTP $SUPABASE_HEALTH)${NC}"
fi

# 4. Tool count
TOOL_COUNT=$(curl -s "https://qipgnmifgfgzxqusoyro.supabase.co/rest/v1/tools?select=count" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcGdubWlmZ2ZnenhxdXNveXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjM4NjEsImV4cCI6MjA5NTI5OTg2MX0.hF9KAP0HBGXegrraB_6eexGfF4B13De-kYgk5tuFDFk" \
  -H "Prefer: count=exact" 2>/dev/null | grep -o '"count":[0-9]*' | cut -d: -f2)
echo -e "${GREEN}📊 Tools in database: ${TOOL_COUNT:-unknown}${NC}"

# 5. GitHub
cd ~/AI-Premium-Tools && git fetch origin 2>/dev/null && \
  LOCAL=$(git rev-parse HEAD) && REMOTE=$(git rev-parse origin/main) && \
  if [ "$LOCAL" = "$REMOTE" ]; then
    echo -e "${GREEN}✅ GitHub: synced${NC}"
  else
    echo -e "${YELLOW}⚠️  GitHub: behind remote — pull needed${NC}"
  fi

echo ""
echo "=== Health Check Complete ==="
