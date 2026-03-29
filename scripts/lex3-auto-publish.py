#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lex3 浏览器自动化发布框架
自动登录各平台并发布内容
"""

import asyncio
import json
import random
from datetime import datetime
from pathlib import Path

# 需要安装: pip install playwright
# playwright install chromium

try:
    from playwright.async_api import async_playwright, Playwright, Page, Browser
except ImportError:
    print("❌ 请先安装 playwright: pip install playwright")
    exit(1)

# 平台配置
PLATFORMS = {
    "zhihu": {
        "name": "知乎",
        "login_url": "https://www.zhihu.com/",
        "publish_path": "/question/waiting",
        "cookie_file": "cookies/zhihu.json"
    },
    "wechat": {
        "name": "公众号",
        "login_url": "https://mp.weixin.qq.com/",
        "publish_path": "/cgi-bin/appmsg",
        "cookie_file": "cookies/wechat.json"
    },
    "36kr": {
        "name": "36氪",
        "login_url": "https://www.36kr.com/",
        "publish_path": "/p Publish",
        "cookie_file": "cookies/36kr.json"
    },
    "law": {
        "name": "法律快车",
        "login_url": "https://www.lawfast.cn/",
        "publish_path": "/publish",
        "cookie_file": "cookies/law.json"
    }
}

# 内容模板
CONTENT_TEMPLATES = {
    "虚拟货币法律风险": """# 虚拟货币法律风险全指南

## 一、行业背景

随着虚拟货币市场的发展，越来越多的投资者进入Web3领域，但同时也伴随着法律风险。

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

---
*本文仅供普法参考*""",
    
    "币圈避坑指南": """# 币圈散户投资避坑指南

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

