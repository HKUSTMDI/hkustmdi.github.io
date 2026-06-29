# MDI实验室官网

基于 Next.js + React 构建的现代化实验室官网，支持多语言国际化，专注于展示医疗数据智能和病理学人工智能研究成果。

## 技术栈

- **前端框架**: React 18+ with Next.js 14+
- **样式方案**: Tailwind CSS
- **内容管理**: JSON数据驱动
- **国际化**: 自定义多语言系统
- **构建方式**: 静态站点生成（SSG）

## 项目结构

```
mdiweb/
├── src/                    # 源代码
│   ├── components/        # React 组件
│   ├── pages/             # Next.js 页面路由
│   ├── styles/            # 样式文件
│   ├── utils/             # 工具函数
│   ├── contexts/          # React 上下文
│   ├── hooks/             # 自定义Hooks
│   └── types/             # TypeScript 类型定义
├── content/               # 内容文件
│   ├── pages/             # 页面内容
│   ├── projects/          # 项目数据
│   ├── datasets/          # 数据集信息
│   └── people/            # 团队成员数据
├── locales/               # 国际化语言包
├── static/                # 静态资源文件
├── public/                # Next.js 公共文件
└── docs/                  # 项目文档
```

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
npm start
# 或
yarn start
```

## 功能特性

### 核心页面
- **首页**: 展示实验室介绍、研究方向和核心产品
- **团队页面**: 展示负责人和团队成员信息
- **项目页面**: 展示研究项目，支持关键词筛选
- **合作页面**: 展示合作伙伴和合作项目
- **数据集页面**: 展示实验室构建的数据集资源

### 技术特性
- **响应式设计**: 桌面端和移动端优化
- **静态站点生成**: 构建时生成静态HTML
- **多语言支持**: 中文/英文切换
- **数据驱动**: JSON数据驱动的内容管理
- **SEO优化**: 完整的SEO元数据支持

## 内容管理

### 数据存储
项目内容以JSON格式存储在`content/`目录下，按页面类型分类：

- `content/pages/home/` - 首页各部分内容
- `content/projects/data/projects.json` - 研究项目数据
- `content/people/data/people.json` - 团队成员信息
- `content/datasets/data/datasets.json` - 数据集信息
- `content/collaboration/data/collaboration.json` - 合作项目信息

### 国际化内容
所有内容均支持中英文双语，通过`zh`和`en`字段区分语言版本。

## 开发说明

### 添加新内容
1. 根据内容类型在对应的JSON文件中添加数据
2. 在`static/`目录下添加相关图片资源
3. 重新构建项目以生成静态页面

### 组件开发
- 使用函数组件和Hooks
- 遵循单一职责原则，保持组件简洁
- 使用TypeScript进行类型检查

### 国际化
- 语言包: `locales/` 目录下的JSON文件
- 语言切换: 通过URL前缀（/zh/或/en/）和localStorage管理
- 翻译函数: 使用`getTranslation`函数获取对应语言文本

## 部署

### Vercel（推荐）
1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 自动部署

### 其他平台
1. 运行 `npm run build`
2. 将 `out/` 目录部署到静态托管服务

## 许可证

MIT License

## 联系方式

- 实验室官网: [待定]
- 邮箱: mdi-lab@university.edu.cn
- GitHub: [待定]
