# Nexus - All Tools. Zero Connection.

<div align="center">

![Nexus Logo](resources/icons/toolbox.png)

**一个基于 Electron 的跨平台离线工具桌面应用**

聚合开发者和日常所需的实用工具，完全离线运行，无需网络连接。

[![Node](https://img.shields.io/badge/node-%3E%3D22.16.0-brightgreen.svg)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/electron-%5E37.0.0-blue.svg)](https://www.electronjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

---

## ✨ 核心特性

- ✅ **完全离线** - 所有功能无需网络连接即可使用
- ✅ **跨平台支持** - Windows、macOS、Linux 一键打包
- ✅ **现代化界面** - 暗色主题、流畅动画、响应式设计
- ✅ **模块化架构** - 工具可插拔，易于扩展和维护
- ✅ **安全隔离** - 主进程与渲染进程严格分离
- ✅ **本地存储** - 用户数据完全本地化，隐私安全
- ✅ **高性能** - 原生级性能，启动快速

## 🛠️ 内置工具

### 开发者工具
- JSON 格式化 - 格式化、压缩和验证 JSON 数据
- Base64 编解码 - Base64 编码和解码文本
- 时间戳转换 - Unix 时间戳与日期时间相互转换

### 数学计算
- 计算器 - 简单的四则运算计算器
- 单位转换 - 长度、重量、温度等单位转换

### 设计工具
- 颜色选择器 - 选择颜色并获取各种格式（HEX、RGB、HSL）
- QR 码生成 - 生成文本或链接的 QR 码

### 安全工具
- 密码生成器 - 生成安全的随机密码

## 🚀 快速开始

### 环境要求

- **Node.js**: 22.16.0 或更高版本
- **npm**: 10.0.0 或更高版本
- **操作系统**: Windows 10+, macOS 10.13+, Linux (Ubuntu 18.04+)

### 安装

```bash
# 克隆项目
git clone https://github.com/qudonghui/nexus.git
cd nexus

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发模式
npm run dev

# 或直接启动
npm start
```

### 打包

```bash
# 打包当前平台
npm run build

# 打包 Windows
npm run build:win

# 打包 macOS
npm run build:mac

# 打包 Linux
npm run build:linux
```

打包后的文件将输出到 `dist/` 目录。

## 📁 项目结构

```
nexus/
├── src/
│   ├── main/              # 主进程代码
│   │   └── main.js        # Electron 主进程入口
│   ├── preload/           # 预加载脚本
│   │   └── preload.js     # 安全桥接脚本
│   └── renderer/          # 渲染进程代码
│       ├── index.html     # 应用入口页面
│       ├── styles/        # 样式文件
│       │   ├── main.css
│       │   ├── components.css
│       │   └── tools.css
│       └── scripts/       # JavaScript 脚本
│           ├── app.js     # 应用主逻辑
│           └── tools.js   # 工具定义和实现
├── resources/             # 资源文件
│   └── icons/            # 应用图标
├── build/                # 构建配置
│   └── entitlements.mac.plist
├── dist/                 # 打包输出目录
├── package.json
└── README.md
```

## 🔧 开发指南

### 添加新工具

1. 在 `src/renderer/scripts/tools.js` 中定义新工具：

```javascript
const myTool = {
  id: 'my-tool',
  name: '我的工具',
  description: '工具描述',
  category: 'developer', // developer, math, design, security, text
  icon: Icons.json,
  keywords: ['keyword1', 'keyword2'],
  init: function() {
    // 初始化工具逻辑
  },
  cleanup: function() {
    // 清理资源（可选）
  },
  component: `
    <div class="tool-container">
      <!-- 工具 HTML -->
    </div>
  `
};
```

2. 将工具添加到工具数组并注册：

```javascript
const tools = [
  // ... 其他工具
  myTool
];

tools.forEach(tool => {
  ToolRegistry.register(tool.id, tool);
});
```

### 工具 API

每个工具可以定义以下方法：

- `init()` - 工具初始化时调用
- `cleanup()` - 工具关闭时调用（可选）
- `component` - 工具的 HTML 组件（字符串）

### Nexus API

通过 `nexusAPI` 可以访问以下功能：

```javascript
// 应用信息
await nexusAPI.getAppVersion();
await nexusAPI.getPlatform();

// 本地存储
await nexusAPI.store.get('key');
await nexusAPI.store.set('key', value);
await nexusAPI.store.delete('key');
await nexusAPI.store.clear();

// 窗口控制
nexusAPI.window.minimize();
nexusAPI.window.maximize();
nexusAPI.window.close();
```

## 🔒 安全特性

- **Context Isolation** - 渲染进程与主进程隔离
- **Node Integration Disabled** - 禁用渲染进程的 Node.js 访问
- **Preload Script** - 安全桥接主进程与渲染进程
- **Sandbox Mode** - 启用 Chromium 沙箱
- **Content Security Policy** - 防止 XSS 攻击

## 🎨 主题定制

项目使用 CSS 变量进行主题定制，可以在 `src/renderer/styles/main.css` 中修改：

```css
:root {
  --color-bg-primary: #1e1e2e;
  --color-primary: #89b4fa;
  /* ... 其他变量 */
}
```

## 📦 打包配置

打包配置位于 `package.json` 的 `build` 字段中：

- `appId` - 应用唯一标识
- `productName` - 应用名称
- `directories` - 构建目录配置
- `mac` / `win` / `linux` - 平台特定配置

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目基于 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- [electron-builder](https://www.electron.build/) - 应用打包工具
- [electron-store](https://github.com/sindresorhus/electron-store) - 数据持久化

## 📮 联系方式

- 项目主页: [https://github.com/qudonghui/nexus](https://github.com/qudonghui/nexus)
- 问题反馈: [https://github.com/qudonghui/nexus/issues](https://github.com/qudonghui/nexus/issues)

---

<div align="center">
Made with ❤️ by Nexus Team
</div>
