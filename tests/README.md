# 测试文档

## 概述

本目录包含 `finance-news-chrome-plugin` 项目的所有测试文件。

## 目录结构

```
tests/
├── setup.ts                          # 测试环境初始化
├── unit/                             # 单元测试
│   ├── utils/                        # 工具函数测试
│   ├── background/                   # Background模块测试
│   ├── content-script/               # Content Script测试
│   ├── popup/                        # Popup页面测试
│   ├── components/                   # 组件测试
│   └── store/                        # 状态管理测试
├── integration/                      # 集成测试
├── e2e/                              # E2E测试
└── mocks/                            # Mock数据
    ├── news/                         # 新闻数据
    ├── predictions/                  # 预测数据
    ├── api/                          # API响应数据
    └── database/                     # 数据库SQL
```

## 运行测试

### 安装依赖

```bash
npm install
```

### 单元测试

运行所有单元测试和集成测试（watch模式）：
```bash
npm test
```

运行所有单元测试（单次）：
```bash
npm run test:unit
```

查看测试UI：
```bash
npm run test:ui
```

生成测试覆盖率报告：
```bash
npm run test:coverage
```

### E2E测试

运行所有E2E测试：
```bash
npm run test:e2e
```

在浏览器中查看E2E测试：
```bash
npm run test:e2e:ui
```

调试E2E测试：
```bash
npm run test:e2e:debug
```

### 运行所有测试

```bash
npm run test:all
```

## 测试覆盖率目标

| 指标 | 目标值 |
|------|--------|
| 语句覆盖率 | >= 80% |
| 分支覆盖率 | >= 75% |
| 函数覆盖率 | >= 80% |
| 行覆盖率 | >= 80% |

## 测试规范

### 命名规范

- 单元测试文件: `*.test.ts` 或 `*.test.tsx`
- E2E测试文件: `*.spec.ts`
- 测试描述: 使用 `describe` 分组，`it` 或 `test` 定义用例

### 测试结构

遵循 AAA 模式:

```typescript
it('should do something', () => {
  // Arrange - 准备测试数据
  const input = 'test'

  // Act - 执行被测试的代码
  const result = process(input)

  // Assert - 验证结果
  expect(result).toBe('expected')
})
```

### 选择器规范

E2E测试使用 `data-testid` 属性作为选择器：

```typescript
const button = page.locator('[data-testid="submit-button"]')
```

## Mock数据

Mock数据位于 `tests/mocks/` 目录，用于隔离外部依赖。

### 添加新的Mock数据

1. 在相应的子目录创建JSON文件
2. 在测试中使用 `vi.mock()` 或 `fetchMock.mockResponse()` 来引用

## Chrome扩展测试注意事项

### Background Service Worker测试

Background脚本运行在独立的Service Worker环境中，测试时需要注意：

- 使用 `chrome` API的mock版本
- 测试时注意异步操作和事件监听器

### Content Script测试

Content Script注入到网页中，E2E测试需要：

- 使用真实的网页环境或模拟网页
- 测试脚本的注入和DOM操作

### Popup测试

Popup是独立页面，测试时需要：

- 模拟 `chrome.runtime.getURL()`
- 测试Popup与Background的通信

## CI/CD

### GitHub Actions

测试会在以下情况自动运行：

- push到 `main` 或 `develop` 分支
- 创建针对 `main` 或 `develop` 分支的PR

### GitLab CI

配置在 `.gitlab-ci.yml` 文件中。

## 常见问题

### 测试超时

如果测试超时，可以在测试文件中增加超时时间：

```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000) // 60秒
  // ...
})
```

### Mock失效

确保在 `beforeEach` 或 `beforeAll` 中正确设置mock，并在 `afterEach` 或 `afterAll` 中清理。

### E2E测试不稳定

1. 使用更稳定的选择器（`data-testid`）
2. 增加重试次数（在 `playwright.config.ts` 中配置）
3. 避免硬编码等待时间，使用 `waitFor`

## 参考文档

- [Vitest文档](https://vitest.dev/)
- [Playwright文档](https://playwright.dev/)
- [Testing Library文档](https://testing-library.com/)
- [项目测试实施计划](../docs/plans/test-implementation-plan.md)
