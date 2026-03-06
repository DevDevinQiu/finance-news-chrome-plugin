# Finance News Chrome Plugin - 完整设计系统

> 项目名称: Finance News Plugin
> 设计来源: UI/UX Pro Max Skill (fintech/dashboard模式)
> 创建日期: 2026-03-06

---

## 📋 设计系统概述

### 核心风格
- **风格类型**: Glassmorphism + Dark Mode (OLED)
- **子风格**: Retro-Futurism, Motion-Driven
- **优化目标**: Conversion-Optimized, Real-Time Monitoring + Predictive
- **设计理念**: Dark tech colors + trust + vibrant accents, Security perception

---

## 🎨 色彩系统

### 主色调板

```css
:root {
  /* 主色调 - Fintech/Crypto */
  --color-primary: #F59E0B;         /* 主色 */
  --color-secondary: #FBBF24;       /* 辅助色 */
  --color-tertiary: #8B5CF6;       /* 强调色 */
  --color-dark-blue: #0F172A;        /* 深蓝色 */
  --color-light-blue: #F8FAFC;      /* 浅蓝色 */
  --color-dark-slate: #334155;      /* 深石板色 */
  --color-gold: #FFD700;             /* 金色 - 信任感 */
  --color-neon-green: #39FF14;       /* 霓虹绿 */
  --color-neon-blue: #0080FF;       /* 霓虹蓝 */
  --color-neon-purple: #BF00FF;     /* 霓虹紫 */
}
```

### 状态色（用于股市预测）

```css
:root {
  /* 看涨 */
  --color-bullish: #39FF14;         /* 霓虹绿 */
  --color-bullish-bg: rgba(57, 255, 20, 0.1);

  /* 看跌 */
  --color-bearish: #F59E0B;        /* 橙色 */
  --color-bearish-bg: rgba(245, 158, 11, 0.1);

  /* 加仓 */
  --color-add: #0080FF;            /* 霓虹蓝 */
  --color-add-bg: rgba(0, 128, 255, 0.1);

  /* 减仓 */
  --color-reduce: #BF00FF;          /* 霓虹紫 */
  --color-reduce-bg: rgba(191, 0, 255, 0.1);

  /* 维持不动 */
  --color-neutral: #8B5CF6;         /* 浅紫色 */
  --color-neutral-bg: rgba(139, 92, 246, 0.1);
}
```

### 功能色

```css
:root {
  --color-success: #39FF14;         /* 成功 - 霓虹绿 */
  --color-warning: #FFD700;         /* 警告 - 金色 */
  --color-danger: #F59E0B;           /* 错误 - 橙色 */
  --color-info: #0080FF;            /* 信息 - 霓虹蓝 */
}
```

### Glassmorphism 特效

```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* OLED 优化 */
@supports (display: -webkit-box) or (display: box) {
  .oled-optimized {
    background: #000000;
    color: #F8FAFC;
  }
}
```

---

## ✏️ 排版系统

### 字体选择

**主字体**: IBM Plex Sans
**备选字体**: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --font-family-base: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### 字体层级

```css
:root {
  --font-size-h1: 28px;           /* 1.75rem */
  --font-size-h2: 24px;           /* 1.5rem */
  --font-size-h3: 20px;           /* 1.25rem */
  --font-size-h4: 18px;           /* 1.125rem */
  --font-size-h5: 16px;           /* 1rem */
  --font-size-body: 14px;          /* 0.875rem */
  --font-size-small: 12px;         /* 0.75rem */
  --font-size-caption: 10px;       /* 0.625rem */

  --line-height-heading: 1.4;
  --line-height-body: 1.6;
  --letter-spacing-heading: -0.02em;
  --letter-spacing-body: 0.01em;
}
```

---

## 🎯 无障碍设计

### 对比度标准

```css
/* 高对比度文本 - 4.5:1 WCAG AA标准 */
.text-high-contrast {
  color: #FFFFFF;
  background: #000000;
}

/* 中对比度文本 */
.text-medium-contrast {
  color: #F8FAFC;
  background: #0F172A;
}

/* 状态色对比 */
.status-success {
  color: #39FF14;
  background: rgba(57, 255, 20, 0.15);
}

.status-danger {
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.15);
}
```

### 焦点状态

```css
/* 可见焦点环 - 高优先级 */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 128, 255, 0.6);
  outline-offset: 2px;
}

.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-neon-blue);
  outline: 2px solid transparent;
}

/* 移除默认轮廓（用焦点环替代） */
*:focus {
  outline: none;
}
```

### 触摸目标（移动端优化）

```css
/* 最小触摸目标 44x44px */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* 按钮间距 */
.button-group {
  gap: 8px;
}

/* 避免 hover效果依赖移动端 */
@media (hover: none) {
  .interactive {
    opacity: 0.85;
    transition: opacity 0.2s;
  }

  .interactive:active {
    opacity: 1;
  }
}
```

