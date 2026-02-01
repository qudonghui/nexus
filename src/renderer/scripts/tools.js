/**
 * Nexus - Tools Registry and Implementations
 * 工具注册表和实现
 */

// === 工具图标 SVG ===
const Icons = {
  json: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M10 12l2 2 2-2"/>
    <path d="M10 16l2 2 2-2"/>
  </svg>`,
  base64: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M12 18v-6"/>
    <path d="M9 15l3-3 3 3"/>
  </svg>`,
  timestamp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>`,
  color: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="4"/>
    <line x1="21.17" y1="8" x2="12" y2="8"/>
    <line x1="3.95" y1="6.06" x2="8.54" y2="14"/>
    <line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
  </svg>`,
  password: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>`,
  qr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="15" y="15" width="2" height="2"/>
    <rect x="18" y="15" width="2" height="2"/>
    <rect x="15" y="18" width="2" height="2"/>
    <rect x="18" y="18" width="2" height="2"/>
  </svg>`,
  calculator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="16" y1="14" x2="16" y2="14"/>
    <line x1="16" y1="18" x2="16" y2="18"/>
    <line x1="12" y1="14" x2="12" y2="14"/>
    <line x1="12" y1="18" x2="12" y2="18"/>
    <line x1="8" y1="14" x2="8" y2="14"/>
    <line x1="8" y1="18" x2="8" y2="18"/>
  </svg>`,
  unit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>`
};

