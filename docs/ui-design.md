# Finance News Chrome Plugin - UI设计文档

> 创建日期: 2026-03-06
> 负责人: UI/UX设计师
> 设计风格: 现代专业，适合金融数据展示

---

## 一、设计原则

### 1.1 核心原则
- **清晰性** - 信息层次分明，一目了然
- **专业性** - 严肃但不失友好的金融数据展示
- **效率** - 快速获取关键信息，最小化点击
- **信任** - AI预测结果有适当的视觉可信度体现

### 1.2 状态语义
- **看涨** - 绿色系 (#52C41A)，传达积极、上涨
- **看跌** - 红色系 (#FF4D4F)，传达消极、下跌
- **加仓** - 蓝色系 (#1890FF)，传达增加、积极
- **减仓** - 橙色系 (#FA5151)，传达减少、谨慎
- **维持不动** - 灰色系 (#8C8C8)，传达中性、观望

---

## 二、色彩系统

### 2.1 主色调板

```css
:root {
  /* 状态色 */
  --color-bullish: #52C41A;        /* 看涨 */
  --color-bearish: #FF4D4F;        /* 看跌 */
  --color-add: #1890FF;           /* 加仓 */
  --color-reduce: #FA5151;         /* 减仓 */
  --color-neutral: #8C8C8;       /* 维持不动 */

  /* 功能色 */
  --color-primary: #667EEA;        /* 主色调 - 智能紫 */
  --color-primary-hover: #5568D3;
  --color-success: #10B981;        /* 成功提示 */
  --color-warning: #FFC53D;        /* 警告提示 */
  --color-danger: #F5222D;         /* 错误提示 */

  /* 文本色 */
  --color-text-primary: #1A1A1A;   /* 主文本 */
  --color-text-secondary: #6B7280;  /* 次要文本 */
  --color-text-tertiary: #999999;   /* 辅助文本 */

  /* 背景色 */
  --color-bg-card: #FFFFFF;          /* 卡片背景 */
  --color-bg-hover: #F8F9FA;      /* 悬停背景 */
  --color-bg-elevated: #F0F2F5;    /* 浮起背景 */
  --color-border: #E8E8E8;         /* 边框色 */
  --color-border-light: #F0F0F0;    /* 浅边框 */

  /* 阴影色 */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.16);
}
```

### 2.2 辅助语义色
- **分类标签色**:
  - 财经: #1677FF (蓝色)
  - 国内政治: #0066CC (天蓝色)
  - 国际: #F59F00 (橙色)

- **来源标识色**:
  - 官方: #52C41A (绿色)
  - API: #1890FF (蓝色)

---

## 三、排版规范

### 3.1 字体层级
```css
:root {
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-h1: 24px;
  --font-size-h2: 20px;
  --font-size-h3: 16px;
  --font-size-body: 14px;
  --font-size-caption: 12px;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-heading: 1.4;
  --line-height-body: 1.6;
}
```

### 3.2 间距系统
```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
}
```

---

## 四、面板设计

### 4.1 整体布局

```
┌─────────────────────────────────────────────┐
│ Finance News (点击展开/收起)              │
│                                              │
│ ┌─────────────────────────────────────────────┐ │
│ │ [新闻] [AI预测]                      │ │
│ │                                              │ │
│ │ ┌───────────────────────────────────────┐ │ │
│ │ │ 新闻标题1                            │ │ │
│ │ │ 2024-03-06 10:30  [财经]         │ │ │
│ │ │ 新闻标题2                            │ │ │
│ │ │ 2024-03-06 09:15  [国际]         │ │ │
│ │ │ ...                                   │ │
│ │ └───────────────────────────────────────┘ │ │
│ │                                              │ │
│ │ [搜索框] [分类筛选]                  │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 4.2 展开状态
- **收起状态**: 图标 + 徽章标题
- **展开状态**: 完整面板，380px宽度

---

## 五、新闻列表组件

### 5.1 新闻项设计
```
┌─────────────────────────────────────────────┐
│ [财经]  A股市场表现强劲，创近期新高     │
│         2024-03-06 10:30  腾讯新闻      │
│         [更多详情→]                             │
└─────────────────────────────────────────────┘
```

### 5.2 分类标签
```css
.category-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.category-tag.finance {
  background-color: var(--color-primary);
  color: white;
}

.category-tag.domestic {
  background-color: #0066CC;
  color: white;
}

.category-tag.international {
  background-color: #F59F00;
  color: white;
}
```

---

## 六、AI预测组件

### 6.1 开盘预测卡片
```
┌─────────────────────────────────────────────┐
│ 🔼 今日开盘预测                             │
│                                              │
│ ┌─────────────────────────────────────────────┐ │
│ │                                          │ │
│ │         看涨                               │ │
│ │         [██░░░░░] 置信度: 75%            │ │
│ │                                          │ │
│ │ 理由：政策利好推动市场情绪           │ │
│ │         预测时间: 09:00                   │ │
│ │         [查看历史→]                         │ │
│ └─────────────────────────────────────────────┘ │
│                                              │
└─────────────────────────────────────────────┘
```

### 6.2 置信度进度条
```css
.confidence-bar {
  height: 8px;
  background-color: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
}

.confidence-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
  border-radius: 4px;
  transition: width 0.5s ease-out;
}
```

### 6.3 尾盘建议卡片
```
┌─────────────────────────────────────────────┐
│ 📊 尾盘操作建议                             │
│                                              │
│ ┌─────────────────────────────────────────────┐ │
│ │                                          │ │
│ │         ➕ 加仓                              │ │
│ │         [██░░░░░] 置信度: 65%            │ │
│ │                                          │ │
│ │ 理由：利好消息明显偏多，适度加仓    │ │
│ │         建议: 控制在50%仓位             │ │
│ │         建议时间: 14:00                   │ │
│ └─────────────────────────────────────────────┘ │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 七、交互设计

### 7.1 动画效果
```css
/* 面板展开/收起 */
.panel-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 悬停效果 */
.hover-lift {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* 刷新按钮旋转 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### 7.2 加载状态
```
┌─────────────────────────────────────────────┐
│                                              │
│           ⏳ 正在更新数据...                   │
│                                              │
└─────────────────────────────────────────────┘
```

### 7.3 错误状态
```
┌─────────────────────────────────────────────┐
│ ⚠️ 数据获取失败                            │
│                                              │
│         [重试→]                              │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 八、响应式设计

### 8.1 面板尺寸

| 屏幕宽度 | 面板宽度 | 行为 |
|---------|---------|------|
| < 768px | 100%宽度 | 模态覆盖全屏 |
| 768px - 1024px | 380px | 正常展示 |
| 1024px - 1440px | 380px | 正常展示 |
| > 1440px | 420px | 放大展示，最大宽度480px |

### 8.2 内容适配
- **移动端**: 单列布局，更大触摸目标
- **平板**: 双列新闻列表
- **桌面**: 优化的多列展示

---

## 九、无障碍设计

### 9.1 键盘导航
- Tab键切换标签页（新闻/预测）
- 空格键展开/收起面板
- Enter键选中新闻项
- Esc键关闭面板

### 9.2 屏幕阅读器支持
```html
<div role="region" aria-label="AI金融新闻面板">
  <button aria-expanded="true" aria-label="收起面板">
</div>
```

### 9.3 颜色对比度
- 状态色对比度至少为 4.5:1 (WCAG AA标准)
- 确保文本和背景有足够的对比度
- 看涨/看跌使用图标辅助，不只依赖颜色

---

## 十、组件实现建议

### 10.1 技术栈推荐
```tsx
// 使用React + TypeScript
import { useState, useEffect } from 'react'

// 使用内联样式或CSS Modules
import styles from './FinancePanel.module.css'

// 使用状态提升管理
const FinancePanel = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState<'news' | 'predictions'>('news')
  const [news, setNews] = useState<NewsItem[]>([])
  const [predictions, setPredictions] = useState<Predictions>({} as Predictions)

  // 从chrome.storage加载数据
  useEffect(() => {
    loadNews()
    loadPredictions()
  }, [])

  return (
    <div
      className={`finance-panel ${isExpanded ? 'expanded' : 'collapsed'}`}
      role="region"
      aria-label="AI金融新闻面板"
      style={{ width: isExpanded ? '380px' : 'auto' }}
    >
      {/* 面板内容 */}
    </div>
  )
}
```

### 10.2 响应式样式
```css
.finance-panel {
  width: 380px;
  max-height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: width 0.3s ease, height 0.3s ease;
}

@media (max-width: 768px) {
  .finance-panel {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}
```

---

## 十一、设计资产清单

### 11.1 图标资源
- **刷新图标** - spin图标
- **展开/收起图标** - 向下/向上箭头
- **状态图标** - 看涨(上升箭头)、看跌(下降箭头)
- **分类图标** - 内嵌SVG图标
- **源图标** - API/网站图标

### 11.2 图片资源
- 空状态图标（使用base64编码）
- 占位图（空数据状态）

---

*文档创建日期: 2026-03-06*
