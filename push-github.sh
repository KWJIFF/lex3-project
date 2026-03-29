#!/bin/bash
# 推送到GitHub

cd ~/.openclaw/workspace

echo "正在推送到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ 推送成功！"
else
    echo "❌ 推送失败，请手动运行: git push -u origin main"
fi
