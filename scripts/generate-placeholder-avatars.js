const fs = require('fs');
const path = require('path');

// 创建占位符头像的SVG内容
function createPlaceholderAvatar(name, initials) {
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#grad)" rx="100"/>
    <text x="100" y="100" font-family="Arial, sans-serif" font-size="60" font-weight="bold" 
          text-anchor="middle" dominant-baseline="middle" fill="white">${initials}</text>
    <text x="100" y="140" font-family="Arial, sans-serif" font-size="16" 
          text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.8">${name}</text>
  </svg>`;
}

// 需要生成的占位符头像 - 基于people-data.json中没有头像的成员
const avatars = [
  // 当前成员
  { name: 'chen-cao', initials: 'CC' },
  { name: 'zhao-chen', initials: 'ZC' },
  { name: 'maocheng-li', initials: 'ML' },
  { name: 'linrui-li', initials: 'LL' },
  { name: 'haiqi-lin', initials: 'HL' },
  { name: 'songyue-guo', initials: 'SG' },
  { name: 'jiale-gu', initials: 'JG' },
  { name: 'qizheng-wang', initials: 'QW' },
  { name: 'gerui-wang', initials: 'GW' },
  { name: 'kai-cui', initials: 'KC' },
  { name: 'sixu-he', initials: 'SH' },
  { name: 'tianyu-wang', initials: 'TW' },
  { name: 'ruowei-mi', initials: 'RM' },
  { name: 'yonggang-nie', initials: 'YN' },
  { name: 'yuan-chen', initials: 'YC' },
  // 过往成员
  { name: 'yang-wu', initials: 'YW' },
  { name: 'shishun-fan', initials: 'SF' },
  { name: 'jiaxian-miao', initials: 'JM' },
  { name: 'shuyan-ruan', initials: 'SR' },
  { name: 'yonghao-si', initials: 'YS' },
  { name: 'dennis-tang', initials: 'DT' },
  { name: 'xiaoyu-wang', initials: 'XW' },
  { name: 'wenjing-qi', initials: 'WQ' },
  { name: 'wenshuo-zhang', initials: 'WZ' },
  { name: 'ke-nan', initials: 'KN' },
];

// 确保目录存在
const peopleDir = path.join(__dirname, '../static/website/images/people');
if (!fs.existsSync(peopleDir)) {
  fs.mkdirSync(peopleDir, { recursive: true });
}

// 生成所有占位符头像
avatars.forEach(avatar => {
  const svgContent = createPlaceholderAvatar(avatar.name, avatar.initials);
  const filePath = path.join(peopleDir, `${avatar.name}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Generated placeholder avatar: ${filePath}`);
});

console.log('All placeholder avatars generated successfully!');
