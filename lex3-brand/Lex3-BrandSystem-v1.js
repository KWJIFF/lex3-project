import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   LEX3 LAB — Brand System v1
   Parent: 深象科技 (Shenxiang Tech)
   DNA: 深象 dark foundation × Web3 identity
   ═══════════════════════════════════════════ */

const C = {
  // 深象 DNA — dark layered foundation (inherited)
  bg: "#07080C", bg2: "#0D0F14", bg3: "#12151C",
  surface: "#181C25", surfaceHover: "#1E2330",
  border: "#1F2937", borderL: "#374151",
  // Text hierarchy (inherited structure, cooled down)
  t1: "#F0F4F8", t2: "#94A3B8", t3: "#64748B", t4: "#475569",
  // Lex3 Primary — Cyber Teal (replaces 深象 orange)
  cyan: "#00E5BF", cyanMid: "#00C9A7", cyanDark: "#00A88E",
  cyanSoft: "rgba(0,229,191,0.10)", cyanGlow: "rgba(0,229,191,0.25)",
  cyanBright: "#5DFDD8",
  // Lex3 Secondary — Judicial Violet
  violet: "#8B5CF6", violetSoft: "rgba(139,92,246,0.10)",
  // Functional
  blue: "#3B82F6", blueSoft: "rgba(59,130,246,0.10)",
  red: "#EF4444", redSoft: "rgba(239,68,68,0.10)",
  amber: "#F59E0B", amberSoft: "rgba(245,158,11,0.10)",
  green: "#22C55E", greenSoft: "rgba(34,197,94,0.10)",
  // 深象 orange — parent brand link
  sxOrange: "#F97316",
};

const F = {
  display: "'Space Mono', 'JetBrains Mono', monospace",
  sans: "'DM Sans', 'Inter', -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

/* ── Lex3 Logo Mark ── */
function Lex3Logo({ size = 32, glowOn = true }) {
  const s = size;
  const id = "lex3glow" + Math.random().toString(36).slice(2,6);
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {glowOn && <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>}
      {/* Shield outline — legal authority */}
      <path d="M24 4 L40 12 L40 28 C40 36 32 43 24 46 C16 43 8 36 8 28 L8 12 Z"
        stroke={C.cyan} strokeWidth="1.5" fill="none" opacity="0.3"/>
      {/* Inner chain links — Web3 */}
      <path d="M18 18 L24 14 L30 18" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={glowOn ? `url(#${id})` : undefined}/>
      <path d="M18 24 L24 20 L30 24" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      <path d="M18 30 L24 26 L30 30" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      {/* Anchor node */}
      <circle cx="24" cy="14" r="2" fill={C.cyan} filter={glowOn ? `url(#${id})` : undefined}/>
    </svg>
  );
}

/* ── Shenxiang Parent Logo (small) ── */
function SXLogo({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M12 28 C12 16 20 10 28 10" stroke={C.sxOrange} strokeWidth="3" strokeLinecap="round"/>
      <path d="M12 28 L12 22" stroke={C.sxOrange} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
      <circle cx="28" cy="10" r="2.5" fill={C.sxOrange}/>
    </svg>
  );
}

function Badge({ children, color = "cyan" }) {
  const m = {
    cyan: [C.cyanSoft, C.cyan],
    violet: [C.violetSoft, C.violet],
    blue: [C.blueSoft, C.blue],
    red: [C.redSoft, C.red],
    amber: [C.amberSoft, C.amber],
    green: [C.greenSoft, C.green],
    orange: ["rgba(249,115,22,0.12)", C.sxOrange],
  };
  const [bg, fg] = m[color] || m.cyan;
  return <span style={{ fontSize: 10, fontFamily: F.mono, padding: "3px 10px", borderRadius: 6, background: bg, color: fg, letterSpacing: 0.8, fontWeight: 600, border: `1px solid ${fg}20`, display: "inline-block" }}>{children}</span>;
}

function Divider() { return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: "32px 0" }}/>; }

function SectionLabel({ children }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, letterSpacing: 3, marginBottom: 14, textTransform: "uppercase" }}>{children}</div>;
}

function Card({ children, style = {} }) {
  return <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, ...style }}>{children}</div>;
}

