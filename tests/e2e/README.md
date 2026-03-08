# E2E 测试

端到端测试使用 Playwright 进行。

## 测试文件

- `background.spec.ts` - Background Service Worker 测试
- `content-script.spec.ts` - Content Script 面板测试
- `popup.spec.ts` - Popup 页面测试
- `options.spec.ts` - Options 页面测试

## 运行测试

```bash
# 运行所有 E2E 测试
yarn test:e2e

# 运行特定测试文件
yarn test:e2e background.spec.ts

# 以调试模式运行
yarn test:e2e --debug

# 生成测试报告
yarn test:e2e --reporter=html
```

## 当前状态

⚠️ **注意**: E2E 测试框架已创建，但测试用例未实现。

要实现完整的 E2E 测试，需要：

1. 配置 Playwright 加载 Chrome 扩展
2. 实现 TODO 标记的测试用例
3. 设置测试数据和环境

## 实现优先级

1. **高优先级**:
   - Content Script 面板注入和显示
   - Popup 页面基本功能
   - Background 自动刷新

2. **中优先级**:
   - Options 页面功能
   - 交互和动画验证

3. **低优先级**:
   - Glassmorphism 样式验证
   - 边界情况测试

## 扩展加载配置

要实现 E2E 测试，需要在 Playwright 中配置加载扩展：

```typescript
// 示例配置
test.use({
  // 扩展路径
  contextOptions: {
    extensions: [pathToExtension],
  },
})
```
