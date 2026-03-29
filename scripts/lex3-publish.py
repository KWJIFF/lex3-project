#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lex3 自动发布系统
自动发布内容到知乎等平台
"""

import json
import time
import random
from datetime import datetime

# 内容模板库
CONTENT_TEMPLATES = {
    "虚拟货币法律风险": """# 虚拟货币法律风险全指南2026

## 一、行业背景

随着虚拟货币市场的发展，越来越多的投资者进入Web3领域，但同时也伴随着法律风险。2024-2025年监管政策持续收紧。

## 二、主要风险类型

### 1. 刑事风险
- **帮信罪**: OTC交易私人转账买币极易涉嫌帮助信息网络犯罪活动罪
- **非法经营罪**: 无牌经营支付业务可能触犯非法经营罪
- **洗钱风险**: 资金涉及上游犯罪可能被认定为洗钱

### 2. 民事风险
- 合同纠纷
- 财产损失追偿难

## 三、合规建议

1. **选择合规交易平台**：避免OTC私下交易
2. **做好KYC认证**：实名认证可证明善意
3. **保留交易记录**：保存好所有凭证
4. **避免资金盘**：高收益承诺都是骗局

## 四、案例警示

近期多起案例显示，OTC交易极易涉嫌帮信罪。建议通过正规交易所交易。

---
*本文仅供普法参考，不构成法律意见*""",
    
    "Web3合规指南": """# Web3项目方刑事风险防控指南

## 一、常见刑事风险

### 1. 非法吸收公众存款
若项目以保本保收益为承诺向社会公众募集资金，可能构成非法吸收公众存款罪。

### 2. 集资诈骗
若项目方存在非法占有目的，欺骗投资者资金，可能构成集资诈骗罪。

### 3. 传销
若采用拉人头、层级返利模式，可能构成组织领导传销活动罪。

## 二、合规建议

1. 不承诺保本保收益
2. 不进行公开募资
3. 做好投资者适当性管理
4. 保留项目运营记录

## 三、建议架构

- 合规运营主体
- 银行资金托管
- 实名认证KYC
- 法律合规审查

---
*本文仅供普法参考*""",
    
    "区块链刑事风险": """# 币圈散户投资避坑指南

## 一、主要陷阱

### 1. OTC交易陷阱
私人转账买币，你以为在投资，其实在帮犯罪分子洗钱。

### 2. 资金盘陷阱
承诺高收益的都是骗局，资金盘崩盘是时间问题。

### 3. 合约带单陷阱
所谓"带单老师"大多是为了赚你的手续费。

## 二、安全投资建议

1. 使用正规交易所
2. 不贪高收益
3. 不轻信他人
4. 保护好私钥

## 三、识别骗局

- 年化收益超过10%要警惕
- 承诺保本要警惕
- 拉人头要警惕

---
*本文仅供普法参考*"""
}

# 问题映射
QUESTIONS = [
    {"title": "虚拟货币的哪几个比较有价值 和投资价值?", "id": "440776600"},
    {"title": "普通人如何避开虚拟货币投资陷阱？", "id": "2020998011946280640"},
    {"title": "新手小白如何才能安全且理性地投资虚拟货币？", "id": "1997266166570308784"},
    {"title": "币圈玩现货一定挣钱吗？", "id": "667616788"},
    {"title": "炒币赔钱了，心里很难受，该怎么办？", "id": "7271139220"},
]

class Lex3Publisher:
    def __init__(self):
        self.platforms = {
            "zhihu": {"connected": True, "name": "知乎"},
            "wechat": {"connected": True, "name": "公众号"},
            "36kr": {"connected": True, "name": "36氪"},
            "law": {"connected": True, "name": "法律快车"},
        }
        self.queue = []
        
    def generate_content(self, topic):
        """生成内容"""
        return CONTENT_TEMPLATES.get(topic, CONTENT_TEMPLATES["虚拟货币法律风险"])
    
    def get_question(self):
        """获取问题"""
        return random.choice(QUESTIONS)
    
    def format_for_zhihu(self, content):
        """格式化内容为知乎风格"""
        lines = content.split('\n')
        result = []
        for line in lines:
            line = line.strip()
            if not line:
                result.append("")
            elif line.startswith('# '):
                result.append(line[2:])
            elif line.startswith('## '):
                result.append("**" + line[3:] + "**")
            elif line.startswith('### '):
                result.append("**" + line[4:] + "**")
            elif line.startswith('- '):
                result.append("• " + line[2:])
            elif line.startswith('- **'):
                result.append("• " + line[4:])
            elif line.startswith('**') and line.endswith('**'):
                result.append(line)
            else:
                result.append(line)
        return '\n'.join(result)
    
    def publish_to_zhihu(self, content):
        """发布到知乎"""
        question = self.get_question()
        formatted = self.format_for_zhihu(content)
        
        print(f"\n{'='*50}")
        print(f"准备发布到知乎")
        print(f"问题: {question['title']}")
        print(f"{'='*50}")
        print(f"\n内容预览 (500字):\n")
        print(formatted[:500] + "...")
        print(f"\n{'='*50}")
        
        return {
            "platform": "知乎",
            "question": question['title'],
            "content": formatted,
            "status": "ready",
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
    
    def publish_to_wechat(self, content):
        """发布到公众号"""
        print(f"\n准备发布到公众号")
        return {
            "platform": "公众号",
            "content": content[:20000],
            "status": "ready"
        }
    
    def get_browser_url(self, question_id):
        """获取浏览器打开URL"""
        return f"https://www.zhihu.com/question/{question_id}"

def main():
    publisher = Lex3Publisher()
    
    print("\n" + "="*50)
    print("Lex3 自动发布系统 V1.0")
    print("="*50)
    
    # 生成内容
    topic = random.choice(list(CONTENT_TEMPLATES.keys()))
    content = publisher.generate_content(topic)
    
    print(f"\n生成主题: {topic}")
    
    # 发布到知乎
    result = publisher.publish_to_zhihu(content)
    
    # 显示浏览器打开命令
    q = publisher.get_question()
    url = publisher.get_browser_url(q['id'])
    
    print(f"\n请在浏览器中执行以下操作:")
    print(f"1. 打开: {url}")
    print(f"2. 点击「写回答」")
    print(f"3. 粘贴以下内容:\n")
    print(result['content'])
    print(f"\n完成后点击「发布」")
    
    return result

if __name__ == "__main__":
    main()