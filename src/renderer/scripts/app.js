/**
 * Nexus - Main Application Script
 * 应用主逻辑脚本
 */

class NexusApp {
  constructor() {
    this.currentCategory = 'all';
    this.currentTool = null;
    this.searchQuery = '';
    this.tools = [];
    this.recentTools = [];

    this.init();
  }

  /**
   * 初始化应用
   */
  async init() {
    console.log('Nexus app initializing...');

    // 获取应用版本
    await this.loadAppVersion();

    // 加载最近使用的工具
    await this.loadRecentTools();

    // 初始化事件监听
    this.initEventListeners();

    console.log('Nexus app initialized');
  }

  /**
   * 加载应用版本
   */
  async loadAppVersion() {
    try {
      const version = await nexusAPI.getAppVersion();
      console.log('Nexus version:', version);
    } catch (error) {
      console.error('Failed to get app version:', error);
    }
  }

  /**
   * 加载最近使用的工具
   */
  async loadRecentTools() {
    try {
      const stored = await nexusAPI.store.get('recentTools');
      this.recentTools = stored || [];
      this.renderRecentTools();
    } catch (error) {
      console.error('Failed to load recent tools:', error);
    }
  }

  /**
   * 保存最近使用的工具
   */
  async saveRecentTool(toolId) {
    // 移除已存在的（如果有的话）
    this.recentTools = this.recentTools.filter(id => id !== toolId);

    // 添加到开头
    this.recentTools.unshift(toolId);

    // 限制最多 5 个
    if (this.recentTools.length > 5) {
      this.recentTools = this.recentTools.slice(0, 5);
    }

    // 保存到本地存储
    await nexusAPI.store.set('recentTools', this.recentTools);

    // 重新渲染
    this.renderRecentTools();
  }

  /**
   * 初始化事件监听
   */
  initEventListeners() {
    // 搜索输入
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.filterTools();
      });
    }

    // 分类导航
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        this.setCategory(item.dataset.category);
      });
    });

    // 窗口控制按钮
    document.getElementById('minimizeBtn')?.addEventListener('click', () => {
      nexusAPI.window.minimize();
    });

    document.getElementById('maximizeBtn')?.addEventListener('click', () => {
      nexusAPI.window.maximize();
    });

    document.getElementById('closeBtn')?.addEventListener('click', () => {
      nexusAPI.window.close();
    });

    // 工具面板
    document.getElementById('backBtn')?.addEventListener('click', () => {
      this.hideToolPanel();
    });

    // 收藏按钮
    document.getElementById('favoriteBtn')?.addEventListener('click', () => {
      this.toggleFavorite();
    });
  }

  /**
   * 设置当前分类
   */
  setCategory(category) {
    this.currentCategory = category;

    // 更新分类按钮状态
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      if (item.dataset.category === category) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 过滤工具
    this.filterTools();
  }

  /**
   * 过滤工具
   */
  filterTools() {
    let filteredTools = ToolRegistry.getAll();

    // 按分类过滤
    if (this.currentCategory !== 'all') {
      filteredTools = filteredTools.filter(tool => tool.category === this.currentCategory);
    }

    // 按搜索查询过滤
    if (this.searchQuery) {
      filteredTools = ToolRegistry.search(this.searchQuery);
      if (this.currentCategory !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === this.currentCategory);
      }
    }

    this.renderTools(filteredTools);
  }

  /**
   * 渲染工具列表
   */
  renderTools(tools) {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;

    if (tools.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3 class="empty-state-title">未找到工具</h3>
          <p class="empty-state-description">尝试使用其他关键词搜索</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = tools.map(tool => this.createToolCard(tool)).join('');

    // 添加点击事件
    const toolCards = grid.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
      card.addEventListener('click', () => {
        const toolId = card.dataset.toolId;
        this.openTool(toolId);
      });
    });
  }

  /**
   * 创建工具卡片 HTML
   */
  createToolCard(tool) {
    return `
      <div class="tool-card" data-tool-id="${tool.id}">
        <div class="tool-card-icon">
          ${tool.icon}
        </div>
        <h3 class="tool-card-name">${tool.name}</h3>
        <p class="tool-card-desc">${tool.description}</p>
      </div>
    `;
  }

  /**
   * 渲染最近使用的工具
   */
  renderRecentTools() {
    const container = document.getElementById('recentTools');
    if (!container) return;

    if (this.recentTools.length === 0) {
      container.innerHTML = '<p style="color: var(--color-text-muted); font-size: 13px; padding: var(--spacing-sm);">暂无最近使用</p>';
      return;
    }

    container.innerHTML = this.recentTools.map(toolId => {
      const tool = ToolRegistry.get(toolId);
      if (!tool) return '';
      return `
        <div class="recent-tool-item" data-tool-id="${tool.id}">
          <div class="recent-tool-icon">
            ${tool.icon}
          </div>
          <span class="recent-tool-name">${tool.name}</span>
        </div>
      `;
    }).join('');

    // 添加点击事件
    const recentItems = container.querySelectorAll('.recent-tool-item');
    recentItems.forEach(item => {
      item.addEventListener('click', () => {
        const toolId = item.dataset.toolId;
        this.openTool(toolId);
      });
    });
  }

  /**
   * 打开工具
   */
  openTool(toolId) {
    const tool = ToolRegistry.get(toolId);
    if (!tool) {
      console.error('Tool not found:', toolId);
      return;
    }

    this.currentTool = tool;

    // 保存到最近使用
    this.saveRecentTool(toolId);

    // 更新面板标题
    const panelTitle = document.getElementById('panelTitle');
    if (panelTitle) {
      panelTitle.textContent = tool.name;
    }

    // 更新收藏按钮状态
    this.updateFavoriteButton();

    // 渲染工具内容
    const panelContent = document.getElementById('panelContent');
    if (panelContent) {
      panelContent.innerHTML = tool.component;
    }

    // 初始化工具逻辑
    if (typeof tool.init === 'function') {
      tool.init();
    }

    // 显示工具面板
    this.showToolPanel();
  }

  /**
   * 显示工具面板
   */
  showToolPanel() {
    const panel = document.getElementById('toolPanel');
    if (panel) {
      panel.classList.remove('hidden');
      // 强制重排以触发动画
      panel.offsetHeight;
      panel.classList.add('show');
    }
  }

  /**
   * 隐藏工具面板
   */
  hideToolPanel() {
    const panel = document.getElementById('toolPanel');
    if (panel) {
      panel.classList.remove('show');
      setTimeout(() => {
        panel.classList.add('hidden');
      }, 250);
    }

    // 清理工具
    if (this.currentTool && typeof this.currentTool.cleanup === 'function') {
      this.currentTool.cleanup();
    }

    this.currentTool = null;
  }

  /**
   * 切换收藏状态
   */
  async toggleFavorite() {
    if (!this.currentTool) return;

    const favorites = await nexusAPI.store.get('favorites') || [];
    const toolId = this.currentTool.id;
    const index = favorites.indexOf(toolId);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(toolId);
    }

    await nexusAPI.store.set('favorites', favorites);
    this.updateFavoriteButton();
  }

  /**
   * 更新收藏按钮状态
   */
  async updateFavoriteButton() {
    const btn = document.getElementById('favoriteBtn');
    if (!btn || !this.currentTool) return;

    const favorites = await nexusAPI.store.get('favorites') || [];
    const isFavorite = favorites.includes(this.currentTool.id);

    if (isFavorite) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
}

// 当 DOM 加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  window.app = new NexusApp();
});
