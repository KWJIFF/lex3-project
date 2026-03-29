#!/bin/bash
# 每日资讯自动获取

SEARXNG_URL="http://localhost:8888"
OUTPUT_DIR="/Users/xyp/.openclaw/workspace/content/daily-news"

mkdir -p "$OUTPUT_DIR"

# 关键词列表
KEYWORDS=(
  "Web3监管 政策"
  "虚拟货币 法律"
  "区块链 法规"
  "数字资产 合规"
  "crypto regulation"
)

for keyword in "${KEYWORDS[@]}"; do
  echo "=== $(date): $keyword ===" >> "$OUTPUT_DIR/news-$(date +%Y-%m-%d).md"
  curl -s -A "Mozilla/5.0" "${SEARXNG_URL}/search?q=${keyword}&format=json&engines=google,bing&num=10" >> "$OUTPUT_DIR/news-$(date +%Y-%m-%d).md" 2>&1
  echo "" >> "$OUTPUT_DIR/news-$(date +%Y-%m-%d).md"
  sleep 2
done

echo "资讯获取完成: $(date)" >> "$OUTPUT_DIR/news-$(date +%Y-%m-%d).md"