// === JSON 格式化工具 ===
const jsonTool = {
  id: 'json-formatter',
  name: 'JSON 格式化',
  description: '格式化、压缩和验证 JSON 数据',
  category: 'developer',
  icon: Icons.json,
  keywords: ['json', 'format', 'beautify', 'minify', 'validate'],
  init: function() {
    console.log('JSON tool init called');
    this.input = document.getElementById('jsonInput');
    this.output = document.getElementById('jsonOutput');
    this.formatBtn = document.getElementById('formatJson');
    this.minifyBtn = document.getElementById('minifyJson');
    this.validateBtn = document.getElementById('validateJson');
    this.copyBtn = document.getElementById('copyJson');
    this.clearBtn = document.getElementById('clearJson');

    console.log('Elements found:', {
      input: !!this.input,
      output: !!this.output,
      formatBtn: !!this.formatBtn
    });

    if (this.formatBtn) {
      this.formatBtn.addEventListener('click', () => this.format());
    }
    if (this.minifyBtn) {
      this.minifyBtn.addEventListener('click', () => this.minify());
    }
    if (this.validateBtn) {
      this.validateBtn.addEventListener('click', () => this.validate());
    }
    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => this.copy());
    }
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clear());
    }
  },
  format: function() {
    console.log('format called, input:', this.input?.value);
    try {
      const json = JSON.parse(this.input.value);
      console.log('parsed json:', json);
      this.output.innerHTML = this.syntaxHighlight(json);
    } catch (e) {
      console.error('JSON parse error:', e);
      this.showToast('无效的 JSON: ' + e.message, 'error');
    }
  },
  minify: function() {
    try {
      const json = JSON.parse(this.input.value);
      this.output.textContent = JSON.stringify(json);
    } catch (e) {
      this.showToast('无效的 JSON: ' + e.message, 'error');
    }
  },
  validate: function() {
    try {
      JSON.parse(this.input.value);
      this.showToast('JSON 格式正确', 'success');
    } catch (e) {
      this.showToast('无效的 JSON: ' + e.message, 'error');
    }
  },
  copy: function() {
    navigator.clipboard.writeText(this.output.textContent);
    this.showToast('已复制到剪贴板', 'success');
  },
  clear: function() {
    this.input.value = '';
    this.output.innerHTML = '';
  },
  syntaxHighlight: function(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  },
  showToast: function(message, type) {
    // 简单提示
    alert(message);
  },
  component: `
    <div class="tool-container">
      <div class="json-tool">
        <div class="json-input-area">
          <div class="tool-section">
            <div class="tool-section-title">输入 JSON</div>
            <textarea id="jsonInput" class="textarea json-editor" placeholder="输入或粘贴 JSON 数据..."></textarea>
            <div class="json-toolbar">
              <button id="formatJson" class="btn btn-primary">格式化</button>
              <button id="minifyJson" class="btn">压缩</button>
              <button id="validateJson" class="btn">验证</button>
              <button id="clearJson" class="btn btn-danger">清空</button>
            </div>
          </div>
        </div>
        <div class="json-output-area">
          <div class="tool-section">
            <div class="tool-section-title">输出结果</div>
            <div id="jsonOutput" class="json-output"></div>
            <div class="json-toolbar">
              <button id="copyJson" class="btn">复制</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// === Base64 编解码工具 ===
const base64Tool = {
  id: 'base64-encoder',
  name: 'Base64 编解码',
  description: 'Base64 编码和解码文本',
  category: 'developer',
  icon: Icons.base64,
  keywords: ['base64', 'encode', 'decode', '编码', '解码'],
  init: function() {
    this.input = document.getElementById('base64Input');
    this.output = document.getElementById('base64Output');
    this.encodeBtn = document.getElementById('encodeBase64');
    this.decodeBtn = document.getElementById('decodeBase64');
    this.copyBtn = document.getElementById('copyBase64');
    this.clearBtn = document.getElementById('clearBase64');

    this.encodeBtn?.addEventListener('click', () => this.encode());
    this.decodeBtn?.addEventListener('click', () => this.decode());
    this.copyBtn?.addEventListener('click', () => this.copy());
    this.clearBtn?.addEventListener('click', () => this.clear());
  },
  encode: function() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(this.input.value)));
      this.output.value = encoded;
    } catch (e) {
      this.showToast('编码失败: ' + e.message, 'error');
    }
  },
  decode: function() {
    try {
      const decoded = decodeURIComponent(escape(atob(this.input.value)));
      this.output.value = decoded;
    } catch (e) {
      this.showToast('解码失败: 无效的 Base64 字符串', 'error');
    }
  },
  copy: function() {
    navigator.clipboard.writeText(this.output.value);
    this.showToast('已复制到剪贴板', 'success');
  },
  clear: function() {
    this.input.value = '';
    this.output.value = '';
  },
  showToast: function(message, type) {
    alert(message);
  },
  component: `
    <div class="tool-container">
      <div class="base64-tool">
        <div class="tool-section">
          <div class="tool-section-title">输入文本</div>
          <textarea id="base64Input" class="textarea base64-editor" placeholder="输入需要编码或解码的文本..."></textarea>
        </div>
        <div class="tool-row">
          <button id="encodeBase64" class="btn btn-primary">编码</button>
          <button id="decodeBase64" class="btn btn-primary">解码</button>
          <button id="clearBase64" class="btn btn-danger">清空</button>
        </div>
        <div class="tool-section">
          <div class="tool-section-title">输出结果</div>
          <textarea id="base64Output" class="textarea base64-result" readonly></textarea>
          <button id="copyBase64" class="btn" style="margin-top: 8px;">复制</button>
        </div>
      </div>
    </div>
  `
};

// === 时间戳转换工具 ===
const timestampTool = {
  id: 'timestamp-converter',
  name: '时间戳转换',
  description: 'Unix 时间戳与日期时间相互转换',
  category: 'developer',
  icon: Icons.timestamp,
  keywords: ['timestamp', 'unix', 'datetime', '时间戳', '日期'],
  init: function() {
    this.currentTimeSec = document.getElementById('currentTimeSec');
    this.currentTimeMs = document.getElementById('currentTimeMs');
    this.timestampInput = document.getElementById('timestampInput');
    this.datetimeInput = document.getElementById('datetimeInput');
    this.convertToDatetime = document.getElementById('convertToDatetime');
    this.convertToTimestamp = document.getElementById('convertToTimestamp');
    this.nowBtn = document.getElementById('nowTimestamp');
    this.copyCurrentBtn = document.getElementById('copyCurrentTimestamp');

    this.updateCurrentTime();
    this.interval = setInterval(() => this.updateCurrentTime(), 100);

    this.convertToDatetime?.addEventListener('click', () => this.tsToDatetime());
    this.convertToTimestamp?.addEventListener('click', () => this.datetimeToTs());
    this.nowBtn?.addEventListener('click', () => {
      const now = Date.now();
      this.timestampInput.value = now;
      this.tsToDatetime();
    });
    this.copyCurrentBtn?.addEventListener('click', () => {
      const val = this.currentTimeMs?.textContent || '';
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          alert('已复制毫秒级时间戳');
        }).catch(() => {
          alert('复制失败');
        });
      }
    });
  },
  cleanup: function() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  updateCurrentTime: function() {
    const nowMs = Date.now();
    const nowSec = Math.floor(nowMs / 1000);
    if (this.currentTimeSec) {
      this.currentTimeSec.textContent = nowSec;
    }
    if (this.currentTimeMs) {
      this.currentTimeMs.textContent = nowMs;
    }
  },
  tsToDatetime: function() {
    const raw = (this.timestampInput.value || '').trim();
    const ts = parseInt(raw, 10);
    if (isNaN(ts)) {
      alert('无效的时间戳');
      return;
    }
    const ms = (ts > 1e12 || raw.length >= 13) ? ts : ts * 1000;
    // 中国时区显示：UTC+8
    const cstMs = ms + 8 * 60 * 60 * 1000;
    const str = new Date(cstMs).toISOString().slice(0, 19).replace('T', ' ');
    this.datetimeInput.value = str;
  },
  datetimeToTs: function() {
    const datetime = (this.datetimeInput.value || '').trim();
    if (!datetime) {
      alert('请输入日期时间');
      return;
    }
    // 期待格式：YYYY-MM-DD HH:mm:ss （中国时区）
    const parts = datetime.split(' ');
    if (parts.length !== 2) {
      alert('无效的日期时间格式');
      return;
    }
    const [datePart, timePart] = parts;
    const [year, month, day] = datePart.split('-').map(n => parseInt(n, 10));
    const [hour, minute, second] = timePart.split(':').map(n => parseInt(n, 10));
    if ([year, month, day, hour, minute, second].some(n => isNaN(n))) {
      alert('无效的日期时间数值');
      return;
    }
    // 将中国时区(UTC+8)转换为UTC毫秒时间戳
    const utcMs = Date.UTC(year, (month - 1), day, (hour - 8), minute, second);
    this.timestampInput.value = utcMs;
  },
  component: `
    <div class="tool-container">
      <div class="timestamp-tool">
        <div class="tool-section">
          <div class="tool-section-title">当前时间戳</div>
          <div class="timestamp-display" style="display:flex; align-items:center; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="tool-input-label">秒级 (10位)</span>
              <div class="timestamp-value" id="currentTimeSec">-</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="tool-input-label">毫秒级 (13位)</span>
              <div class="timestamp-value" id="currentTimeMs">-</div>
              <button id="copyCurrentTimestamp" class="btn">复制毫秒</button>
            </div>
          </div>
        </div>
        <div class="tool-section">
          <div class="tool-section-title">时间戳转换</div>
          <div class="timestamp-converter">
            <div class="tool-input-group">
              <label class="tool-input-label">Unix 时间戳</label>
              <input type="number" id="timestampInput" class="input" placeholder="输入时间戳">
            </div>
            <div class="timestamp-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
            <div class="tool-input-group">
              <label class="tool-input-label">日期时间</label>
              <input type="text" id="datetimeInput" class="input" placeholder="YYYY-MM-DD HH:mm:ss（中国时区）">
            </div>
          </div>
          <div class="tool-row" style="margin-top: 16px;">
            <button id="convertToDatetime" class="btn btn-primary">→ 日期时间</button>
            <button id="convertToTimestamp" class="btn btn-primary">→ 时间戳</button>
            <button id="nowTimestamp" class="btn">当前</button>
          </div>
        </div>
      </div>
    </div>
  `
};

// === 颜色选择器工具 ===
const colorTool = {
  id: 'color-picker',
  name: '颜色选择器',
  description: '选择颜色并获取各种格式',
  category: 'design',
  icon: Icons.color,
  keywords: ['color', 'hex', 'rgb', 'hsl', '颜色'],
  init: function() {
    this.colorPicker = document.getElementById('colorPicker');
    this.colorSwatch = document.getElementById('colorSwatch');
    this.hexInput = document.getElementById('hexValue');
    this.rgbInput = document.getElementById('rgbValue');
    this.hslInput = document.getElementById('hslValue');

    this.colorPicker?.addEventListener('input', () => this.updateFromPicker());
  },
  updateFromPicker: function() {
    const color = this.colorPicker.value;
    this.colorSwatch.style.background = color;
    this.hexInput.value = color.toUpperCase();
    this.rgbInput.value = this.hexToRgb(color);
  },
  hexToRgb: function(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  },
  component: `
    <div class="tool-container">
      <div class="color-tool">
        <div class="tool-section">
          <div class="tool-section-title">颜色选择</div>
          <div class="color-preview">
            <div id="colorSwatch" class="color-swatch" style="background: #89b4fa;"></div>
            <div class="color-picker-wrapper">
              <label class="tool-input-label">选择颜色</label>
              <input type="color" id="colorPicker" class="input" value="#89b4fa" style="height: 40px;">
            </div>
          </div>
        </div>
        <div class="tool-section">
          <div class="tool-section-title">颜色值</div>
          <div class="color-values">
            <div class="color-value-item">
              <label class="color-value-label">HEX</label>
              <div class="color-value-input">
                <input type="text" id="hexValue" class="input" value="#89B4FA" readonly>
              </div>
            </div>
            <div class="color-value-item">
              <label class="color-value-label">RGB</label>
              <div class="color-value-input">
                <input type="text" id="rgbValue" class="input" value="rgb(137, 180, 250)" readonly>
              </div>
            </div>
            <div class="color-value-item">
              <label class="color-value-label">HSL</label>
              <div class="color-value-input">
                <input type="text" id="hslValue" class="input" value="hsl(219, 92%, 76%)" readonly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// === 密码生成器工具 ===