---

## 📊 图表设计

### 图表类型推荐

**Trend Over Time** - 股市趋势
- 类型：Line Chart / Area Chart
- 用途：展示股票价格随时间变化
- 颜色：主色 #0080FF，填充20%透明度
- 特性：Hover + Zoom

**Compare Categories** - 多类对比
- 类型：Bar Chart (Horizontal/Vertical)
- 用途：对比不同股票或指标
- 颜色：每个类别用不同颜色
- 特性：Hover + Sort

### 图表库推荐

- Chart.js - 基础图表
- Recharts - React组件友好
- ApexCharts - 高级图表

### 数据可视化最佳实践

```css
.chart-container {
  /* 确保可访问性 */
  role: 'img';
  aria-label: 'Stock price trend chart';

  /* 色盲友好 - 添加图案 */
  background-image: url('data:image/svg+xml,...');

  /* 数据表格备用 */
}
```

---

## 🎭 动画系统

### 动画时长

```css
:root {
  /* 微交互 150-300ms */
  --duration-micro: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;

  /* 动效 500ms+ */
  --duration-fast: 500ms;
  --duration-medium: 800ms;
  --duration-slow: 1200ms;
}
```

### 性能优化动画

```css
/* 使用 transform 和 opacity，避免 width/height */
.animated-element {
  transform: translateY(0);
  opacity: 1;
  transition: transform var(--duration-normal) ease-out,
              opacity var(--duration-normal) ease-out;
}

.animated-element.hidden {
  transform: translateY(100%);
  opacity: 0;
}

/* 使用 will-change 提示浏览器 */
.panel-transition {
  will-change: transform, opacity;
}
```

### 减少动画偏好

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🖥️ 组件设计

### 新闻卡片

```tsx
interface NewsCardProps {
  title: string;
  category: 'finance' | 'domestic' | 'international';
  source: string;
  time: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ title, category, source, time }) => {
  return (
    <div
      className="glass-card news-card"
      role="article"
      tabIndex={0}
      aria-label={`新闻：${title}`}
    >
      <div className="news-card-header">
        <span className={`category-tag category-${category}`}>
          {category === 'finance' ? '财经' : category === 'domestic' ? '国内' : '国际'}
        </span>
        <span className="news-time">{time}</span>
      </div>
      <h3 className="news-title">{title}</h3>
      <div className="news-footer">
        <span className="news-source">{source}</span>
        <span className="read-more">阅读更多 →</span>
      </div>
    </div>
  )
}
```

### AI预测卡片

```tsx
interface PredictionCardProps {
  type: 'open_forecast' | 'close_advice';
  result: string;
  confidence: number;
  reason: string;
  timestamp: string;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  type, result, confidence, reason, timestamp
}) => {
  const isBullish = type === 'open_forecast' && result === '看涨';
  const isAdd = type === 'close_advice' && result === '加仓';

  return (
    <div className={`glass-card prediction-card ${isBullish || isAdd ? 'positive' : 'negative'}`}>
      <div className="prediction-header">
        <span className="prediction-type">
          {type === 'open_forecast' ? '今日开盘预测' : '尾盘操作建议'}
        </span>
        <span className="prediction-time">{timestamp}</span>
      </div>

      <div className={`prediction-result ${isBullish || isAdd ? 'bullish' : 'bearish'}`}>
        {result}
      </div>

      <div className="confidence-bar">
        <div
          className="confidence-fill"
          style={{ width: `${confidence * 100}%` }}
        />
        <span className="confidence-text">置信度: {(confidence * 100).toFixed(0)}%</span>
      </div>

      <p className="prediction-reason">{reason}</p>
    </div>
  )
}
```

### 置信度进度条

```css
.confidence-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.confidence-fill {
  height: 100%;
  background: linear-gradient(90deg,
    var(--color-primary),
    var(--color-tertiary)
  );
  border-radius: 3px;
  transition: width 0.5s ease-out;
}

.confidence-fill.positive {
  background: linear-gradient(90deg, #39FF14, #0080FF);
}

.confidence-fill.negative {
  background: linear-gradient(90deg, #F59E0B, #BF00FF);
}
```

---

## 📱 响应式设计

### 断点系统

```css
:root {
  --breakpoint-mobile: 375px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-large: 1440px;
}

@media (max-width: 768px) {
  /* 移动端 - 单列布局 */
  .finance-panel {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* 平板 - 中等宽度 */
  .finance-panel {
    width: 340px;
  }
}

@media (min-width: 1024px) {
  /* 桌面 - 全宽面板 */
  .finance-panel {
    width: 380px;
  }
}
```

---

## 🚀 React性能优化

### 性能指南

