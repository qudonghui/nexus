/**
 * Nexus - Preload Script
 * 预加载脚本：安全地桥接主进程和渲染进程
 */

const { contextBridge, ipcRenderer } = require('electron');

/**
 * Nexus API 暴露给渲染进程
 * 使用 contextBridge 安全地暴露 API
 */
contextBridge.exposeInMainWorld('nexusAPI', {
  // === 应用信息 ===
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),

  // === 本地存储 ===
  store: {
    get: (key) => ipcRenderer.invoke('store-get', key),
    set: (key, value) => ipcRenderer.invoke('store-set', key, value),
    delete: (key) => ipcRenderer.invoke('store-delete', key),
    clear: () => ipcRenderer.invoke('store-clear')
  },

  // === 窗口控制 ===
  window: {
    minimize: () => ipcRenderer.invoke('window-minimize'),
    maximize: () => ipcRenderer.invoke('window-maximize'),
    close: () => ipcRenderer.invoke('window-close')
  },

  // === 事件监听 ===
  on: (channel, callback) => {
    const validChannels = [
      'app-theme-change',
      'app-locale-change'
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, callback);
    }
  },

  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  }
});

/**
 * 工具注册系统
 * 用于动态注册和管理工具组件
 */
contextBridge.exposeInMainWorld('ToolRegistry', {
  tools: new Map(),

  register: function(name, config) {
    // 存储完整的工具配置对象，以便在渲染层能够调用其方法（如 init/cleanup）
    this.tools.set(name, config);
  },

  get: function(name) {
    return this.tools.get(name);
  },

  getAll: function() {
    return Array.from(this.tools.values());
  },

  getByCategory: function(category) {
    return Array.from(this.tools.values())
      .filter(tool => tool.category === category);
  },

  search: function(query) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tools.values())
      .filter(tool =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        (tool.keywords || []).some(keyword => keyword.toLowerCase().includes(lowerQuery))
      );
  }
});

console.log('Nexus preload script loaded');