/* ── Grid Background Pattern ── */
function GridBg() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(${C.border}40 1px, transparent 1px),
          linear-gradient(90deg, ${C.border}40 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black 20%, transparent 70%)",
      }}/>
      <div style={{
        position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.cyanGlow} 0%, transparent 70%)`,
        opacity: 0.3,
      }}/>
    </div>
  );
}

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function Lex3BrandSystem() {
  const [tab, setTab] = useState("brand");
  const tabs = [
    { id: "brand", label: "Brand" },
    { id: "colors", label: "Colors" },
    { id: "type", label: "Type" },
    { id: "components", label: "UI" },
    { id: "pages", label: "Pages" },
  ];

  return (
    <div style={{ fontFamily: F.sans, background: C.bg, color: C.t1, minHeight: "100vh", position: "relative" }}>
      <GridBg />
      <div style={{ position: "relative", zIndex: 1, padding: "28px 20px", maxWidth: 640, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Lex3Logo size={38}/>
            <div>
              <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>
                LEX<span style={{ color: C.cyan }}>3</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4, letterSpacing: 3 }}>BRAND SYSTEM v1</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SXLogo size={14}/>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: C.t4, letterSpacing: 1 }}>by 深象科技</span>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div style={{
          display: "flex", gap: 2, marginBottom: 32,
          background: C.bg2, borderRadius: 12, padding: 3,
          border: `1px solid ${C.border}`,
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
              fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: 0.8,
              background: tab === t.id ? C.surface : "transparent",
              color: tab === t.id ? C.cyan : C.t4,
              boxShadow: tab === t.id ? `0 1px 8px rgba(0,0,0,0.3), inset 0 1px 0 ${C.border}` : "none",
              transition: "all 0.2s ease",
            }}>{t.label}</button>
          ))}
        </div>

        {/* ════════════════════════════════
            TAB: BRAND
        ════════════════════════════════ */}
        {tab === "brand" && <div>
          <SectionLabel>Concept</SectionLabel>
          <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, margin: "0 0 12px", lineHeight: 1.35 }}>
            Web3 世界的高风险，<br/>
            <span style={{
              background: `linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>需要真正懂的人。</span>
          </h2>
          <p style={{ fontSize: 13, color: C.t3, lineHeight: 2, margin: "0 0 24px" }}>
            Lex3 Lab 是深象科技旗下的 Web3 法律风险平台品牌。Lex = 法律（拉丁语），3 = Web3。
            继承深象「暗色主场 + 单一强调色」的设计哲学，以 Cyber Teal 替代深象橙，象征链上世界的冷静与精准。
            品牌调性：Chainalysis 的数据冷感 × Linear 的极简克制 × 深象的暗色基因。
          </p>

          <Divider/>
          <SectionLabel>Logo System</SectionLabel>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <Card style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 auto" }}>
              <Lex3Logo size={44}/>
              <div>
                <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 700, letterSpacing: 1.5 }}>
                  LEX<span style={{ color: C.cyan }}>3</span> <span style={{ fontWeight: 400, color: C.t3, fontSize: 16 }}>LAB</span>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4, letterSpacing: 3 }}>WEB3 LEGAL RISK</div>
              </div>
            </Card>
            <Card style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 auto" }}>
              <SXLogo size={16}/>
              <span style={{ fontSize: 12, color: C.t4 }}>×</span>
              <Lex3Logo size={24}/>
              <span style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>
                深象<span style={{ color: C.t4, fontWeight: 400, margin: "0 4px" }}>·</span><span style={{ color: C.cyan }}>LEX3</span>
              </span>
            </Card>
          </div>

          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, letterSpacing: 1, marginBottom: 10 }}>ICON VARIANTS</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[
              { bg: C.bg2, bd: C.border },
              { bg: C.bg3, bd: `${C.cyan}30` },
              { bg: `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`, bd: "transparent", inv: true },
              { bg: C.surface, bd: `${C.violet}30` },
            ].map((s, i) => (
              <div key={i} style={{
                width: 52, height: 52, borderRadius: 14,
                background: s.bg, border: `1.5px solid ${s.bd}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: i === 2 ? `0 4px 20px ${C.cyanGlow}` : "none",
              }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L40 12 L40 28 C40 36 32 43 24 46 C16 43 8 36 8 28 L8 12 Z"
                    stroke={s.inv ? C.bg : C.cyan} strokeWidth="1.5" fill="none" opacity="0.3"/>
                  <path d="M18 18 L24 14 L30 18" stroke={s.inv ? C.bg : C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 24 L24 20 L30 24" stroke={s.inv ? C.bg : C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                  <path d="M18 30 L24 26 L30 30" stroke={s.inv ? C.bg : C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                  <circle cx="24" cy="14" r="2" fill={s.inv ? C.bg : C.cyan}/>
                </svg>
              </div>
            ))}
          </div>

          <Card style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: C.t3, lineHeight: 2.2 }}>
              <strong style={{ color: C.t1 }}>Logo 解读：</strong>
              盾形轮廓 = 法律保护与安全屏障。内部三层 V 形链路 = 区块链层级结构（L1/L2/L3）逐层递进。
              顶部发光锚点 = 风险锁定与精准判断。从深象 Logo「攀升曲线」中继承了「从深入到上升」的动态感，
              但转化为 Web3 语境下的「层层穿透、逐级解析」。
            </div>
          </Card>

          <Divider/>
          <SectionLabel>Slogan System</SectionLabel>
          {[
            ["Brand", "链上风险，链下解决"],
            ["Service", "高风险案件，找真正懂的人"],
            ["Content", "每一个 Web3 风险，都值得被正确理解"],
            ["Tech", "案件数据驱动的法律智能基础设施"],
            ["Network", "一个人辩护，不必一个人作战"],
          ].map(([l, t], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 0",
              borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
            }}>
              <Badge color={["cyan", "violet", "blue", "green", "amber"][i]}>{l}</Badge>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{t}</span>
            </div>
          ))}

          <Divider/>
          <SectionLabel>Brand Relationship</SectionLabel>
          <Card>
            <div style={{ fontSize: 12, color: C.t3, lineHeight: 2.4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <SXLogo size={18}/>
                <strong style={{ color: C.sxOrange, fontSize: 13 }}>深象科技</strong>
                <span style={{ color: C.t4 }}>— 母品牌</span>
              </div>
              <span style={{ color: C.t2 }}>
                OPC 一人公司通关系统 · 品牌色 #F97316 · 服务所有 OPC 创业者
              </span>
              <div style={{ height: 1, background: C.border, margin: "12px 0" }}/>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Lex3Logo size={18} glowOn={false}/>
                <strong style={{ color: C.cyan, fontSize: 13 }}>Lex3 Lab</strong>
                <span style={{ color: C.t4 }}>— 子品牌 / 独立项目</span>
              </div>
              <span style={{ color: C.t2 }}>
                Web3 法律风险平台 · 品牌色 #00E5BF · 专注高风险案件入口与法律情报
              </span>
              <div style={{ height: 1, background: C.border, margin: "12px 0" }}/>
              <strong style={{ color: C.t1, fontSize: 11 }}>关系原则：</strong><br/>
              <span style={{ color: C.t2, fontSize: 12 }}>
                共享暗色基因与结构语言，独立色彩与内容身份。Lex3 在对外传播中以独立品牌出现，
                仅在底部标注「深象科技」归属，类似 Vercel 与 Next.js 的关系。
              </span>
            </div>
          </Card>
        </div>}

        {/* ════════════════════════════════
            TAB: COLORS
        ════════════════════════════════ */}
        {tab === "colors" && <div>
          <SectionLabel>Dark Foundation — 深象 DNA</SectionLabel>
          <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
            {[["bg", C.bg], ["bg2", C.bg2], ["bg3", C.bg3], ["surface", C.surface], ["border", C.border]].map(([n, h], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 52, borderRadius: 10, background: h, border: `1px solid ${C.borderL}`, marginBottom: 6 }}/>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4 }}>{n}<br/>{h}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Text Hierarchy</SectionLabel>
          <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
            {[["primary", C.t1], ["secondary", C.t2], ["tertiary", C.t3], ["muted", C.t4]].map(([n, h], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: "14px 0", background: C.bg2, borderRadius: 10, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: h, marginBottom: 4 }}>Aa</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4 }}>{n}<br/>{h}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Primary Accent — Cyber Teal</SectionLabel>
          <div style={{
            height: 64, borderRadius: 14, marginBottom: 8,
            background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 6px 30px ${C.cyanGlow}`,
          }}>
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.bg, letterSpacing: 3 }}>
              #00E5BF — CYBER TEAL
            </span>
          </div>
          <div style={{ fontSize: 11, color: C.t3, lineHeight: 2, marginBottom: 8 }}>
            Cyber Teal 只用于：CTA 按钮、关键状态、行动指引、Logo 标记、链上数据高亮。
            其他一切用灰阶。继承深象「唯一行动色」原则——当用户看到 teal，意味着「这里需要行动」。
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
            {[["bright", C.cyanBright], ["primary", C.cyan], ["mid", C.cyanMid], ["dark", C.cyanDark], ["soft", C.cyanSoft]].map(([n, h], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 36, borderRadius: 8, background: h, border: `1px solid ${C.borderL}`, marginBottom: 4 }}/>
                <div style={{ fontFamily: F.mono, fontSize: 8, color: C.t4 }}>{n}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Secondary — Judicial Violet</SectionLabel>
          <div style={{
            height: 48, borderRadius: 12, marginBottom: 8,
            background: `linear-gradient(135deg, ${C.violet}, #7C3AED)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 20px rgba(139,92,246,0.25)`,
          }}>
            <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: "white", letterSpacing: 2 }}>#8B5CF6 — VIOLET</span>
          </div>
          <div style={{ fontSize: 11, color: C.t3, lineHeight: 2, marginBottom: 28 }}>
            Violet 仅用于：链上路径标记、数据分析可视化、Premium 功能标识。不与 Teal 在同一组件中同时出现。
          </div>

          <SectionLabel>Functional Colors</SectionLabel>
          <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
            {[["Info", C.blue], ["Success", C.green], ["Warning", C.amber], ["Danger", C.red]].map(([n, h], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 44, borderRadius: 10, background: h, marginBottom: 6, boxShadow: `0 4px 16px ${h}30` }}/>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4 }}>{n}<br/>{h}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Gradients</SectionLabel>
          {[
            ["Primary CTA", `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`],
            ["Chain / Data", `linear-gradient(135deg, ${C.cyan}, ${C.violet})`],
            ["Risk Alert", `linear-gradient(135deg, ${C.amber}, ${C.red})`],
            ["深象 Link", `linear-gradient(135deg, ${C.sxOrange}, #F59E0B)`],
          ].map(([n, g], i) => (
            <div key={i} style={{
              height: 40, borderRadius: 10, background: g, marginBottom: 6,
              display: "flex", alignItems: "center", paddingLeft: 16,
              fontFamily: F.mono, fontSize: 10, color: i === 2 ? "white" : C.bg,
              letterSpacing: 1.5, fontWeight: 600,
            }}>{n}</div>
          ))}

          <Divider/>
          <SectionLabel>Color DNA — 深象 → Lex3</SectionLabel>
          <Card>
            <div style={{ fontSize: 12, color: C.t3, lineHeight: 2.2 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: C.sxOrange, marginBottom: 4, boxShadow: `0 4px 16px rgba(249,115,22,0.3)` }}/>
                  <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4 }}>深象</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", color: C.t4, fontSize: 20 }}>→</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: C.cyan, marginBottom: 4, boxShadow: `0 4px 16px ${C.cyanGlow}` }}/>
                  <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4 }}>Lex3</div>
                </div>
              </div>
              <span style={{ color: C.t2 }}>
                深象橙 = 温暖、通关、行动力。Lex3 Teal = 冷静、精准、链上原生。
                两者共享暗色背景和「唯一强调色」逻辑，但色温从暖转冷，反映从创业通关到法律风控的场景切换。
              </span>
            </div>
          </Card>
        </div>}

        {/* ════════════════════════════════
            TAB: TYPOGRAPHY
        ════════════════════════════════ */}
        {tab === "type" && <div>
          <SectionLabel>Display · 标题</SectionLabel>
          <div style={{ fontFamily: F.display, fontSize: 30, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>
            LEX<span style={{ color: C.cyan }}>3</span> PROTOCOL
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, marginBottom: 28 }}>Space Mono 700 · +2px tracking · 用于品牌标题、大字展示</div>

          <SectionLabel>Heading · 页面标题</SectionLabel>
          <div style={{ fontFamily: F.sans, fontSize: 24, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>
            链上风险，链下解决
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, marginBottom: 28 }}>DM Sans 800 · -0.5px tracking · 用于页面标题与核心文案</div>

          <SectionLabel>Body · 正文</SectionLabel>
          <div style={{ fontFamily: F.sans, fontSize: 15, color: C.t2, lineHeight: 1.9, marginBottom: 4 }}>
            以高风险案件为入口，围绕咨询、承办、协同、研究与数据，构建 Web3 法律情报基础设施。
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, marginBottom: 28 }}>DM Sans 400 · natural tracking · 用于正文、说明、描述</div>

          <SectionLabel>Mono · 数据 / 标签 / 链上</SectionLabel>
          <div style={{ fontFamily: F.mono, fontSize: 14, color: C.cyan, marginBottom: 4, letterSpacing: 0.5 }}>
            0x7a250d...B4e · CASE-2026-0329 · ¥15,000
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, marginBottom: 28 }}>JetBrains Mono 500-700 · +0.5px · 用于地址、编号、价格、链上数据</div>

          <Divider/>
          <SectionLabel>Size Scale</SectionLabel>
          {[
            ["Hero", 30, 700, F.display],
            ["H1", 24, 800, F.sans],
            ["H2", 20, 700, F.sans],
            ["H3", 16, 600, F.sans],
            ["Body", 14, 400, F.sans],
            ["Small", 12, 400, F.sans],
            ["Mono", 11, 600, F.mono],
            ["Micro", 10, 500, F.mono],
          ].map(([n, s, w, f], i) => (
            <div key={i} style={{
              display: "flex", alignItems: "baseline", gap: 12,
              padding: "8px 0",
              borderBottom: i < 7 ? `1px solid ${C.border}` : "none",
            }}>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, width: 40 }}>{n}</span>
              <span style={{ fontSize: s, fontWeight: w, fontFamily: f, color: C.t1, letterSpacing: s > 20 ? (f === F.display ? 2 : -0.5) : 0 }}>
                Lex3 链上
              </span>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, marginLeft: "auto" }}>{s}px · w{w}</span>
            </div>
          ))}

          <Divider/>
          <SectionLabel>Font Strategy vs 深象</SectionLabel>
          <Card>
            <div style={{ fontSize: 12, color: C.t3, lineHeight: 2.4 }}>
              <strong style={{ color: C.t1 }}>共享：</strong>JetBrains Mono（数据/标签层），暗色背景下的灰阶文字层级<br/>
              <strong style={{ color: C.t1 }}>差异：</strong>Lex3 用 Space Mono 做品牌展示字体（比 Inter 更「链上原生」），
              用 DM Sans 替代 Inter 做正文（更柔和的几何感，区分于深象的利落感）<br/>
              <strong style={{ color: C.t1 }}>原则：</strong>品牌展示层用 mono 字体强化 Web3/Code 身份，正文层保持可读性
            </div>
          </Card>
        </div>}

        {/* ════════════════════════════════
            TAB: COMPONENTS
        ════════════════════════════════ */}
        {tab === "components" && <div>
          <SectionLabel>Buttons</SectionLabel>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            <button style={{
              background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`,
              color: C.bg, border: "none", borderRadius: 10, padding: "10px 22px",
              fontFamily: F.sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 4px 20px ${C.cyanGlow}`, letterSpacing: 0.3,
            }}>立即咨询</button>
            <button style={{
              background: "transparent", color: C.t1,
              border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 22px",
              fontFamily: F.sans, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>了解更多</button>
            <button style={{
              background: C.cyanSoft, color: C.cyan,
              border: `1px solid ${C.cyan}20`, borderRadius: 10, padding: "10px 22px",
              fontFamily: F.sans, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>查看案例</button>
            <button style={{
              background: C.redSoft, color: C.red,
              border: `1px solid ${C.red}20`, borderRadius: 10, padding: "10px 22px",
              fontFamily: F.sans, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>风险预警</button>
          </div>

          <SectionLabel>Badges / Tags</SectionLabel>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            <Badge color="cyan">刑事辩护</Badge>
            <Badge color="violet">链上分析</Badge>
            <Badge color="blue">冻卡处置</Badge>
            <Badge color="amber">高风险</Badge>
            <Badge color="red">紧急</Badge>
            <Badge color="green">已解决</Badge>
            <Badge color="orange">深象</Badge>
          </div>

          <SectionLabel>Case Card</SectionLabel>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Badge color="cyan">CASE</Badge>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.t3, letterSpacing: 0.5 }}>2026-0329-A</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>USDT OTC 交易涉嫌非法经营</div>
                <div style={{ fontSize: 12, color: C.t3 }}>当事人被传唤后，需要评估主观明知与共犯切分</div>
              </div>
              <Badge color="amber">侦查阶段</Badge>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {["OTC", "非法经营", "主观明知", "共犯切分"].map((t, i) => (
                <span key={i} style={{
                  fontSize: 10, fontFamily: F.mono, color: C.t3, padding: "2px 8px",
                  background: C.bg2, borderRadius: 5, border: `1px solid ${C.border}`,
                }}>{t}</span>
              ))}
            </div>
            <div style={{ height: 1, background: C.border, margin: "0 0 12px" }}/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4 }}>
                涉案金额 <span style={{ color: C.cyan, fontWeight: 700 }}>¥2,400,000</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4 }}>
                地区 <span style={{ color: C.t2 }}>深圳</span>
              </div>
            </div>
          </Card>

          <SectionLabel>Risk Level Indicator</SectionLabel>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, letterSpacing: 1, marginBottom: 10 }}>RISK ASSESSMENT</div>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{
                  flex: 1, height: 6, borderRadius: 3,
                  background: i <= 4 ? (i <= 2 ? C.amber : C.red) : C.border,
                }}/>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.red, fontWeight: 700 }}>HIGH RISK — L4</span>
              <span style={{ fontSize: 11, color: C.t3 }}>建议立即启动法律应对</span>
            </div>
          </Card>

          <SectionLabel>Chain Address Display</SectionLabel>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.t4, letterSpacing: 1, marginBottom: 10 }}>ON-CHAIN TRACE</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Source", addr: "0x7a250d56...94Ce4B4e", tag: "CEX Hot Wallet", color: C.cyan },
                { label: "Mixer", addr: "0x3fC91A3a...1b7cA9d3", tag: "Tornado Cash", color: C.red },
                { label: "Dest", addr: "0x8B3CF5...e2A1b8C4", tag: "Unknown EOA", color: C.amber },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 12px", background: C.bg2, borderRadius: 8,
                  borderLeft: `3px solid ${item.color}`,
                }}>
                  <span style={{ fontFamily: F.mono, fontSize: 9, color: C.t4, width: 44, flexShrink: 0 }}>{item.label}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 12, color: C.t1, flex: 1 }}>{item.addr}</span>
                  <span style={{ fontSize: 9, fontFamily: F.mono, color: item.color, padding: "2px 6px", background: `${item.color}15`, borderRadius: 4 }}>{item.tag}</span>
                </div>
              ))}
            </div>
          </Card>

          <SectionLabel>Status Chips</SectionLabel>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { s: "待分诊", c: C.amber, ic: "◉" },
              { s: "咨询中", c: C.cyan, ic: "◎" },
              { s: "深度分析", c: C.violet, ic: "◈" },
              { s: "已签约", c: C.green, ic: "✓" },
              { s: "已关闭", c: C.t4, ic: "—" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 12px", background: C.surface, borderRadius: 8,
                border: `1px solid ${C.border}`,
              }}>
                <span style={{ color: item.c, fontSize: 12 }}>{item.ic}</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: item.c, fontWeight: 600 }}>{item.s}</span>
              </div>
            ))}
          </div>
        </div>}

        {/* ════════════════════════════════
            TAB: PAGES
        ════════════════════════════════ */}
        {tab === "pages" && <div>
          <SectionLabel>Landing Hero — Mobile Preview</SectionLabel>
          <div style={{
            background: C.bg2, borderRadius: 20, overflow: "hidden",
            border: `1px solid ${C.border}`, marginBottom: 28,
          }}>
            <div style={{ padding: "32px 20px 24px", position: "relative" }}>
              <div style={{
                position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
                width: 300, height: 300, borderRadius: "50%",
                background: `radial-gradient(circle, ${C.cyanGlow} 0%, transparent 70%)`,
                opacity: 0.2, pointerEvents: "none",
              }}/>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Lex3Logo size={28}/>
                  <span style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, letterSpacing: 1 }}>
                    LEX<span style={{ color: C.cyan }}>3</span>
                  </span>
                </div>
                <button style={{
                  background: C.cyan, color: C.bg, border: "none", borderRadius: 8,
                  padding: "7px 16px", fontFamily: F.sans, fontSize: 11, fontWeight: 700,
                  cursor: "pointer",
                }}>咨询</button>
              </div>
              <div style={{ position: "relative" }}>
                <Badge color="cyan">Web3 Legal Risk</Badge>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: "14px 0 10px", lineHeight: 1.3 }}>
                  链上风险来临时，<br/>
                  <span style={{
                    background: `linear-gradient(135deg, ${C.cyan}, ${C.violet})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>你需要真正懂的人。</span>
                </h1>
                <p style={{ fontSize: 13, color: C.t3, lineHeight: 1.9, margin: "0 0 20px" }}>
                  从冻卡到传唤，从链上路径到刑事辩护。<br/>
                  Lex3 是 Web3 世界里你最需要的法律后盾。
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{
                    background: `linear-gradient(135deg, ${C.cyan}, ${C.cyanDark})`,
                    color: C.bg, border: "none", borderRadius: 10, padding: "11px 24px",
                    fontFamily: F.sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
                    boxShadow: `0 4px 20px ${C.cyanGlow}`,
                  }}>免费风险评估</button>
                  <button style={{
                    background: "transparent", color: C.t2,
                    border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "11px 20px",
                    fontFamily: F.sans, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}>案例库 →</button>
                </div>
              </div>
            </div>
            <div style={{
              display: "flex", borderTop: `1px solid ${C.border}`,
              background: C.bg3,
            }}>
              {[["200+", "处理案件"], ["96%", "客户续约"], ["48h", "响应时效"]].map(([n, l], i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "14px 0",
                  borderRight: i < 2 ? `1px solid ${C.border}` : "none",
                }}>
                  <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: C.cyan }}>{n}</div>
                  <div style={{ fontSize: 10, color: C.t4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <SectionLabel>Service Cards</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {[
              { icon: "⚡", title: "紧急咨询", desc: "冻卡、传唤、扣押等紧急事件的即时法律响应", badge: "30 min", color: C.cyan },
              { icon: "🔍", title: "链上分析", desc: "地址溯源、资金路径还原、链上证据解释报告", badge: "技术支持", color: C.violet },
              { icon: "🛡️", title: "刑事辩护", desc: "涉币案件全流程辩护，从侦查到审判的专业代理", badge: "核心服务", color: C.blue },
            ].map((item, i) => (
              <Card key={i} style={{
                borderLeft: `3px solid ${item.color}`,
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${item.color}15`, border: `1px solid ${item.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 9, color: item.color, background: `${item.color}12`, padding: "2px 8px", borderRadius: 4 }}>{item.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.t3, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </Card>
            ))}
          </div>

          <SectionLabel>Content Card</SectionLabel>
          <Card style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <Badge color="cyan">案例拆解</Badge>
              <Badge color="amber">高风险</Badge>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, lineHeight: 1.4 }}>
              USDT 冻卡后的 72 小时：你应该做什么和不应该做什么
            </div>
            <div style={{ fontSize: 12, color: C.t3, lineHeight: 1.8, marginBottom: 12 }}>
              当银行卡因 OTC 交易被冻结，第一反应往往是恐慌。本文基于真实案例，拆解冻卡后的最佳应对路径……
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Lex3Logo size={16} glowOn={false}/>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.t4 }}>Lex3 Lab</span>
              </div>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.t4 }}>2026.03.29</span>
            </div>
          </Card>

          <SectionLabel>Dashboard — Pipeline</SectionLabel>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.t3, letterSpacing: 1 }}>PIPELINE</span>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.t4 }}>2026 Q1</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {[
                { label: "高意图线索", val: 1200, pct: 100, c: C.t3 },
                { label: "付费咨询", val: 380, pct: 31.7, c: C.cyan },
                { label: "深度分析", val: 120, pct: 10, c: C.violet },
                { label: "正式签约", val: 42, pct: 3.5, c: C.green },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: C.t2 }}>{item.label}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 11, color: item.c, fontWeight: 600 }}>{item.val}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: C.bg2 }}>
                    <div style={{ height: 4, borderRadius: 2, background: item.c, width: `${item.pct}%`, transition: "width 0.6s ease" }}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "转化率", val: "3.5%", c: C.cyan },
                { label: "客单价", val: "¥15.2万", c: C.violet },
                { label: "回款率", val: "87%", c: C.green },
              ].map((m, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "10px 0",
                  background: C.bg2, borderRadius: 8, border: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 700, color: m.c }}>{m.val}</div>
                  <div style={{ fontSize: 9, color: C.t4, marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>}

        {/* ── Footer ── */}
        <div style={{
          marginTop: 44, paddingTop: 16, borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SXLogo size={12}/>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: C.t4, letterSpacing: 1 }}>深象科技</span>
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: C.t4, letterSpacing: 2 }}>
            © 2026 LEX3 LAB · BRAND v1
          </div>
        </div>
      </div>
    </div>
  );
}