```tsx
import { memo, useMemo, useCallback } from 'react'

// 使用memo避免不必要的重新渲染
export const NewsItem = memo(({ news }: { news: NewsItem }) => {
  return <NewsCard {...news} />
})

// 使用useMemo缓存计算结果
const filteredNews = useMemo(() => {
  return news.filter(n => n.category === selectedCategory)
}, [news, selectedCategory])

// 使用useCallback稳定函数引用
const handleRefresh = useCallback(() => {
  refreshNews()
}, [refreshNews])
```

### 代码分割

```tsx
import { lazy, Suspense } from 'react'

const PopupPage = lazy(() => import('./pages/Popup'))

const App = () => (
  <Suspense fallback={<Loading />}>
    <PopupPage />
  </Suspense>
)
```

---

## ✅ 设计检查清单

### 视觉质量
- [ ] 无emoji图标（使用SVG）
- [ ] 所有图标来自一致的图标集
- [ ] Hover状态不引起布局偏移
- [ ] 直接使用主题色（不是var()包装）
- [ ] OLED优化（纯黑背景）

### 交互
- [ ] 所有可点击元素有cursor-pointer
- [ ] Hover状态提供清晰的视觉反馈
- [ ] 转换平滑（150-300ms）
- [ ] 键盘导航有可见焦点状态
- [ ] 触摸目标最小44x44px

### 对比度
- [ ] 浅色模式文本对比度≥4.5:1
- [ ] 玻璃/透明元素在浅色模式可见
- [ ] 边框在两种模式都可见
- [ ] 状态色不作为唯一信息标识

### 响应式
- [ ] 移动端单列布局
- [ ] 平板中等宽度面板
- [ ] 桌面全宽面板
- [ ] 移动端无水平滚动
- [ ] 最小触摸目标44x44px

### 无障碍
- [ ] 所有图片有alt文本
- [ ] 表单输入有标签
- [ ] 颜色不作为唯一指示器
- [ ] 尊重prefers-reduced-motion
- [ ] Focus状态清晰可见
- [ ] 屏幕阅读器可用（ARIA标签）

---

## 📦 CSS变量完整定义

```css
:root {
  /* === 主色调 === */
  --color-primary: #F59E0B;
  --color-secondary: #FBBF24;
  --color-tertiary: #8B5CF6;
  --color-dark-blue: #0F172A;
  --color-light-blue: #F8FAFC;
  --color-dark-slate: #334155;
  --color-gold: #FFD700;
  --color-neon-green: #39FF14;
  --color-neon-blue: #0080FF;
  --color-neon-purple: #BF00FF;

  /* === 状态色 === */
  --color-bullish: #39FF14;
  --color-bearish: #F59E0B;
  --color-add: #0080FF;
  --color-reduce: #BF00FF;
  --color-neutral: #8B5CF6;
  --color-success: #39FF14;
  --color-warning: #FFD700;
  --color-danger: #F59E0B;
  --color-info: #0080FF;

  /* === 文本色 === */
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #CBD5E1;
  --color-text-tertiary: #64748B;
  --color-text-muted: #475569;

  /* === 背景色 === */
  --color-bg-card: rgba(255, 255, 255, 0.1);
  --color-bg-hover: rgba(255, 255, 255, 0.15);
  --color-bg-elevated: rgba(0, 0, 0, 0.5);
  --color-bg-solid: #0F172A;

  /* === 间距系统 === */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;

  /* === 圆角 === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;

  /* === 阴影 === */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.25);
  --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.35);

  /* === Glassmorphism === */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-blur: 15px;

  /* === 字体 === */
  --font-family-base: 'IBM Plex Sans', system-ui, sans-serif;
  --font-size-h1: 28px;
  --font-size-h2: 24px;
  --font-size-h3: 20px;
  --font-size-h4: 18px;
  --font-size-body: 14px;
  --font-size-small: 12px;

  /* === 动画 === */
  --duration-micro: 150ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);

  /* === Z-Index === */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-tooltip: 400;
  --z-notification: 500;
}
```

---

## 🎨 设计token使用示例

### 新闻分类标签

```tsx
<div
  className="category-tag"
  style={{
    backgroundColor: `var(--color-${category}-bg)`,
    color: `var(--color-${category})`
  }}
>
  {categoryLabel}
</div>
```

### 置信度展示

```tsx
<div className="confidence-display">
  <div
    className="confidence-bar"
    style={{ width: `${confidence * 100}%` }}
  />
  <span>置信度: {(confidence * 100).toFixed(0)}%</span>
</div>
```

### 状态指示器

```tsx
<div
  className={`status-indicator ${isPositive ? 'positive' : 'negative'}`}
  style={{
    color: `var(--color-${status})`,
    backgroundColor: `var(--color-${status}-bg)`
  }}
>
  <span>{statusIcon}</span>
  <span>{statusText}</span>
</div>
```

---

*设计系统基于 UI/UX Pro Max Skill - Fintech/Dashboard 模式*
