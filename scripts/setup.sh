#!/bin/bash

# MDI实验室官网设置脚本

echo "🚀 开始设置MDI实验室官网..."

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装Node.js (版本 >= 16)"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js版本过低，需要 >= 16，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js版本检查通过: $(node -v)"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"

# 创建必要的目录
echo "📁 创建必要的目录..."
mkdir -p static/images/pages/home
mkdir -p public

# 复制示例图片（如果有的话）
if [ -d "static/images/pages/home" ]; then
    echo "📸 图片目录已创建"
fi

echo "🎉 设置完成！"
echo ""
echo "运行以下命令启动开发服务器："
echo "  npm run dev"
echo ""
echo "然后在浏览器中访问: http://localhost:3000"
echo ""
echo "📝 注意事项："
echo "1. 请将图片文件放在 static/images/pages/home/ 目录下"
echo "2. 编辑 content/pages/home/ 目录下的Markdown文件来修改内容"
echo "3. 如需全屏滚动功能，请获取 @fullpage/react-fullpage 的许可证密钥"
