# Google Analytics 配置指南

本项目已集成Google Analytics 4 (GA4)，可以自动跟踪所有页面的浏览数据。

## 配置步骤

### 1. 获取Google Analytics跟踪ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的属性或使用现有属性
3. 获取测量ID（格式：G-XXXXXXXXXX）

### 2. 配置环境变量

1. 复制 `env.example` 文件为 `.env.local`：
   ```bash
   cp env.example .env.local
   ```

2. 在 `.env.local` 中设置您的Google Analytics跟踪ID：
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### 3. 重启开发服务器

```bash
npm run dev
```

## 功能特性

### 自动页面跟踪
- 所有页面浏览都会自动被跟踪
- 支持单页应用(SPA)的路由变化跟踪
- 多语言页面支持

### 手动事件跟踪
使用 `useAnalytics` Hook 可以跟踪自定义事件：

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.trackButtonClick('按钮名称', '组件位置');
  };

  return <button onClick={handleClick}>点击我</button>;
};
```

### 可用的事件跟踪方法

- `trackPageView(pageName, pagePath)` - 跟踪页面浏览
- `trackButtonClick(buttonName, location)` - 跟踪按钮点击
- `trackLinkClick(linkText, destination)` - 跟踪链接点击
- `trackSearch(searchTerm, resultsCount)` - 跟踪搜索
- `trackDownload(fileName, fileType)` - 跟踪文件下载
- `trackFormSubmit(formName, success)` - 跟踪表单提交
- `trackCustomEvent(action, category, label, value)` - 跟踪自定义事件

## 验证配置

### 开发环境验证
1. 打开浏览器开发者工具
2. 切换到 Network 标签
3. 刷新页面
4. 查找对 `google-analytics.com` 或 `googletagmanager.com` 的请求

### 生产环境验证
1. 部署到生产环境
2. 访问 [Google Analytics 实时报告](https://analytics.google.com/)
3. 查看实时用户活动

## 隐私和合规

- 确保遵守当地的数据保护法规（如GDPR）
- 考虑添加Cookie同意横幅
- 可以在 `src/utils/gtag.ts` 中添加隐私控制逻辑

## 故障排除

### 常见问题

1. **GA事件没有发送**
   - 检查 `NEXT_PUBLIC_GA_ID` 环境变量是否正确设置
   - 确保在生产环境中设置了正确的环境变量

2. **开发环境中看不到数据**
   - GA4通常需要一些时间才能显示数据
   - 使用Google Analytics调试模式进行实时验证

3. **页面浏览没有跟踪**
   - 检查浏览器控制台是否有JavaScript错误
   - 确保网络请求没有被广告拦截器阻止

### 调试模式

在开发环境中，可以在浏览器控制台中手动触发事件进行测试：

```javascript
// 在浏览器控制台中执行
gtag('event', 'test_event', {
  event_category: 'test',
  event_label: 'manual_test'
});
```

## 更多信息

- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js 第三方集成文档](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