const passwordTool = {
  id: 'password-generator',
  name: '密码生成器',
  description: '生成安全的随机密码',
  category: 'security',
  icon: Icons.password,
  keywords: ['password', 'generator', 'random', '密码'],
  init: function() {
    this.passwordDisplay = document.getElementById('passwordDisplay');
    this.lengthSlider = document.getElementById('passwordLength');
    this.lengthValue = document.getElementById('lengthValue');
    this.uppercase = document.getElementById('uppercase');
    this.lowercase = document.getElementById('lowercase');
    this.numbers = document.getElementById('numbers');
    this.symbols = document.getElementById('symbols');
    this.generateBtn = document.getElementById('generatePassword');
    this.copyBtn = document.getElementById('copyPassword');

    this.generateBtn?.addEventListener('click', () => this.generate());
    this.copyBtn?.addEventListener('click', () => this.copy());
    this.lengthSlider?.addEventListener('input', (e) => {
      this.lengthValue.textContent = e.target.value;
    });

    this.generate();
  },
  generate: function() {
    const length = parseInt(this.lengthSlider.value);
    const useUpper = this.uppercase.checked;
    const useLower = this.lowercase.checked;
    const useNumbers = this.numbers.checked;
    const useSymbols = this.symbols.checked;

    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') {
      alert('请至少选择一种字符类型');
      return;
    }

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }

    this.passwordDisplay.value = password;
  },
  copy: function() {
    navigator.clipboard.writeText(this.passwordDisplay.value);
    alert('密码已复制到剪贴板');
  },
  component: `
    <div class="tool-container">
      <div class="password-tool">
        <div class="tool-section">
          <div class="tool-section-title">生成的密码</div>
          <div class="password-display">
            <input type="text" id="passwordDisplay" class="input" readonly>
            <button id="copyPassword" class="btn">复制</button>
          </div>
        </div>
        <div class="tool-section">
          <div class="tool-section-title">密码设置</div>
          <div class="password-settings">
            <div class="password-length">
              <div class="password-length-display">
                <span>长度</span>
                <span class="password-length-value" id="lengthValue">16</span>
              </div>
              <input type="range" id="passwordLength" class="slider-input" min="8" max="64" value="16">
            </div>
            <div class="password-options">
              <label class="checkbox">
                <input type="checkbox" id="uppercase" class="checkbox-input" checked>
                <span class="checkbox-box"></span>
                <span class="checkbox-label">大写字母 (A-Z)</span>
              </label>
              <label class="checkbox">
                <input type="checkbox" id="lowercase" class="checkbox-input" checked>
                <span class="checkbox-box"></span>
                <span class="checkbox-label">小写字母 (a-z)</span>
              </label>
              <label class="checkbox">
                <input type="checkbox" id="numbers" class="checkbox-input" checked>
                <span class="checkbox-box"></span>
                <span class="checkbox-label">数字 (0-9)</span>
              </label>
              <label class="checkbox">
                <input type="checkbox" id="symbols" class="checkbox-input" checked>
                <span class="checkbox-box"></span>
                <span class="checkbox-label">符号 (!@#$%)</span>
              </label>
            </div>
          </div>
          <button id="generatePassword" class="btn btn-primary" style="margin-top: 16px; width: 100%;">生成新密码</button>
        </div>
      </div>
    </div>
  `
};

