"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[1],{

/***/ 138
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


;// ./assets/scripts/2026/Shell.js
/**
 * 2026 Shell renderer.
 *
 * Each page provides:
 *   <body data-active="dashboard" data-crumbs="Workspace | Dashboard">
 *     <div class="shell">
 *       <div data-shell-sidebar></div>
 *       <div class="main">
 *         <div data-shell-topbar></div>
 *         <main class="content"> ...page content... </main>
 *         <div data-shell-footer></div>
 *       </div>
 *     </div>
 *   </body>
 *
 * mountShell() fills the three placeholder divs with the shared chrome,
 * marking the active sidebar item and writing the breadcrumbs.
 *
 * NAV is the single source of truth — adding a page is one entry here.
 */

const NAV = [
  {
    label: 'Không gian làm việc',
    items: [
      { key: 'dashboard', text: 'Tổng quan', href: 'index.html',
        icon: '<path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/>' },
      { key: 'bi-luy-ke', text: 'BI Lũy kế', href: 'dashboard_luy_ke.html', badge: { kind: 'new', text: 'BI' },
        icon: '<path d="M3 20V4M7 20v-6M11 20v-10M15 20v-4M19 20V8"/>' },
      { key: 'ict-report', text: 'Báo cáo ICT', href: 'dashboard-ict-v2_7.html', badge: { kind: 'new', text: 'ICT' },
        icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>' },
      { key: 'suc-khoe-nv', text: 'Sức khỏe NV', href: 'Suc_khoe_NV.html', badge: { kind: 'new', text: 'NV' },
        icon: '<path d="M3 12h4l2.5 6L13 4l3 8h5"/>' },
      { key: 'docs', text: 'Tài liệu hướng dẫn', href: 'https://adminator.colorlib.com/docs/', badge: { kind: 'new', text: 'DOCS' },
        icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
      { key: 'pro', text: 'Nâng cấp Pro', href: 'https://dashboardpack.com/?utm_source=colorlib&utm_medium=adminator-demo&utm_campaign=sidebar-go-pro', badge: { kind: 'pro', text: 'PRO' },
        icon: '<path d="M12 2 15 8l6.5 1-4.8 4.6L18 20l-6-3-6 3 1.3-6.4L2.5 9 9 8z"/>' },
    ],
  },
  {
    label: 'Giao tiếp',
    items: [
      { key: 'email', text: 'Email', href: 'email.html',
        icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' },
      { key: 'compose', text: 'Soạn thư', href: 'compose.html',
        icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z"/>' },
      { key: 'calendar', text: 'Lịch', href: 'calendar.html',
        icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
      { key: 'chat', text: 'Trò chuyện', href: 'chat.html',
        icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
    ],
  },
  {
    label: 'Thành phần giao diện',
    items: [
      { key: 'charts', text: 'Biểu đồ', href: 'charts.html', badge: { kind: 'new', text: 'MỚI' },
        icon: '<path d="M3 20V4M7 20v-6M11 20v-10M15 20v-4M19 20V8"/>' },
      { key: 'forms', text: 'Biểu mẫu', href: 'forms.html',
        icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10h10M7 14h7"/>' },
      { key: 'ui', text: 'Thành phần UI', href: 'ui.html',
        icon: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>' },
      { key: 'buttons', text: 'Nút bấm', href: 'buttons.html',
        icon: '<rect x="3" y="8" width="18" height="8" rx="4"/>' },
      { key: 'tables', text: 'Bảng dữ liệu',
        icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 16h18M9 4v16"/>',
        children: [
          { key: 'basic-table', text: 'Bảng cơ bản', href: 'basic-table.html' },
          { key: 'datatable',   text: 'Bảng nâng cao',  href: 'datatable.html' },
        ],
      },
      { key: 'maps', text: 'Bản đồ',
        icon: '<path d="M9 20V4l6 4v16z"/><path d="M3 7l6-3v16l-6 3z"/><path d="M15 8l6-3v16l-6 3"/>',
        children: [
          { key: 'google-maps', text: 'Google Map', href: 'google-maps.html' },
          { key: 'vector-maps', text: 'Bản đồ Vector', href: 'vector-maps.html' },
        ],
      },
      { key: 'pages', text: 'Trang khác',
        icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
        children: [
          { key: 'blank',   text: 'Trang trống',   href: 'blank.html' },
          { key: '404',     text: '404',     href: '404.html' },
          { key: '500',     text: '500',     href: '500.html' },
          { key: 'signin',  text: 'Đăng nhập', href: 'signin.html' },
          { key: 'signup',  text: 'Đăng ký', href: 'signup.html' },
        ],
      },
    ],
  },
];

const BRAND_LOGO = `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
  <path fill="#ffffff" d="M14.747 9.125c.527-1.426 1.736-2.573 3.317-2.573c1.643 0 2.792 1.085 3.318 2.573l6.077 16.867c.186.496.248.931.248 1.147c0 1.209-.992 2.046-2.139 2.046c-1.303 0-1.954-.682-2.264-1.611l-.931-2.915h-8.62l-.93 2.884c-.31.961-.961 1.642-2.232 1.642c-1.24 0-2.294-.93-2.294-2.17c0-.496.155-.868.217-1.023l6.233-16.867zm.34 11.256h5.891l-2.883-8.992h-.062l-2.946 8.992z"/>
</svg>`;

const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 18 6-6-6-6"/></svg>';

function renderNavLink(item, activeKey) {
  const active = item.key === activeKey ? ' is-active' : '';
  const badge = item.badge
    ? `<span class="nav-badge ${item.badge.kind}">${item.badge.text}</span>`
    : '';
  const external = /^https?:\/\//.test(item.href) ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `
    <a class="nav-link${active}" href="${item.href}"${external}>
      <svg viewBox="0 0 24 24">${item.icon}</svg>
      <span>${item.text}</span>
      ${badge}
    </a>`;
}

function renderNavGroup(item, activeKey) {
  const open = item.children.some((c) => c.key === activeKey) ? ' is-open' : '';
  const submenu = item.children
    .map((c) => `<a href="${c.href}">${c.text}</a>`)
    .join('');
  return `
    <div class="nav-item-group${open}" data-nav-group>
      <a class="nav-link" href="javascript:void(0)" data-nav-toggle>
        <svg viewBox="0 0 24 24">${item.icon}</svg>
        <span>${item.text}</span>
        ${CHEV}
      </a>
      <div class="nav-submenu">${submenu}</div>
    </div>`;
}

function renderSection(section, activeKey) {
  const items = section.items.map((item) => (
    item.children ? renderNavGroup(item, activeKey) : renderNavLink(item, activeKey)
  )).join('');
  return `
    <nav class="nav-section">
      <div class="nav-label">${section.label}</div>
      ${items}
    </nav>`;
}

function renderSidebar(activeKey) {
  const sections = NAV.map((s) => renderSection(s, activeKey)).join('');
  return `
    <aside class="d-sidebar">
      <div class="brand">
        <div class="brand-logo">${BRAND_LOGO}</div>
        <div class="brand-text">
          <div class="brand-name">Adminator</div>
          <div class="brand-tag">v4.3.0 · bản xem trước</div>
        </div>
      </div>
      ${sections}
      <div class="sidebar-footer">
        <div class="workspace">
          <div class="workspace-avatar">JD</div>
          <div class="workspace-text">
            <div class="workspace-name">John Doe</div>
            <div class="workspace-role">quản trị viên</div>
          </div>
          <svg class="workspace-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="m7 9 5-5 5 5"/><path d="m7 15 5 5 5-5"/>
          </svg>
        </div>
      </div>
    </aside>`;
}

function renderCrumbs(crumbsAttr) {
  if (!crumbsAttr) return '';
  const parts = crumbsAttr.split('|').map((p) => p.trim()).filter(Boolean);
  const sep = '<svg class="sep" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
  return parts.map((p, i) => {
    const cls = i === parts.length - 1 ? ' class="current"' : '';
    return `${i > 0 ? sep : ''}<span${cls}>${p}</span>`;
  }).join('');
}

function renderTopbar(crumbsAttr) {
  return `
    <header class="d-topbar">
      <div class="crumbs">
        <button class="hamburger" data-drawer-open aria-label="Open navigation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        ${renderCrumbs(crumbsAttr)}
      </div>
      <div class="topbar-actions">
        <button class="cmd" data-palette-open>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Tìm kiếm...</span>
          <kbd class="kbd">⌘K</kbd>
        </button>

        <div class="dd-wrap">
          <button class="icon-btn" data-dropdown aria-label="Thông báo">
            <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span class="count danger">3</span>
          </button>
          <div class="dd-menu" role="menu">
            <div class="dd-head">
              <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Thông báo
            </div>
            <div class="dd-list">
              <a class="dd-item" href="#">
                <div class="dd-avatar a1">JD</div>
                <div class="dd-body">
                  <div class="dd-text"><strong>John Doe</strong> đã thích <em>bài viết</em> của bạn</div>
                  <div class="dd-time">5 PHÚT TRƯỚC</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a2">MD</div>
                <div class="dd-body">
                  <div class="dd-text"><strong>Moo Doe</strong> đã thích <em>ảnh bìa</em> của bạn</div>
                  <div class="dd-time">7 PHÚT TRƯỚC</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a3">LD</div>
                <div class="dd-body">
                  <div class="dd-text"><strong>Lee Doe</strong> đã bình luận <em>video</em> của bạn</div>
                  <div class="dd-time">10 PHÚT TRƯỚC</div>
                </div>
              </a>
            </div>
            <a class="dd-footer" href="#">Xem tất cả thông báo →</a>
          </div>
        </div>

        <div class="dd-wrap">
          <button class="icon-btn" data-dropdown aria-label="Tin nhắn">
            <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            <span class="count info">3</span>
          </button>
          <div class="dd-menu" role="menu">
            <div class="dd-head">
              <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              Tin nhắn
            </div>
            <div class="dd-list">
              <a class="dd-item" href="#">
                <div class="dd-avatar a1">JD</div>
                <div class="dd-body">
                  <div class="dd-row-head"><strong>John Doe</strong><span class="dd-time">5 PHÚT</span></div>
                  <div class="dd-preview">Bạn muốn tự tạo bộ sinh dữ liệu riêng cho ứng dụng của mình…</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a2">MD</div>
                <div class="dd-body">
                  <div class="dd-row-head"><strong>Moo Doe</strong><span class="dd-time">15 PHÚT</span></div>
                  <div class="dd-preview">Bạn muốn tự tạo bộ sinh dữ liệu riêng cho ứng dụng của mình…</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a3">LD</div>
                <div class="dd-body">
                  <div class="dd-row-head"><strong>Lee Doe</strong><span class="dd-time">25 PHÚT</span></div>
                  <div class="dd-preview">Bạn muốn tự tạo bộ sinh dữ liệu riêng cho ứng dụng của mình…</div>
                </div>
              </a>
            </div>
            <a class="dd-footer" href="#">Xem tất cả tin nhắn →</a>
          </div>
        </div>

        <button class="icon-btn" id="themeToggle" aria-label="Đổi giao diện sáng/tối"></button>

        <div class="dd-wrap">
          <div class="avatar" data-dropdown tabindex="0" role="button" aria-label="Menu tài khoản">JD</div>
          <div class="dd-menu dd-profile" role="menu">
            <div class="dd-profile-head">
              <div class="dd-profile-name">John Doe</div>
              <div class="dd-profile-email">john@adminator.app</div>
            </div>
            <a class="dd-menu-item" href="#">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Cài đặt
            </a>
            <a class="dd-menu-item" href="#">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Hồ sơ
            </a>
            <a class="dd-menu-item" href="email.html">
              <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              Tin nhắn
            </a>
            <div class="dd-divider"></div>
            <a class="dd-menu-item danger" href="#">
              <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              Đăng xuất
            </a>
          </div>
        </div>
      </div>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="d-footer">
      <div>© 2026 · Thiết kế bởi <a href="https://colorlib.com" target="_blank" rel="nofollow noopener noreferrer">Colorlib</a></div>
      <div class="d-footer-meta">
        <span>v4.3.0</span>
        <span>bản xem trước</span>
      </div>
    </footer>`;
}

function mountShell() {
  const body = document.body;
  const activeKey = body.getAttribute('data-active') || '';
  const crumbs = body.getAttribute('data-crumbs') || '';

  const sidebarHost = document.querySelector('[data-shell-sidebar]');
  const topbarHost  = document.querySelector('[data-shell-topbar]');
  const footerHost  = document.querySelector('[data-shell-footer]');

  if (sidebarHost) sidebarHost.outerHTML = renderSidebar(activeKey);
  if (topbarHost)  topbarHost.outerHTML  = renderTopbar(crumbs);
  if (footerHost)  footerHost.outerHTML  = renderFooter();
}

;// ./assets/scripts/2026/init.js
/**
 * 2026 Shell behaviors:
 *  - theme toggle (icon swap + persistence)
 *  - dropdown open/close
 *  - sidebar nav-group expand/collapse
 *  - hero date population
 *  - todo checkbox state
 *
 * The early-paint <script> in each page body sets the initial data-theme
 * attribute to avoid a flash; this module only handles runtime toggles.
 */

const STORE_KEY = 'dash26-theme';

const SUN_ICON  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const update = () => {
    toggle.innerHTML = root.getAttribute('data-theme') === 'dark' ? SUN_ICON : MOON_ICON;
  };
  update();

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(STORE_KEY, next); } catch { /* localStorage may be unavailable */ }
    update();
  });
}

function initHeroDate() {
  const el = document.getElementById('heroDate');
  if (!el) return;
  const now = new Date();
  const weekdays = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  el.textContent = `${weekdays[now.getDay()]} · ${now.getDate()} Tháng ${now.getMonth()+1} · ${now.getFullYear()}`;
}

function initNavGroups() {
  // Rail mode (sidebar collapsed to 72px) renders the submenu as a flyout,
  // so only one should be open at a time and outside-clicks should dismiss it.
  // The flyout is position:fixed (see _responsive.scss) — we position it here
  // via getBoundingClientRect so it survives a scrolling sidebar and clamps to
  // the viewport bottom on short screens (e.g. 750×590).
  const railMQ = window.matchMedia('(min-width: 721px) and (max-width: 1100px)');

  const positionFlyout = (group) => {
    const trigger = group.querySelector('[data-nav-toggle]');
    const submenu = group.querySelector('.nav-submenu');
    if (!trigger || !submenu) return;
    const r = trigger.getBoundingClientRect();
    const h = submenu.offsetHeight;            // natural content height (max-height: 400 clamp)
    let top = Math.round(r.top);
    const maxTop = window.innerHeight - h - 8;
    if (top > maxTop) top = Math.max(8, maxTop);
    submenu.style.left = `${Math.round(r.right + 10)}px`;
    submenu.style.top = `${top}px`;
  };

  document.querySelectorAll('[data-nav-toggle]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const group = a.closest('[data-nav-group]');
      if (!group) return;
      e.stopPropagation();
      const willOpen = !group.classList.contains('is-open');
      if (railMQ.matches) {
        document.querySelectorAll('[data-nav-group].is-open').forEach((g) => {
          if (g !== group) g.classList.remove('is-open');
        });
      }
      group.classList.toggle('is-open', willOpen);
      if (willOpen && railMQ.matches) positionFlyout(group);
    });
  });

  document.addEventListener('click', (e) => {
    if (!railMQ.matches) return;
    if (e.target.closest('[data-nav-group]')) return;
    document.querySelectorAll('[data-nav-group].is-open').forEach((g) => g.classList.remove('is-open'));
  });

  // Keep the open flyout pinned to its trigger when the sidebar scrolls or the viewport resizes.
  const reposition = () => {
    if (!railMQ.matches) return;
    document.querySelectorAll('[data-nav-group].is-open').forEach(positionFlyout);
  };
  const sidebar = document.querySelector('.d-sidebar');
  if (sidebar) sidebar.addEventListener('scroll', reposition, { passive: true });
  window.addEventListener('resize', reposition);
}

function initDropdowns() {
  const closeAll = (except) => {
    document.querySelectorAll('.dd-wrap.is-open').forEach((w) => {
      if (w !== except) w.classList.remove('is-open');
    });
  };

  document.querySelectorAll('[data-dropdown]').forEach((trigger) => {
    const wrap = trigger.closest('.dd-wrap');
    if (!wrap) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !wrap.classList.contains('is-open');
      closeAll(wrap);
      wrap.classList.toggle('is-open', willOpen);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dd-wrap')) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

function initTodos() {
  document.querySelectorAll('.todo-check').forEach((cb) => {
    cb.addEventListener('change', () => {
      const item = cb.closest('.todo-item');
      if (item) item.classList.toggle('is-done', cb.checked);
    });
  });
}

function initAccordions() {
  document.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('[data-accordion]');
      if (item) item.classList.toggle('is-open');
    });
  });
}

function initTabGroups() {
  // Tabs that opt in by sharing a [data-tab-group] container.
  // Each .tab inside gets click → toggles is-active on siblings and
  // matches a sibling .tab-panel by data-tab-target.
  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const tabs = group.querySelectorAll('.tab');
    const panels = group.querySelectorAll('.tab-panel');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.getAttribute('data-tab-target');
        tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
        panels.forEach((p) => p.classList.toggle('is-active', p.getAttribute('data-tab-id') === target));
      });
    });
  });
}

function initMobileDrawer() {
  // Mobile: hamburger button (rendered in topbar at ≤720px) opens an off-canvas
  // sidebar drawer. Closes on backdrop click, Esc, or selecting a nav link.
  const body = document.body;
  if (!body) return;

  // Inject a backdrop element once (used by CSS via body.has-drawer-open).
  if (!document.querySelector('.drawer-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    body.appendChild(backdrop);
    backdrop.addEventListener('click', closeDrawer);
  }

  function openDrawer() {
    body.classList.add('has-drawer-open');
  }
  function closeDrawer() {
    body.classList.remove('has-drawer-open');
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-drawer-open]');
    if (trigger) { e.preventDefault(); openDrawer(); return; }
    // Auto-close when a sidebar nav link is selected (so the next page opens cleanly).
    const linkInDrawer = e.target.closest('.d-sidebar a[href]:not([href^="#"]):not([href="javascript:void(0)"])');
    if (body.classList.contains('has-drawer-open') && linkInDrawer) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('has-drawer-open')) closeDrawer();
  });
}

function initShellBehaviors() {
  initThemeToggle();
  initHeroDate();
  initNavGroups();
  initDropdowns();
  initTodos();
  initAccordions();
  initTabGroups();
  initMobileDrawer();
}

;// ./assets/scripts/2026/charts.js
/**
 * Chart.js wiring for the 2026 design system.
 *
 * Pages declare charts as <canvas data-chart-key="<seed>"></canvas>.
 * This module reads CSS variables for theme colors so charts match the active
 * theme, instantiates a Chart.js instance, and re-renders on theme toggle.
 *
 * To keep the chart-page demo visually rich, the seeds are baked-in samples
 * keyed by data-chart-key.
 *
 * Chart.js (~192 KB) is loaded with a dynamic import() so only the two pages
 * that actually draw charts pay for it. initCharts() bails before the import
 * when the page has no [data-chart-key] canvas.
 */

let Chart = null;

async function loadChartJs() {
  if (Chart) return Chart;
  const mod = await __webpack_require__.e(/* import() | vendor-chartjs */ 311).then(__webpack_require__.bind(__webpack_require__, 420));
  Chart = mod.Chart;
  Chart.register(...mod.registerables);
  return Chart;
}

function tokens() {
  const cs = getComputedStyle(document.documentElement);
  return {
    primary: cs.getPropertyValue('--primary').trim(),
    success: cs.getPropertyValue('--success').trim(),
    danger:  cs.getPropertyValue('--danger').trim(),
    warning: cs.getPropertyValue('--warning').trim(),
    info:    cs.getPropertyValue('--info').trim(),
    purple:  cs.getPropertyValue('--purple').trim(),
    pink:    cs.getPropertyValue('--pink').trim(),
    orange:  cs.getPropertyValue('--orange').trim(),
    teal:    cs.getPropertyValue('--teal').trim(),
    text:    cs.getPropertyValue('--t-base').trim(),
    muted:   cs.getPropertyValue('--t-muted').trim(),
    light:   cs.getPropertyValue('--t-light').trim(),
    border:  cs.getPropertyValue('--border').trim(),
    soft:    cs.getPropertyValue('--border-soft').trim(),
    bg:      cs.getPropertyValue('--bg-card').trim(),
  };
}

function applyDefaults(t) {
  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = t.muted;
  Chart.defaults.borderColor = t.soft;
  Chart.defaults.plugins.legend.position = 'bottom';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.boxHeight = 8;
  Chart.defaults.plugins.tooltip.backgroundColor = t.text;
  Chart.defaults.plugins.tooltip.titleColor = t.bg;
  Chart.defaults.plugins.tooltip.bodyColor = t.bg;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;
  Chart.defaults.plugins.tooltip.displayColors = false;
}

const SEEDS = {
  'revenue-line': (t) => ({
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          label: '2026',
          data: [42, 56, 50, 78, 88, 96, 110, 124, 118, 142, 158, 184],
          borderColor: t.primary,
          backgroundColor: `${t.primary}20`,
          tension: 0.35,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2.5,
        },
        {
          label: '2025',
          data: [38, 44, 46, 60, 70, 74, 82, 90, 92, 102, 110, 118],
          borderColor: t.muted,
          backgroundColor: 'transparent',
          tension: 0.35,
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2,
          borderDash: [4, 4],
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { grid: { color: t.soft, drawBorder: false }, ticks: { color: t.light } },
        x: { grid: { display: false }, ticks: { color: t.light } },
      },
    },
  }),

  'channels-bar': (t) => ({
    type: 'bar',
    data: {
      labels: ['Direct','Search','Social','Email','Affiliate','Display','Other'],
      datasets: [{
        label: 'Visitors',
        data: [124, 88, 72, 54, 36, 28, 18],
        backgroundColor: [t.primary, t.success, t.purple, t.info, t.warning, t.pink, t.muted],
        borderRadius: 6, borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: t.soft, drawBorder: false }, ticks: { color: t.light } },
        x: { grid: { display: false }, ticks: { color: t.muted } },
      },
    },
  }),

  'devices-doughnut': (t) => ({
    type: 'doughnut',
    data: {
      labels: ['Desktop','Mobile','Tablet'],
      datasets: [{
        data: [62, 30, 8],
        backgroundColor: [t.primary, t.purple, t.info],
        borderColor: t.bg,
        borderWidth: 3,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '68%',
      plugins: { legend: { position: 'right' } },
    },
  }),

  'sources-radar': (t) => ({
    type: 'radar',
    data: {
      labels: ['Speed','UX','Reliability','Pricing','Support','Features'],
      datasets: [
        {
          label: 'Adminator',
          data: [85, 92, 88, 76, 80, 95],
          borderColor: t.primary,
          backgroundColor: `${t.primary}30`,
          pointBackgroundColor: t.primary,
        },
        {
          label: 'Competitor',
          data: [70, 65, 75, 82, 60, 70],
          borderColor: t.muted,
          backgroundColor: `${t.muted}20`,
          pointBackgroundColor: t.muted,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        r: { angleLines: { color: t.soft }, grid: { color: t.soft }, pointLabels: { color: t.muted, font: { size: 11 } }, ticks: { display: false } },
      },
    },
  }),

  'mrr-stacked': (t) => ({
    type: 'bar',
    data: {
      labels: ['Q1','Q2','Q3','Q4'],
      datasets: [
        { label: 'Starter', data: [12, 18, 22, 28], backgroundColor: t.info,    borderRadius: 4, stack: 'a' },
        { label: 'Pro',     data: [38, 48, 56, 64], backgroundColor: t.primary, borderRadius: 4, stack: 'a' },
        { label: 'Team',    data: [22, 28, 36, 44], backgroundColor: t.purple,  borderRadius: 4, stack: 'a' },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { stacked: true, grid: { color: t.soft, drawBorder: false }, ticks: { color: t.light } },
        x: { stacked: true, grid: { display: false }, ticks: { color: t.muted } },
      },
    },
  }),

  'dashboard-monthly': (t) => ({
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        label: 'Revenue',
        data: [42, 38, 56, 50, 78, 70, 96, 88, 118, 102, 144, 168],
        borderColor: t.primary,
        backgroundColor: `${t.primary}24`,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: t.primary,
        pointHoverBorderColor: t.bg,
        pointHoverBorderWidth: 3,
        borderWidth: 2.5,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: t.soft, drawBorder: false }, ticks: { color: t.light, maxTicksLimit: 4 } },
        x: { grid: { display: false }, ticks: { color: t.light, font: { size: 10 } } },
      },
    },
  }),

  'sessions-area': (t) => ({
    type: 'line',
    data: {
      labels: Array.from({length: 30}, (_, i) => `${i + 1}`),
      datasets: [{
        label: 'Sessions',
        data: [120, 132, 110, 145, 162, 158, 175, 188, 172, 195, 210, 224, 218, 240, 256, 248, 272, 290, 282, 308, 322, 318, 340, 358, 352, 376, 392, 388, 410, 432],
        borderColor: t.success,
        backgroundColor: `${t.success}24`,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: t.soft, drawBorder: false }, ticks: { color: t.light } },
        x: { grid: { display: false }, ticks: { color: t.light, maxTicksLimit: 6 } },
      },
    },
  }),
};

const instances = new Map();

async function buildAll() {
  await loadChartJs();
  const t = tokens();
  applyDefaults(t);
  document.querySelectorAll('canvas[data-chart-key]').forEach((canvas) => {
    const key = canvas.getAttribute('data-chart-key');
    const seed = SEEDS[key];
    if (!seed) return;
    const existing = instances.get(canvas);
    if (existing) existing.destroy();
    instances.set(canvas, new Chart(canvas, seed(t)));
  });
}

function initCharts() {
  if (!document.querySelector('canvas[data-chart-key]')) return;
  buildAll();
  // Re-render charts whenever the theme changes.
  const observer = new MutationObserver((records) => {
    if (records.some((r) => r.attributeName === 'data-theme')) buildAll();
  });
  observer.observe(document.documentElement, { attributes: true });
}

;// ./assets/scripts/2026/maps.js
/**
 * jsvectormap wiring for the 2026 design system.
 *
 * Pages declare a vector map as <div data-vmap></div>; this module fills it
 * with a world map themed using the active CSS variables and re-renders on
 * theme change.
 *
 * jsvectormap plus its world map data is loaded with a dynamic import() so
 * only vector-maps.html pays for it — initVectorMaps() bails before the
 * import when the page has no [data-vmap] host.
 */

let jsVectorMap = null;

async function loadVectorMap() {
  if (jsVectorMap) return jsVectorMap;
  const mod = await __webpack_require__.e(/* import() | vendor-jsvectormap */ 280).then(__webpack_require__.bind(__webpack_require__, 168));
  jsVectorMap = mod.default;
  return jsVectorMap;
}

const MARKERS = [
  { name: 'Riga',         coords: [56.95, 24.10] },
  { name: 'New York',     coords: [40.71, -74.00] },
  { name: 'San Francisco',coords: [37.77, -122.42] },
  { name: 'London',       coords: [51.50, -0.12] },
  { name: 'Berlin',       coords: [52.52, 13.40] },
  { name: 'Tokyo',        coords: [35.68, 139.69] },
  { name: 'Sydney',       coords: [-33.86, 151.21] },
  { name: 'São Paulo',    coords: [-23.55, -46.63] },
  { name: 'Cape Town',    coords: [-33.92, 18.42] },
  { name: 'Dubai',        coords: [25.27, 55.30] },
];

const maps_instances = new Map();

function maps_tokens() {
  const cs = getComputedStyle(document.documentElement);
  return {
    primary: cs.getPropertyValue('--primary').trim(),
    purple:  cs.getPropertyValue('--purple').trim(),
    soft:    cs.getPropertyValue('--bg-muted').trim(),
    border:  cs.getPropertyValue('--border').trim(),
    text:    cs.getPropertyValue('--t-base').trim(),
    bg:      cs.getPropertyValue('--bg-card').trim(),
  };
}

async function buildOne(host) {
  await loadVectorMap();
  // Destroy old instance if rebuilding
  const prev = maps_instances.get(host);
  if (prev) {
    try { prev.destroy(); } catch { /* swallow — host is about to be replaced */ }
    host.innerHTML = '';
  }
  const t = maps_tokens();
  const map = new jsVectorMap({
    selector: host,
    map: 'world',
    backgroundColor: 'transparent',
    zoomOnScroll: false,
    regionStyle: {
      initial: { fill: t.soft, stroke: t.border, strokeWidth: 0.4, fillOpacity: 1 },
      hover:   { fill: t.primary, fillOpacity: 0.5 },
    },
    markers: MARKERS,
    markerStyle: {
      initial: { fill: t.primary, stroke: t.bg, strokeWidth: 2, r: 5 },
      hover:   { fill: t.purple,  stroke: t.bg, strokeWidth: 2, r: 7 },
    },
    labels: { markers: { render: (m) => m.name } },
  });
  maps_instances.set(host, map);
}

function maps_buildAll() {
  document.querySelectorAll('[data-vmap]').forEach(buildOne);
}

function initVectorMaps() {
  if (!document.querySelector('[data-vmap]')) return;
  maps_buildAll();
  const observer = new MutationObserver((records) => {
    if (records.some((r) => r.attributeName === 'data-theme')) maps_buildAll();
  });
  observer.observe(document.documentElement, { attributes: true });
}

;// ./assets/scripts/2026/calendar.js
/**
 * FullCalendar wiring for the 2026 design system.
 *
 * A page declares the calendar mount as <div data-fc></div>; this module
 * initializes FullCalendar with the seed events below, themes it via the
 * 2026 toolbar (we hide FC's built-in toolbar and let our own buttons drive
 * .next() / .prev() / .today() / .changeView()), and re-renders on theme
 * change so colors stay in sync.
 */

/*
 * FullCalendar plus its four plugins is by far the heaviest dependency
 * (~247 KB). It is loaded with a dynamic import() so only calendar.html pays
 * for it — initCalendarPage() bails before the import when the page has no
 * [data-fc] host.
 */
let FC = null;

async function loadFullCalendar() {
  if (FC) return FC;
  const mod = await __webpack_require__.e(/* import() | vendor-fullcalendar */ 707).then(__webpack_require__.bind(__webpack_require__, 890));
  FC = { Calendar: mod.Calendar, plugins: mod.plugins };
  return FC;
}

const SEED_EVENTS = [
  { title: 'Q2 kickoff',         start: '2026-04-01T09:00', className: 'fc-cat-work' },
  { title: 'Design review',      start: '2026-04-02T11:00', className: 'fc-cat-team' },
  { title: 'Lunch w/ Marcus',    start: '2026-04-03T13:00', className: 'fc-cat-personal' },
  { title: '🎂 Sara birthday',    start: '2026-04-05',      allDay: true, className: 'fc-cat-birthday' },
  { title: 'Standup',            start: '2026-04-07T10:00', className: 'fc-cat-work' },
  { title: 'Brand workshop',     start: '2026-04-07T14:00', className: 'fc-cat-team' },
  { title: 'All-hands',          start: '2026-04-08T15:00', className: 'fc-cat-work' },
  { title: '✈ Lisbon trip',       start: '2026-04-09',      end: '2026-04-13', allDay: true, className: 'fc-cat-travel' },
  { title: 'Investor sync',      start: '2026-04-14T16:00', className: 'fc-cat-work' },
  { title: '📑 Tax deadline',     start: '2026-04-15',      allDay: true, className: 'fc-cat-finance' },
  { title: 'Invoice approval',   start: '2026-04-17T12:00', className: 'fc-cat-finance' },
  { title: 'Run with Mira',      start: '2026-04-20T07:00', className: 'fc-cat-personal' },
  { title: 'Earth day talk',     start: '2026-04-22T14:00', className: 'fc-cat-team' },
  { title: '✓ Dependency merge', start: '2026-04-23',      allDay: true, className: 'fc-cat-work' },
  { title: 'Coffee w/ Rita',     start: '2026-04-24T10:00', className: 'fc-cat-personal' },
  { title: 'PR reviews',         start: '2026-04-24T15:00', className: 'fc-cat-work' },
  { title: 'Run · 5K',           start: '2026-04-25T07:00', className: 'fc-cat-personal' },
  { title: "Dinner @ Carla's",   start: '2026-04-25T20:00', className: 'fc-cat-personal' },
  { title: 'Sprint planning',    start: '2026-04-27T10:00', className: 'fc-cat-work' },
  { title: 'Board review',       start: '2026-04-28T14:00', className: 'fc-cat-work' },
  { title: 'Eng review',         start: '2026-04-28T17:00', className: 'fc-cat-team' },
  { title: 'Anya 1:1',           start: '2026-04-29T11:30', className: 'fc-cat-team' },
  { title: 'Newsletter goes out',start: '2026-04-30T09:00', className: 'fc-cat-team' },
  { title: 'Yoga',               start: '2026-04-30T19:00', className: 'fc-cat-personal' },
];

const VIEW_MAP = { Day: 'timeGridDay', Week: 'timeGridWeek', Month: 'dayGridMonth', Agenda: 'listWeek' };

let calendar = null;

function bindToolbar(host) {
  // Wire the page's existing toolbar buttons to the FC instance.
  const root = host.closest('.cal-main') || document;
  const monthEl = root.querySelector('.cal-month');

  const updateTitle = () => {
    if (!monthEl || !calendar) return;
    const d = calendar.getDate();
    const monthNames = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
    const month = monthNames[d.getMonth()];
    const year  = d.getFullYear();
    monthEl.innerHTML = `${month} <span class="yr">${year}</span>`;
  };

  root.querySelectorAll('.cal-nav-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (!calendar) return;
      if (idx === 0) calendar.prev();
      if (idx === 1) calendar.next();
      updateTitle();
    });
  });

  const today = root.querySelector('.cal-today-btn');
  if (today) today.addEventListener('click', () => { calendar.today(); updateTitle(); });

  root.querySelectorAll('.cal-view-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const label = tab.textContent.trim();
      const view = VIEW_MAP[label] || 'dayGridMonth';
      root.querySelectorAll('.cal-view-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
      calendar.changeView(view);
      updateTitle();
    });
  });

  // Title isn't filled in until the calendar is rendered.
  setTimeout(updateTitle, 0);
}

async function build(host) {
  const { Calendar, plugins } = await loadFullCalendar();
  if (calendar) {
    try { calendar.destroy(); } catch { /* re-build below */ }
  }
  calendar = new Calendar(host, {
    plugins,
    initialView: 'dayGridMonth',
    initialDate: '2026-04-25',
    headerToolbar: false,
    height: '100%',
    expandRows: true,
    dayMaxEvents: 3,
    fixedWeekCount: false,
    firstDay: 0,
    nowIndicator: true,
    selectable: true,
    editable: true,
    events: SEED_EVENTS,
    dayHeaderFormat: { weekday: 'short' },
    /* Timed events default to a dot + label in month view. The 2026 design uses
       filled pills, and `block` is what makes FullCalendar paint the event with
       --fc-event-color / --fc-event-contrast-color (see _fullcalendar.scss). */
    eventDisplay: 'block',
    /* v7 emits hashed class names, so the mono uppercase column headers can't be
       reached with a selector. Rendering our own element gives the stylesheet a
       stable hook. */
    dayHeaderContent: (arg) => ({
      html: `<span class="fc-dow">${arg.text}</span>`,
    }),
  });
  calendar.render();
  bindToolbar(host);
}

function initCalendarPage() {
  const host = document.querySelector('[data-fc]');
  if (!host) return;
  build(host);
  // Re-render on theme change so any token-driven colors update.
  const observer = new MutationObserver((records) => {
    if (records.some((r) => r.attributeName === 'data-theme')) {
      // Just trigger a redraw — colors come from CSS, not from JS.
      if (calendar) calendar.render();
    }
  });
  observer.observe(document.documentElement, { attributes: true });
}

;// ./assets/scripts/2026/palette.js
/**
 * Command palette (⌘K / Ctrl+K).
 *
 * Builds a searchable modal of every NAV item plus a few global actions
 * (toggle theme, view docs/repo). Opens via:
 *   - Click on any [data-palette-open] element (the topbar .cmd button)
 *   - Cmd/Ctrl + K keyboard shortcut, anywhere on the page
 *   - "/" keypress when no input is focused
 *
 * Closes via:
 *   - Esc
 *   - Click outside the panel
 *   - Selecting a result (Enter or click)
 *
 * Keyboard navigation: ↑ / ↓ to move, Enter to select.
 *
 * The palette renders into <body> the first time it's opened, then re-uses
 * that DOM node. All state is local to this module.
 */



const PANEL_HTML = `
  <div class="palette-modal" role="dialog" aria-modal="true" aria-label="Command palette">
    <div class="palette-input-row">
      <svg viewBox="0 0 24 24" class="palette-icon" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="m21 21-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
      <input class="palette-input" type="text" placeholder="Tìm trang, thao tác…" autocomplete="off" spellcheck="false">
      <kbd class="palette-esc">esc</kbd>
    </div>
    <div class="palette-results" role="listbox"></div>
    <div class="palette-foot">
      <span><kbd>↑</kbd><kbd>↓</kbd> di chuyển</span>
      <span><kbd>↵</kbd> chọn</span>
      <span><kbd>esc</kbd> đóng</span>
    </div>
  </div>
`;

let backdrop = null;
let modal = null;
let input = null;
let resultsEl = null;
let allItems = [];
let filtered = [];
let cursor = 0;

function buildItems() {
  // Flatten the NAV manifest into a single list of selectable rows.
  const items = [];

  for (const section of NAV) {
    for (const item of section.items) {
      if (item.children) {
        for (const child of item.children) {
          items.push({
            kind: 'page',
            label: child.text,
            section: `${section.label} › ${item.text}`,
            href: child.href,
            icon: item.icon,
          });
        }
      } else if (item.href && item.href !== '#') {
        items.push({
          kind: 'page',
          label: item.text,
          section: section.label,
          href: item.href,
          icon: item.icon,
        });
      }
    }
  }

  // Static actions
  items.push({
    kind: 'action',
    label: 'Đổi giao diện sáng / tối',
    section: 'Thao tác',
    action: () => {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('dash26-theme', next); } catch { /* no localStorage */ }
      // Update the toggle button icon if init.js wired one.
      const toggle = document.getElementById('themeToggle');
      if (toggle) toggle.click(); // no-op if already in the right state, or just nudge it
    },
    icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  });
  items.push({
    kind: 'link',
    label: 'Xem trên GitHub',
    section: 'Liên kết ngoài',
    href: 'https://github.com/puikinsh/Adminator-admin-dashboard',
    target: '_blank',
    icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  });
  items.push({
    kind: 'link',
    label: 'Tài liệu hướng dẫn',
    section: 'Liên kết ngoài',
    href: 'https://puikinsh.github.io/Adminator-admin-dashboard/',
    target: '_blank',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  });

  return items;
}

function score(item, query) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const label = item.label.toLowerCase();
  if (label === q) return 100;
  if (label.startsWith(q)) return 50;
  if (label.includes(q)) return 20;
  if (item.section.toLowerCase().includes(q)) return 5;
  return 0;
}

function renderResults() {
  resultsEl.innerHTML = filtered.length === 0
    ? '<div class="palette-empty">Không có kết quả</div>'
    : filtered.map((item, i) => `
      <div class="palette-result${i === cursor ? ' is-selected' : ''}" role="option" data-index="${i}" aria-selected="${i === cursor}">
        <span class="palette-result-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">${item.icon || ''}</svg></span>
        <span class="palette-result-label">${item.label}</span>
        <span class="palette-result-section">${item.section}</span>
      </div>
    `).join('');
}

function update(query) {
  filtered = allItems
    .map((item) => ({ item, s: score(item, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 12)
    .map((x) => x.item);
  cursor = 0;
  renderResults();
}

function activate(item) {
  if (!item) return;
  palette_close();
  if (item.kind === 'action' && typeof item.action === 'function') {
    item.action();
  } else if (item.href) {
    if (item.target === '_blank') {
      window.open(item.href, '_blank', 'noopener');
    } else {
      window.location.href = item.href;
    }
  }
}

function ensureMounted() {
  // If the cached modal was removed from the DOM (e.g. by a test or by code
  // that wipes <body>), drop the stale refs and remount.
  if (modal && !document.contains(modal)) {
    modal = null; backdrop = null; input = null; resultsEl = null;
  }
  if (modal) return;
  backdrop = document.createElement('div');
  backdrop.className = 'palette-backdrop';
  backdrop.innerHTML = PANEL_HTML;
  document.body.appendChild(backdrop);
  modal = backdrop.querySelector('.palette-modal');
  input = backdrop.querySelector('.palette-input');
  resultsEl = backdrop.querySelector('.palette-results');

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) palette_close();
  });
  input.addEventListener('input', () => update(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cursor = Math.min(cursor + 1, filtered.length - 1);
      renderResults();
      scrollCursorIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cursor = Math.max(cursor - 1, 0);
      renderResults();
      scrollCursorIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      activate(filtered[cursor]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      palette_close();
    }
  });
  resultsEl.addEventListener('click', (e) => {
    const row = e.target.closest('.palette-result');
    if (row) activate(filtered[Number(row.getAttribute('data-index'))]);
  });
}

function scrollCursorIntoView() {
  const sel = resultsEl.querySelector('.palette-result.is-selected');
  if (sel && typeof sel.scrollIntoView === 'function') {
    sel.scrollIntoView({ block: 'nearest' });
  }
}

function palette_open() {
  ensureMounted();
  if (allItems.length === 0) allItems = buildItems();
  input.value = '';
  update('');
  document.body.classList.add('has-palette-open');
  // Focus on next tick (jsdom-friendly).
  setTimeout(() => input.focus(), 0);
}

function palette_close() {
  if (!modal) return;
  document.body.classList.remove('has-palette-open');
}

function isOpen() {
  return document.body.classList.contains('has-palette-open');
}

let _initialized = false;

function initPalette() {
  // Guard against being called twice (e.g. when init runs on both
  // DOMContentLoaded and on a manual re-init after hot reload). Without
  // this, every keydown handler runs N times, which causes Cmd+K to net-no-op
  // on the second invocation.
  if (_initialized) return;
  _initialized = true;

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-palette-open]')) {
      e.preventDefault();
      palette_open();
    }
  });

  document.addEventListener('keydown', (e) => {
    // Cmd+K (Mac) / Ctrl+K (Windows/Linux): open from anywhere
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      isOpen() ? palette_close() : palette_open();
      return;
    }
    // Slash: open when no input is focused
    if (e.key === '/' && !isOpen()) {
      const tag = document.activeElement && document.activeElement.tagName;
      const editable = document.activeElement && document.activeElement.isContentEditable;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT' && !editable) {
        e.preventDefault();
        palette_open();
      }
    }
  });
}

;// ./assets/scripts/2026/index.js
/**
 * 2026 entry point.
 *
 * Order of operations:
 *   1. Import the SCSS bundle (extracted to its own CSS file in production).
 *   2. Mount the shell (sidebar/topbar/footer) into the page placeholders.
 *   3. Wire shell behaviors (theme toggle, dropdowns, nav groups, todos).
 *
 * Each *-2026.html page has data-active + data-crumbs on <body> and three
 * placeholder divs ([data-shell-sidebar], [data-shell-topbar],
 * [data-shell-footer]) inside the .shell wrapper.
 */









function start() {
  mountShell();
  initShellBehaviors();
  initPalette();
  initCharts();
  initVectorMaps();
  initCalendarPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}


/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(138));
/******/ }
]);