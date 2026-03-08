# AI金融信息推送 Chrome插件

> 基于智谱AI的财经新闻智能分析和股市预测插件

## 简介

这是一个Chrome浏览器扩展，利用智谱AI（Zhipu AI）进行财经新闻的智能分析和股市预测。插件会自动抓取最新的财经新闻，通过AI分析市场趋势，并给出投资建议。

## 功能特性

- 自动抓取财经新闻
- AI智能分析和预测
- 实时股市预测推送
- 历史数据查看
- 个性化设置

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | >=18.0.0 | 运行环境 |
| Vite | ^5.0.0 | 构建工具 |
| CRXJS | ^2.0.0 | Chrome扩展开发框架 |
| TypeScript | ^5.0.0 | 类型系统 |
| React | ^18.2.0 | UI框架 |
| Zustand | ^4.4.0 | 状态管理 |
| sql.js | ^1.10.0 | 本地数据库 |
| ESLint | ^8.56.0 | 代码检查 |
| Prettier | ^3.1.0 | 代码格式化 |

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Chrome >= 120 (Manifest V3 支持)

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 加载扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目的 `dist` 目录

### 构建

```bash
npm run build
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发模式，支持热更新 |
| `npm run build` | 构建生产版本 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run lint:fix` | 自动修复 ESLint 错误 |
| `npm run format` | 格式化代码 |
| `npm run test` | 运行单元测试 |
| `npm run test:coverage` | 生成测试覆盖率报告 |
| `npm run test:e2e` | 运行 E2E 测试 |
| `npm run type-check` | TypeScript 类型检查 |

## 项目结构

```
finance-news-chrome-plugin/
├── src/
│   ├── background/              # Service Worker
│   ├── content-script/          # Content Script
│   ├── popup/                   # Popup页面
│   ├── components/              # 共享组件
│   ├── store/                   # 状态管理
│   ├── types/                   # 类型定义
│   ├── utils/                   # 工具函数
│   ├── constants/               # 常量
│   └── shared/                  # 共享代码
├── public/                      # 静态资源
├── tests/                       # 测试文件
├── docs/                        # 项目文档
└── manifest.json                # Chrome扩展配置
```

## 文档

- [实施计划](docs/plans/implementation-plan.md)
- [团队结构](docs/team-structure.md)
- [设计系统](docs/ui-ux-designer/design-system.md)

## 贡献

欢迎贡献代码、报告问题或提出建议！

## 许可证

MIT

---

*项目开始日期: 2026-03-06*