// === QR 码生成工具 ===
const qrTool = {
  id: 'qr-generator',
  name: 'QR 码生成',
  description: '生成文本或链接的 QR 码',
  category: 'design',
  icon: Icons.qr,
  keywords: ['qr', 'qrcode', '二维码'],
  init: function() {
    this.input = document.getElementById('qrInput');
    this.canvas = document.getElementById('qrCanvas');
    this.generateBtn = document.getElementById('generateQr');
    this.downloadBtn = document.getElementById('downloadQr');

    this.generateBtn?.addEventListener('click', () => this.generate());
    this.downloadBtn?.addEventListener('click', () => this.download());

    // 初始生成一个示例
    this.generate();
  },
  generate: function() {
    const text = this.input.value || 'https://example.com';
    // 简单的 QR 码占位符（实际应使用 QR 库）
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QR Code Generator', 100, 95);
    ctx.fillText('(需要 QR 库)', 100, 115);
  },
  download: function() {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = this.canvas.toDataURL();
    link.click();
  },
  component: `
    <div class="tool-container">
      <div class="qr-tool">
        <div class="tool-section">
          <div class="tool-section-title">输入内容</div>
          <textarea id="qrInput" class="textarea qr-input" placeholder="输入文本或链接...">https://example.com</textarea>
        </div>
        <div class="tool-section">
          <div class="tool-section-title">QR 码预览</div>
          <div class="qr-preview">
            <canvas id="qrCanvas" class="qr-canvas" width="200" height="200"></canvas>
            <div class="qr-actions">
              <button id="generateQr" class="btn btn-primary">生成</button>
              <button id="downloadQr" class="btn">下载</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

// === 计算器工具 ===
const calculatorTool = {
  id: 'calculator',
  name: '计算器',
  description: '简单的四则运算计算器',
  category: 'math',
  icon: Icons.calculator,
  keywords: ['calculator', '计算器', 'math', '数学'],
  init: function() {
    this.expression = document.getElementById('calcExpression');
    this.result = document.getElementById('calcResult');
    this.currentInput = '';
    this.shouldReset = false;

    const buttons = document.querySelectorAll('.calc-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => this.handleInput(btn));
    });
  },
  handleInput: function(btn) {
    const value = btn.textContent;

    if (btn.classList.contains('clear')) {
      this.currentInput = '';
      this.updateDisplay('', '');
      return;
    }

    if (btn.classList.contains('equals')) {
      try {
        const result = eval(this.currentInput.replace(/×/g, '*').replace(/÷/g, '/'));
        this.updateDisplay(this.currentInput, result);
        this.currentInput = result.toString();
        this.shouldReset = true;
      } catch (e) {
        this.updateDisplay(this.currentInput, 'Error');
        this.currentInput = '';
      }
      return;
    }

    if (this.shouldReset && !isNaN(parseInt(value))) {
      this.currentInput = value;
      this.shouldReset = false;
    } else {
      this.currentInput += value;
      this.shouldReset = false;
    }

    this.updateDisplay(this.currentInput, '');
  },
  updateDisplay: function(expr, res) {
    this.expression.textContent = expr;
    this.result.textContent = res;
  },
  component: `
    <div class="tool-container">
      <div class="calculator-tool">
        <div class="calculator-display">
          <div id="calcExpression" class="calculator-expression"></div>
          <div id="calcResult" class="calculator-result">0</div>
        </div>
        <div class="calculator-buttons">
          <button class="calc-btn clear">C</button>
          <button class="calc-btn operator">÷</button>
          <button class="calc-btn operator">×</button>
          <button class="calc-btn operator">−</button>
          <button class="calc-btn">7</button>
          <button class="calc-btn">8</button>
          <button class="calc-btn">9</button>
          <button class="calc-btn operator calc-span-2">+</button>
          <button class="calc-btn">4</button>
          <button class="calc-btn">5</button>
          <button class="calc-btn">6</button>
          <button class="calc-btn">1</button>
          <button class="calc-btn">2</button>
          <button class="calc-btn">3</button>
          <button class="calc-btn equals calc-span-2">=</button>
          <button class="calc-btn calc-span-2">0</button>
          <button class="calc-btn">.</button>
        </div>
      </div>
    </div>
  `
};

// === 单位转换工具 ===
const unitTool = {
  id: 'unit-converter',
  name: '单位转换',
  description: '长度、重量、温度等单位转换',
  category: 'math',
  icon: Icons.unit,
  keywords: ['unit', 'converter', 'length', 'weight', '单位'],
  init: function() {
    this.inputValue = document.getElementById('unitInput');
    this.outputValue = document.getElementById('unitOutput');
    this.fromUnit = document.getElementById('fromUnit');
    this.toUnit = document.getElementById('toUnit');
    this.convertBtn = document.getElementById('convertUnits');

    this.convertBtn?.addEventListener('click', () => this.convert());

    // 示例：长度转换
    this.conversions = {
      'm': 1,
      'km': 1000,
      'cm': 0.01,
      'mm': 0.001,
      'mi': 1609.344,
      'ft': 0.3048,
      'in': 0.0254
    };
  },
  convert: function() {
    const value = parseFloat(this.inputValue.value);
    const from = this.fromUnit.value;
    const to = this.toUnit.value;

    if (isNaN(value)) {
      alert('请输入有效的数值');
      return;
    }

    const meters = value * this.conversions[from];
    const result = meters / this.conversions[to];
    this.outputValue.value = result.toFixed(6);
  },
  component: `
    <div class="tool-container">
      <div class="unit-tool">
        <div class="tool-section">
          <div class="tool-section-title">长度转换</div>
          <div class="unit-converter">
            <div class="unit-input-group">
              <label class="unit-input-label">从</label>
              <input type="number" id="unitInput" class="input" placeholder="输入数值" step="any">
              <select id="fromUnit" class="select">
                <option value="m">米 (m)</option>
                <option value="km">千米 (km)</option>
                <option value="cm">厘米 (cm)</option>
                <option value="mm">毫米 (mm)</option>
                <option value="mi">英里 (mi)</option>
                <option value="ft">英尺 (ft)</option>
                <option value="in">英寸 (in)</option>
              </select>
            </div>
            <div class="unit-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
            <div class="unit-input-group">
              <label class="unit-input-label">到</label>
              <input type="number" id="unitOutput" class="input" readonly step="any">
              <select id="toUnit" class="select">
                <option value="m">米 (m)</option>
                <option value="km">千米 (km)</option>
                <option value="cm">厘米 (cm)</option>
                <option value="mm">毫米 (mm)</option>
                <option value="mi">英里 (mi)</option>
                <option value="ft">英尺 (ft)</option>
                <option value="in">英寸 (in)</option>
              </select>
            </div>
          </div>
          <button id="convertUnits" class="btn btn-primary" style="margin-top: 16px; width: 100%;">转换</button>
        </div>
      </div>
    </div>
  `
};

const yamlPropertiesTool = {
  id: 'yaml-properties-converter',
  name: 'YAML/Properties 互转',
  description: '自动检测输入格式并在 YAML 与 Properties 之间转换',
  category: 'developer',
  icon: Icons.json,
  keywords: ['yaml', 'yml', 'properties', '转换'],
  init: function() {
    this.inputEl = document.getElementById('yamlPropsInput');
    this.outputEl = document.getElementById('yamlPropsOutput');
    this.convertBtn = document.getElementById('convertYamlProps');
    this.copyBtn = document.getElementById('copyYamlProps');

    this.convertBtn?.addEventListener('click', () => this.convert());
    this.copyBtn?.addEventListener('click', () => this.copy());
  },
  detectFormat: function(text) {
    const t = (text || '').trim();
    const eqLines = (t.match(/^[^#\n\r][^=\n\r]+=[^\n\r]*$/gm) || []).length;
    const colonLines = (t.match(/^[^#\n\r][ \t]*[A-Za-z0-9_.-]+:[^\n\r]*$/gm) || []).length;
    if (/^\s*---/.test(t)) return 'yaml';
    if (eqLines > 0 && eqLines >= colonLines) return 'properties';
    const indentedYaml = (t.match(/^\s{2,}[A-Za-z0-9_.-]+:\s*.*$/gm) || []).length;
    if (indentedYaml > 0 || colonLines > 0) return 'yaml';
    return 'properties';
  },
  convert: function() {
    const text = this.inputEl.value;
    if (!text || !text.trim()) {
      alert('请输入内容');
      return;
    }
    const fmt = this.detectFormat(text);
    try {
      if (fmt === 'yaml') {
        const obj = this.parseYamlSimple(text);
        const props = this.flattenToProperties(obj);
        this.outputEl.value = props;
      } else {
        const obj = this.parseProperties(text);
        const yaml = this.objectToYaml(obj);
        this.outputEl.value = yaml;
      }
    } catch (e) {
      alert('转换失败：' + (e?.message || e));
    }
  },
  copy: function() {
    const res = this.outputEl.value || '';
    if (!res) {
      alert('没有可复制的结果');
      return;
    }
    navigator.clipboard.writeText(res).then(() => {
      alert('已复制输出结果');
    }).catch(() => {
      alert('复制失败');
    });
  },
  parseYamlSimple: function(yaml) {
    const lines = yaml.split(/\r?\n/);
    const root = {};
    const stack = [{ indent: -1, obj: root }];
    const keyRe = /^(\s*)([A-Za-z0-9_.-]+):\s*(.*)$/;
    for (let line of lines) {
      if (!line.trim() || line.trim().startsWith('#')) continue;
      const m = line.match(keyRe);
      if (!m) continue;
      const indent = m[1].length;
      const key = m[2];
      const valStr = m[3];
      while (stack.length && indent <= stack[stack.length - 1].indent) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].obj;
      if (valStr === '' || typeof valStr === 'undefined') {
        parent[key] = {};
        stack.push({ indent, obj: parent[key] });
      } else {
        parent[key] = valStr;
      }
    }
    return root;
  },
  flattenToProperties: function(obj, prefix = '') {
    const lines = [];
    const walk = (o, pre) => {
      for (const k of Object.keys(o)) {
        const v = o[k];
        const p = pre ? `${pre}.${k}` : k;
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          walk(v, p);
        } else {
          lines.push(`${p}=${v}`);
        }
      }
    };
    walk(obj, prefix);
    return lines.join('\n');
  },
  parseProperties: function(text) {
    const root = {};
    const lines = text.split(/\r?\n/);
    for (let line of lines) {
      const s = line.trim();
      if (!s || s.startsWith('#') || s.startsWith('!')) continue;
      let idx = s.indexOf('=');
      if (idx < 0) idx = s.indexOf(':');
      if (idx < 0) continue;
      const key = s.slice(0, idx).trim();
      const val = s.slice(idx + 1).trim();
      const parts = key.split('.');
      let cur = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = val;
    }
    return root;
  },
  objectToYaml: function(obj, indent = 0) {
    const spaces = ' '.repeat(indent);
    const lines = [];
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        lines.push(`${spaces}${k}:`);
        lines.push(this.objectToYaml(v, indent + 2));
      } else {
        lines.push(`${spaces}${k}: ${v}`);
      }
    }
    return lines.join('\n');
  },
  component: `
    <div class="tool-container">
      <div class="yaml-props-tool">
        <div class="tool-section">
          <div class="tool-section-title">输入</div>
          <textarea id="yamlPropsInput" class="textarea" placeholder="输入 YAML 或 Properties 内容..."></textarea>
        </div>
        <div class="tool-row">
          <button id="convertYamlProps" class="btn btn-primary">转换</button>
          <button id="copyYamlProps" class="btn">复制结果</button>
        </div>
        <div class="tool-section">
          <div class="tool-section-title">输出结果</div>
          <textarea id="yamlPropsOutput" class="textarea" readonly></textarea>
        </div>
      </div>
    </div>
  `
};

// === 注册所有工具 ===
const tools = [
  jsonTool,
  base64Tool,
  yamlPropertiesTool,
  timestampTool,
  colorTool,
  passwordTool,
  qrTool,
  calculatorTool,
  unitTool
];

// 将工具注册到 ToolRegistry
tools.forEach(tool => {
  ToolRegistry.register(tool.id, tool);
});

console.log(`Registered ${tools.length} tools`);

const imageBase64Tool = {
  id: 'image-base64-converter',
  name: '图片/Base64 转换',
  description: '在图片与 Base64 之间相互转换',
  category: 'developer',
  icon: Icons.base64,
  keywords: ['base64', 'image', '图片', 'data url', 'convert'],
  init: function() {
    // 图片 → Base64
    this.imageFileInput = document.getElementById('imageFileInput');
    this.imagePreview = document.getElementById('imagePreview');
    this.convertImageToBase64Btn = document.getElementById('convertImageToBase64');
    this.imageBase64Output = document.getElementById('imageBase64Output');
    this.copyImageBase64Btn = document.getElementById('copyImageBase64');
    this.clearImageBase64Btn = document.getElementById('clearImageBase64');

    // Base64 → 图片
    this.base64ImageInput = document.getElementById('base64ImageInput');
    this.base64ImagePreview = document.getElementById('base64ImagePreview');
    this.convertBase64ToImageBtn = document.getElementById('convertBase64ToImage');
    this.downloadBase64ImageBtn = document.getElementById('downloadBase64Image');
    this.clearBase64ImageBtn = document.getElementById('clearBase64Image');

    this.imageFileInput?.addEventListener('change', () => {
      const file = this.imageFileInput.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      this.imagePreview.src = url;
    });

    this.convertImageToBase64Btn?.addEventListener('click', () => {
      const file = this.imageFileInput?.files?.[0];
      if (!file) {
        this.showToast('请先选择图片文件', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        this.imageBase64Output.value = dataUrl;
        this.imagePreview.src = dataUrl;
      };
      reader.onerror = () => this.showToast('读取图片失败', 'error');
      reader.readAsDataURL(file);
    });

    this.copyImageBase64Btn?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(this.imageBase64Output.value || '');
        this.showToast('已复制 Base64 到剪贴板', 'success');
      } catch (e) {
        this.showToast('复制失败: ' + e.message, 'error');
      }
    });

    this.clearImageBase64Btn?.addEventListener('click', () => {
      if (this.imageFileInput) this.imageFileInput.value = '';
      if (this.imagePreview) this.imagePreview.src = '';
      if (this.imageBase64Output) this.imageBase64Output.value = '';
    });

    this.convertBase64ToImageBtn?.addEventListener('click', () => {
      const input = (this.base64ImageInput?.value || '').trim();
      if (!input) {
        this.showToast('请粘贴图片的 Base64 字符串', 'error');
        return;
      }
      const dataUrl = this.ensureDataUrl(input);
      this.base64ImagePreview.src = dataUrl;
    });

    this.downloadBase64ImageBtn?.addEventListener('click', () => {
      const src = this.base64ImagePreview?.src || '';
      if (!src) {
        this.showToast('请先转换并预览图片', 'error');
        return;
      }
      const link = document.createElement('a');
      link.href = src;
      link.download = 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    this.clearBase64ImageBtn?.addEventListener('click', () => {
      if (this.base64ImageInput) this.base64ImageInput.value = '';
      if (this.base64ImagePreview) this.base64ImagePreview.src = '';
    });
  },
  ensureDataUrl: function(input) {
    // 支持 data URL 或纯 Base64，两者都能正确预览
    if (/^data:image\//i.test(input)) {
      return input;
    }
    // 默认使用 PNG 格式
    return `data:image/png;base64,${input}`;
  },
  showToast: function(message, type) {
    alert(message);
  },
  component: `
    <div class="tool-container">
      <div class="image-base64-tool" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="tool-section">
          <div class="tool-section-title">图片 → Base64</div>
          <input type="file" id="imageFileInput" class="input" accept="image/*">
          <div style="margin-top: 12px;">
            <img id="imagePreview" style="max-width: 100%; border-radius: var(--radius-md); background: white;" />
          </div>
          <div class="tool-row" style="margin-top: 12px;">
            <button id="convertImageToBase64" class="btn btn-primary">转换为 Base64</button>
            <button id="clearImageBase64" class="btn btn-danger">清空</button>
          </div>
          <div class="tool-section" style="margin-top: 12px;">
            <div class="tool-section-title">Base64 输出</div>
            <textarea id="imageBase64Output" class="textarea" readonly></textarea>
            <button id="copyImageBase64" class="btn" style="margin-top: 8px;">复制</button>
          </div>
        </div>
        <div class="tool-section">
          <div class="tool-section-title">Base64 → 图片</div>
          <textarea id="base64ImageInput" class="textarea" placeholder="粘贴图片的 Base64（可为 data URL 或纯 Base64）..."></textarea>
          <div class="tool-row" style="margin-top: 12px;">
            <button id="convertBase64ToImage" class="btn btn-primary">转换为图片</button>
            <button id="clearBase64Image" class="btn btn-danger">清空</button>
          </div>
          <div style="margin-top: 12px;">
            <img id="base64ImagePreview" style="max-width: 100%; border-radius: var(--radius-md); background: white;" />
          </div>
          <button id="downloadBase64Image" class="btn" style="margin-top: 8px;">下载图片</button>
        </div>
      </div>
    </div>
  `
};

// 定义完后注册到 ToolRegistry
ToolRegistry.register(imageBase64Tool.id, imageBase64Tool);