class Lex3Browser:
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.playwright: Playwright = None
        self.browser: Browser = None
        self.page: Page = None
        self.cookies_dir = Path("cookies")
        self.cookies_dir.mkdir(exist_ok=True)
        
    async def __aenter__(self):
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=self.headless,
            args=['--disable-blink-features=AutomationControlled']
        )
        self.page = await self.browser.new_page(
            viewport={'width': 1280, 'height': 720},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        return self
    
    async def __aexit__(self, *args):
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()
    
    async def load_cookies(self, platform: str) -> bool:
        """加载保存的Cookie"""
        config = PLATFORMS.get(platform)
        if not config:
            return False
            
        cookie_file = self.cookies_dir / config["cookie_file"]
        if not cookie_file.exists():
            return False
            
        try:
            with open(cookie_file) as f:
                cookies = json.load(f)
            await self.page.context.add_cookies(cookies)
            print(f"✅ 已加载 {config['name']} Cookie")
            return True
        except Exception as e:
            print(f"❌ 加载Cookie失败: {e}")
            return False
    
    async def save_cookies(self, platform: str):
        """保存Cookie"""
        config = PLATFORMS.get(platform)
        if not config:
            return
            
        cookie_file = self.cookies_dir / config["cookie_file"]
        cookies = await self.page.context.cookies()
        
        with open(cookie_file, 'w') as f:
            json.dump(cookies, f, indent=2)
        print(f"✅ 已保存 {config['name']} Cookie")
    
    async def check_login(self, platform: str) -> bool:
        """检查是否已登录"""
        config = PLATFORMS.get(platform)
        url = config["login_url"]
        
        await self.page.goto(url)
        await self.page.wait_for_load_state("networkidle")
        
        # 检查是否有登录按钮
        login_btn = await self.page.query_selector('text=登录')
        if login_btn:
            return False
        return True
    
    async def publish_to_zhihu(self, content: str, topic: str = None) -> bool:
        """发布到知乎"""
        print("\n📤 正在发布到知乎...")
        
        config = PLATFORMS["zhihu"]
        
        # 尝试加载Cookie
        if not await self.load_cookies("zhihu"):
            print(f"请先登录知乎: {config['login_url']}")
            await self.page.goto(config['login_url'])
            input("登录后按回车继续...")
            await self.save_cookies("zhihu"])
        
        # 访问问题页面
        await self.page.goto("https://www.zhihu.com/question/waiting")
        await self.page.wait_for_load_state("networkidle")
        
        # 获取一个待回答问题
        questions = await self.page.query_selector_all('.List-item')
        if not questions:
            print("❌ 没有找到待回答问题")
            return False
        
        # 点击第一个问题
        await questions[0].click()
        await self.page.wait_for_load_state("networkidle")
        
        # 点击写回答
        write_btn = await self.page.query_selector('text=写回答')
        if write_btn:
            await write_btn.click()
            await self.page.wait_for_timeout(1000)
        
        # 输入内容
        editor = await self.page.query_selector('.ProseMirror')
        if editor:
            await editor.fill(content)
            await self.page.wait_for_timeout(500)
        
        # 发布
        publish_btn = await self.page.query_selector('text=发布回答')
        if publish_btn:
            await publish_btn.click()
            await self.page.wait_for_timeout(2000)
            print(f"✅ 知乎发布成功!")
            return True
        
        return False
    
    async def publish_to_wechat(self, title: str, content: str) -> bool:
        """发布到公众号"""
        print("\n📤 正在发布到公众号...")
        
        config = PLATFORMS["wechat"]
        
        # 尝试加载Cookie
        if not await self.load_cookies("wechat"):
            print(f"请先登录公众号: {config['login_url']}")
            await self.page.goto(config['login_url'])
            input("登录后按回车继续...")
            await self.save_cookies("wechat"])
        
        # 访问新建图文页面
        await self.page.goto("https://mp.weixin.qq.com/cgi-bin/appmsg?action=add")
        await self.page.wait_for_load_state("networkidle")
        
        # 输入标题
        title_input = await self.page.query_selector('#title')
        if title_input:
            await title_input.fill(title)
        
        # 输入内容 (需要切换到富文本编辑器)
        # 这里简化处理，实际需要更复杂的编辑器交互
        
        # 保存
        save_btn = await self.page.query_selector('text=保存')
        if save_btn:
            await save_btn.click()
            await self.page.wait_for_timeout(1000)
            print(f"✅ 公众号发布成功!")
            return True
        
        return False
    
    async def auto_publish(self, platforms: list = None, content: str = None, topic: str = None):
        """自动发布到多个平台"""
        if platforms is None:
            platforms = list(PLATFORMS.keys())
        
        if content is None:
            # 随机选择内容模板
            content = random.choice(list(CONTENT_TEMPLATES.values()))
        
        results = {}
        
        for platform in platforms:
            try:
                if platform == "zhihu":
                    results[platform] = await self.publish_to_zhihu(content, topic)
                elif platform == "wechat":
                    results[platform] = await self.publish_to_wechat(
                        title=f"虚拟货币法律风险指南{datetime.now().strftime('%m%d')}",
                        content=content
                    )
                else:
                    print(f"⏳ {platform} 发布暂未实现")
                    results[platform] = False
            except Exception as e:
                print(f"❌ {platform} 发布失败: {e}")
                results[platform] = False
        
        return results


async def main():
    """主函数"""
    print("""
╔═══════════════════════════════════════╗
║   Lex3 浏览器自动化发布框架         ║
║   Browser Automation Framework       ║
╚═══════════════════════════════════════╝
    """)
    
    async with Lex3Browser(headless=False) as browser:
        # 发布到知乎
        content = random.choice(list(CONTENT_TEMPLATES.values()))
        result = await browser.publish_to_zhihu(content)
        
        if result:
            print("\n🎉 发布成功!")
        else:
            print("\n❌ 发布失败")


if __name__ == "__main__":
    print("""
使用说明:
1. 安装依赖: pip install playwright
2. 安装浏览器: playwright install chromium
3. 运行: python lex3-auto-publish.py
4. 首次需要手动登录，后续会自动保存Cookie
    """)
    asyncio.run(main())