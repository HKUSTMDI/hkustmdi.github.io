/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 如果您有自定义域名，请替换为您的实际域名
  // 例如: 'https://your-domain.com' 或 'https://username.github.io/your-repo'
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  basePath: '',
  // 如果您部署在子路径下，请设置basePath
  // 例如: '/your-repo' 如果部署在 https://username.github.io/your-repo
  // 如果部署到GitHub Pages，请取消注释下面这行并替换为您的仓库名
  // basePath: '/your-repo-name',
}

module.exports = nextConfig