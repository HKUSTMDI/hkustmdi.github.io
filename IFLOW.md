# MDI实验室官网 - iFlow 上下文文档

## 项目概述

这是一个基于 Next.js + React 构建的现代化实验室官网，采用静态站点生成（SSG）技术，支持多语言国际化（中文/英文）。网站专注于展示 MDI 实验室在医疗数据智能、病理学人工智能和多模态大模型研究方面的成果。

### 核心技术栈
- **前端框架**: React 18+ with Next.js 14+
- **样式方案**: Tailwind CSS
- **内容管理**: Markdown + JSON
- **国际化**: 自定义国际化系统
- **构建方式**: 静态站点生成（SSG）

## 项目架构

```
mdiweb/
├── src/                    # 源代码
│   ├── components/        # React 组件
│   ├── pages/             # Next.js 页面路由
│   ├── styles/            # 样式文件
│   ├── utils/             # 工具函数
│   ├── contexts/          # React 上下文
│   ├── hooks/             # 自定义 Hooks
│   └── types/             # TypeScript 类型定义
├── content/               # 内容文件
│   ├── pages/             # 页面内容（Markdown/JSON）
│   ├── projects/          # 项目数据（JSON）
│   └── datasets/          # 数据集信息（JSON）
├── locales/               # 国际化语言包
├── static/                # 静态资源文件
├── public/                # Next.js 公共文件
└── docs/                  # 项目文档
```

## 核心功能模块

### 1. 多语言支持
- 支持中文和英文两种语言
- 通过 URL 前缀（/zh/ 或 /en/）区分语言
- 使用 localStorage 存储用户语言偏好
- 语言切换时自动更新路由和内容

### 2. 内容管理系统
- **首页**: 展示实验室介绍、研究方向、产品等核心信息
- **团队页面**: 展示负责人和团队成员信息
- **项目页面**: 展示研究项目，支持关键词筛选
- **合作页面**: 展示合作伙伴和合作项目
- **数据集页面**: 展示实验室构建的数据集资源

### 3. 响应式设计
- 桌面端: 全屏滚动设计
- 移动端: 连续页面滚动
- 支持多种屏幕尺寸优化

## 开发命令

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:3000 查看网站

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

### 代码检查
```bash
npm run lint
```

## 国际化实现

### 语言包结构
- `locales/zh.json` - 中文翻译
- `locales/en.json` - 英文翻译

### 语言切换机制
1. 通过 URL 前缀识别当前语言（如 /zh/ 或 /en/）
2. 使用 localStorage 存储用户语言偏好
3. 提供语言切换组件更新界面和路由

### 翻译使用方式
```typescript
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';

const { language } = useLanguage();
const title = getTranslation(language, 'navigation.home');
```

## 内容管理

### 内容存储方式
1. **Markdown 文件**: 用于富文本内容（首页各部分介绍）
2. **JSON 文件**: 用于结构化数据（团队成员、项目列表、合作伙伴等）

### 主要内容文件
- `content/pages/home/`: 首页各部分内容
- `content/pages/people/people-data.json`: 团队成员信息
- `content/projects/data/projects.json`: 研究项目数据
- `content/datasets/data/datasets.json`: 数据集信息
- `content/pages/collaboration/collaboration-data.json`: 合作项目信息

### 添加新内容流程
1. 对于富文本内容：编辑对应的 Markdown 文件
2. 对于结构化数据：更新对应的 JSON 文件
3. 重新构建项目以生成静态页面

## 组件系统

### 核心组件
- `Navigation.tsx`: 导航栏组件，包含语言切换
- `Footer.tsx`: 页脚组件
- `NewHomePage.tsx`: 首页主组件
- `ProjectPage.tsx`: 项目列表页面
- `ProjectDetailPage.tsx`: 项目详情页面
- `PeoplePage.tsx`: 团队页面
- `DatasetPage.tsx`: 数据集页面
- `CollaborationPage.tsx`: 合作页面

### 国际化组件
- `LanguageProvider`: 提供语言上下文
- `useLanguage` Hook: 获取和切换语言

## 数据加载机制

### 静态生成（SSG）
- 使用 `getStaticProps` 和 `getStaticPaths` 实现静态生成
- 为中英文分别生成静态页面
- 在构建时加载所有内容数据

### 数据加载工具
- `src/utils/markdown.ts`: 提供各种内容数据加载函数
- 支持 Markdown 解析和 JSON 数据加载
- 自动处理中英文内容切换

## 样式系统

### 技术栈
- Tailwind CSS 用于原子化样式
- 自定义 CSS 类用于复杂布局
- 响应式设计支持多种设备

### 主要样式文件
- `src/styles/globals.css`: 全局样式和组件样式
- `tailwind.config.js`: Tailwind 配置

## 部署配置

### 静态导出配置
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

### 部署方式
1. 运行 `npm run build` 生成静态文件
2. 将 `out/` 目录部署到任何静态文件服务器
3. 支持 GitHub Pages、Vercel 等平台

## 开发规范

### 代码风格
- 使用 TypeScript 进行类型检查
- 遵循 React 最佳实践
- 使用 Tailwind CSS 类名进行样式开发

### 组件开发
- 使用函数组件和 Hooks
- 组件文件使用 `.tsx` 扩展名
- 组件导出使用默认导出

### 国际化规范
- 所有用户界面文本需要支持国际化
- 使用 `getTranslation` 函数获取翻译文本
- 在 `locales/` 目录下维护语言包

## 项目依赖

### 核心依赖
- `next`: React 框架
- `react`/`react-dom`: React 库
- `gray-matter`: Markdown 解析
- `remark`/`rehype`: Markdown 处理
- `tailwindcss`: CSS 框架

### 开发依赖
- `typescript`: 类型检查
- `@types/*`: TypeScript 类型定义
- `eslint`: 代码检查
- `autoprefixer`/`postcss`: CSS 处理

## 扩展和维护

### 添加新页面
1. 在 `src/pages/[locale]/` 下创建页面文件
2. 实现 `getStaticProps` 和 `getStaticPaths`
3. 创建对应的组件文件
4. 在导航中添加链接

### 添加新内容类型
1. 在 `content/` 目录下创建内容文件
2. 在 `src/utils/markdown.ts` 中添加加载函数
3. 创建对应的 TypeScript 类型定义
4. 创建展示组件

### 更新样式
1. 修改 `src/styles/globals.css`
2. 更新 `tailwind.config.js` 配置
3. 重新构建项目