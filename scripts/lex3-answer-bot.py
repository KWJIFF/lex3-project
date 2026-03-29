#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lex3 知乎批量回答系统
自动回答1000个问题
"""

import random
import asyncio
from datetime import datetime
from pathlib import Path

# 内容模板库
CONTENT_TEMPLATES = [
    """币圈散户投资避坑指南

一、主要陷阱

1. OTC交易陷阱
私人转账买币，你以为在投资，其实在帮犯罪分子洗钱。

2. 资金盘陷阱
承诺高收益的都是骗局，资金盘崩盘是时间问题。

3. 合约带单陷阱
所谓"带单老师"大多是为了赚你的手续费。

二、安全投资建议

1. 使用正规交易所
2. 不贪高收益
3. 不轻信他人
4. 保护好私钥

三、识别骗局

年化收益超过10%要警惕
承诺保本要警惕
拉人头要警惕

---
*仅供普法参考*""",

    """虚拟货币法律风险提示

一、刑事风险

1. 帮信罪：OTC交易易涉嫌
2. 非法经营罪：无牌经营支付
3. 洗钱风险：资金来源不明

二、合规建议

1. 选择合规交易平台
2. 做好KYC认证
3. 保留交易记录
4. 避免资金盘

三、注意事项

- 远离OTC交易
- 警惕高收益承诺
- 保护好私钥

---
*仅供普法参考*""",

    """Web3项目方合规指南

一、常见刑事风险

1. 非法吸收公众存款
2. 集资诈骗
3. 组织传销活动

二、合规建议

1. 不承诺保本保收益
2. 不进行公开募资
3. 做好投资者适当性管理
4. 保留运营记录

三建议架构

- 合规运营主体
- 银行资金托管
- 实名认证KYC
- 法律合规审查

---
*仅供普法参考*""",
]

# 问题关键词（币圈相关）
QUESTION_KEYWORDS = [
    "虚拟货币", "比特币", "以太坊", "加密货币", "币圈", 
    "Web3", "区块链", "炒币", "合约", "现货",
    "交易所", "Token", "NFT", "DeFi", "Token"
]

# 回答模板
ANSWER_TEMPLATES = [
    {
        "keywords": ["赚钱", "盈利", "投资"],
        "content": """作为Web3法律从业者，分享几点建议：

1. 选择正规交易所
不要使用OTC私下交易，容易涉嫌帮信罪。

2. 警惕高收益承诺
年化收益超过10%的大概率是骗局。

3. 保护好私钥
不要泄露给任何人。

4. 了解基本法律风险
OTC交易可能涉嫌帮信罪、非法经营罪等。

---
*仅供普法参考，不构成法律意见*"""
    },
    {
        "keywords": ["风险", "陷阱", "坑"],
        "content": """币圈主要风险：

1. OTC交易陷阱
私人转账买币=帮犯罪分子洗钱

2. 资金盘陷阱
高收益承诺=骗局

3. 合约带单陷阱
带你操作=赚手续费

建议：使用正规交易所，不贪高收益，保护好私钥。

---
*仅供普法参考*"""
    },
    {
        "keywords": ["合法", "合规", "监管"],
        "content": """中国对虚拟货币的监管政策：

1. 禁止挖矿（2021年后）
2. 禁止交易所服务
3. OTC交易风险高
4. 个人持有合法但不保护

建议：
- 使用合规交易所
- 做好KYC
- 保留交易记录

---
*仅供普法参考*"""
    },
    {
        "keywords": ["新手", "小白", "入门"],
        "content": """给新手的建议：

1. 先学习基本知识
了解什么是区块链、比特币

2. 用少量资金尝试
不要一开始就投太多

3. 选择主流交易所
OKX、币安等

4. 注意风险
币圈风险很高，量力而行

---
*仅供普法参考*"""
    },
    {
        "keywords": ["比特币", "BTC", "以太坊", "ETH"],
        "content": """主流虚拟货币：

1. 比特币BTC - 市值第一
2. 以太坊ETH - 智能合约

投资建议：
- 只投能承受损失的钱
- 做好止损线
- 长期持有

风险提示：币圈有风险，投资需谨慎

---
*仅供普法参考*"""
    },
]

class ZhihuAnswerBot:
    def __init__(self):
        self.answered_count = 0
        self.failed_count = 0
        self.today_limit = 10  # 每日限回答数
        
    def select_answer(self, question_title: str) -> str:
        """根据问题选择合适的回答模板"""
        question_lower = question_title.lower()
        
        for template in ANSWER_TEMPLATES:
            for keyword in template["keywords"]:
                if keyword.lower() in question_lower:
                    return template["content"]
        
        # 随机选择默认模板
        return random.choice(CONTENT_TEMPLATES)
    
    def should_answer(self, question_title: str) -> bool:
        """判断是否应该回答这个问题"""
        title_lower = question_title.lower()
        
        # 检查是否包含关键词
        for keyword in QUESTION_KEYWORDS:
            if keyword.lower() in title_lower:
                return True
        
        return False
    
    def format_content(self, content: str) -> str:
        """格式化内容"""
        # 保持内容简洁
        lines = content.split('\n')
        result = []
        for line in lines:
            line = line.strip()
            if line:
                result.append(line)
        
        return '\n'.join(result[:20])  # 限制行数

def main():
    """主函数"""
    print("""
╔═══════════════════════════════════════╗
║   Lex3 知乎批量回答系统           ║
║   自动回答1000个问题             ║
╚═══════════════════════════════════════╝
    """)
    
    bot = ZhihuAnswerBot()
    
    # 需要在浏览器中手动操作
    print("""
使用说明：
1. 打开 https://www.zhihu.com/question/waiting
2. 选择问题→写回答→粘贴内容→发布

已准备内容模板：5个
随机选择自动匹配问题类型

问题关键词：{}
    
---
按回车开始测试...
    """.format(", ".join(QUESTION_KEYWORDS[:5])))
    
    input()


if __name__ == "__main__":
    main()