/**
 * STARK INDUSTRIES // SECURITY PROTOCOL & DIGITAL COPYRIGHT PROTECTION
 * 钢铁侠 3D 独立展台 - 前端轻量无感版权防护套件
 * 
 * 设计目标：
 * 1. 0% 侵入正常渲染管线，不影响 WebGL 60FPS 帧率、模型旋转缩放与手势识别
 * 2. 拦截初级爬虫/普通用户的右键另存为、查看源码与 F12 开发者快捷键
 * 3. 防止第三方通过 iframe 嵌入盗播网站成果 (Frame-Buster)
 * 4. 控制台烙印斯塔克工业赛博全息版权数字水印与作者署名
 */

(function () {
  'use strict';

  // 1. 控制台斯塔克工业高科技版权数字水印
  try {
    const brandStyle = 'color: #00e5ff; font-family: "Courier New", monospace; font-weight: bold; font-size: 11px; text-shadow: 0 0 8px rgba(0,229,255,0.6);';
    const warnStyle = 'color: #f59e0b; font-family: sans-serif; font-size: 11px; font-weight: bold;';
    const banner = `
 ███████╗████████╗ █████╗ ██████╗ ██╗  ██╗
 ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██║ ██╔╝
 ███████╗   ██║   ███████║██████╔╝█████═╝ 
 ╚════██║   ██║   ██╔══██║██╔══██╗██╔═██╗ 
 ███████║   ██║   ██║  ██║██║  ██║██║  ██╗
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
 STARK INDUSTRIES // 3D HOLOGRAPHIC LAB
 ================================================================
 [CLASSIFIED] PROTOCOL: MARK I - LXXXV HOLOGRAPHIC ARMORS
 AUTHOR & ARCHITECT: Fox-OS
 COPYRIGHT © 2026 STARK INDUSTRIES LAB. ALL RIGHTS RESERVED.
 提示：本项目所有 3D 模型拓扑、着色器与全息交互界面均受版权保护。
 未经授权严禁爬取、逆向工程或转存用于商业用途。
 ================================================================`;
    console.log(`%c${banner}`, brandStyle);
    console.log('%c[SECURITY STATUS: ACTIVE] 防嵌套、防盗链与源码保护协议已启用。', warnStyle);
  } catch (e) {}

  // 2. 屏蔽页面右键菜单（防止小白右键另存为图片、网页或审查元素）
  document.addEventListener('contextmenu', function (e) {
    // 允许输入框内的正常右键，其他展示区域一律拦截
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      return true;
    }
    e.preventDefault();
    return false;
  }, { capture: true, passive: false });

  // 3. 拦截常见调试与偷源码快捷键 (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
  document.addEventListener('keydown', function (e) {
    // F12 (打开控制台)
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+Shift+I (检查), Ctrl+Shift+J (控制台), Ctrl+Shift+C (元素选择)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+U (查看网页源代码)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+S (保存网页到本地)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true, passive: false });

  // 4. 防非法跨域 iframe 盗用 (Frame-Busting，允许自身主站内嵌)
  if (window.top !== window.self) {
    try {
      if (window.top.location.origin !== window.self.location.origin) {
        window.top.location = window.self.location.href;
      }
    } catch (err) {
      console.warn('[SECURITY] Cross-origin frame embedding restricted.');
    }
  }
})();
