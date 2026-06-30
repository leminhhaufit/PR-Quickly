let allRepos = [];
let allBranches = [];
let allPullRequests = [];
let defaultRepoName = 'psc-tracker-service';
let currentApiBaseUrl = 'https://api.github.com'; // Mặc định
let currentLanguage = 'vi';

const translations = {
  vi: {
    popoutTitle: 'Mở cửa sổ độc lập',
    popoutButton: 'Cửa sổ lớn',
    openPrTitle: 'Pull Request đang mở',
    createPrTitle: 'Tạo Pull Request',
    repoLabel: '1. Chọn Repository:',
    repoSearchPlaceholder: '🔍 Lọc nhanh Repository...',
    refreshListsButton: 'Làm mới Branch & PR',
    baseLabel: '2. Nhánh Base (Nhánh Đích):',
    baseSearchPlaceholder: '🔍 Lọc nhanh nhánh Base...',
    headLabel: '3. Nhánh Head (Nhánh mới code):',
    headSearchPlaceholder: '🔍 Lọc nhanh nhánh Head...',
    titleLabel: '4. Tiêu đề Pull Request:',
    titlePlaceholder: 'Nhập tiêu đề PR ngắn gọn',
    createPrButton: 'Tạo Pull Request',
    githubConfigTitle: 'Cấu hình GitHub',
    languageLabel: 'Ngôn ngữ:',
    defaultRepoLabel: 'Repo mặc định sẽ tự chọn khi mở popup:',
    defaultRepoPlaceholder: 'Ví dụ: psc-tracker-service hoặc owner/repo',
    tokenLabel: 'GitHub Personal Access Token (PAT):',
    saveButton: 'Lưu',
    clearButton: 'Xóa',
    tokenBadge: '✓ Token đã mã hóa đám mây',
    saveTokenToLoadRepo: '-- Lưu Token để tải Repo --',
    chooseRepoFirst: '-- Chọn Repo trước --',
    chooseRepoToLoadPr: '-- Chọn Repository để tải danh sách PR đang mở --',
    pleaseSaveToken: '-- Vui lòng lưu Token --',
    loadingRepos: '-- Đang tải danh sách Repo... --',
    cannotLoadData: '-- Không thể tải dữ liệu --',
    chooseRepository: '-- Chọn một Repository --',
    loadingOpenPrs: '-- Đang tải danh sách PR đang mở... --',
    noOpenPrs: '-- Repository này chưa có Pull Request đang mở --',
    prStatusHeader: 'Trạng thái',
    createdDateHeader: 'Ngày tạo',
    loadingBranches: '-- Đang tải danh sách nhánh... --',
    scanningBranches: 'Đang quét toàn bộ nhánh...',
    branchesLoaded: (count) => `Tải thành công ${count} nhánh.`,
    noBranchMatches: '-- Không khớp nhánh nào --',
    branchLoadError: '-- Lỗi tải danh sách nhánh --',
    tokenRequired: 'Vui lòng cấu hình Token trước!',
    requiredFields: 'Vui lòng nhập/chọn đủ thông tin!',
    sameBranches: 'Nhánh Base và Head không được trùng nhau!',
    creatingPr: 'Đang tạo Pull Request...',
    createPrSuccess: 'Tạo PR thành công!',
    createPrSuccessHtml: (url) => `🎉 Thành công! Đã copy link PR và mở tab mới. <a href="${url}" target="_blank" style="color:#0969da; font-weight:bold;">Xem PR của bạn</a>`,
    prBody: 'PR được tạo bằng Chrome Extension.',
    repoErrorPrefix: 'Lỗi Repo',
    branchErrorPrefix: 'Lỗi Branch',
    errorPrefix: 'Lỗi',
    cannotLoadRepos: 'Không thể tải danh sách Repo. Vui lòng kiểm tra lại Token.',
    cannotLoadPrs: 'Không thể tải danh sách PR.',
    cannotLoadBranches: 'Không thể lấy danh sách nhánh.'
  },
  en: {
    popoutTitle: 'Open detached window',
    popoutButton: 'Large window',
    openPrTitle: 'Open Pull Requests',
    createPrTitle: 'Create Pull Request',
    repoLabel: '1. Select Repository:',
    repoSearchPlaceholder: '🔍 Quickly filter repositories...',
    refreshListsButton: 'Refresh Branches & PRs',
    baseLabel: '2. Base Branch (Target):',
    baseSearchPlaceholder: '🔍 Quickly filter base branches...',
    headLabel: '3. Head Branch (New code):',
    headSearchPlaceholder: '🔍 Quickly filter head branches...',
    titleLabel: '4. Pull Request Title:',
    titlePlaceholder: 'Enter a short PR title',
    createPrButton: 'Create Pull Request',
    githubConfigTitle: 'GitHub Settings',
    languageLabel: 'Language:',
    defaultRepoLabel: 'Default repo to auto-select when opening popup:',
    defaultRepoPlaceholder: 'Example: psc-tracker-service or owner/repo',
    tokenLabel: 'GitHub Personal Access Token (PAT):',
    saveButton: 'Save',
    clearButton: 'Clear',
    tokenBadge: '✓ Token stored in cloud sync',
    saveTokenToLoadRepo: '-- Save Token to load repositories --',
    chooseRepoFirst: '-- Select a repository first --',
    chooseRepoToLoadPr: '-- Select a repository to load open PRs --',
    pleaseSaveToken: '-- Please save Token --',
    loadingRepos: '-- Loading repositories... --',
    cannotLoadData: '-- Unable to load data --',
    chooseRepository: '-- Select a Repository --',
    loadingOpenPrs: '-- Loading open PRs... --',
    noOpenPrs: '-- This repository has no open Pull Requests --',
    prStatusHeader: 'Status',
    createdDateHeader: 'Created',
    loadingBranches: '-- Loading branches... --',
    scanningBranches: 'Scanning all branches...',
    branchesLoaded: (count) => `Loaded ${count} branches.`,
    noBranchMatches: '-- No matching branches --',
    branchLoadError: '-- Failed to load branches --',
    tokenRequired: 'Please configure Token first!',
    requiredFields: 'Please fill/select all required information!',
    sameBranches: 'Base and Head branches cannot be the same!',
    creatingPr: 'Creating Pull Request...',
    createPrSuccess: 'Pull Request created successfully!',
    createPrSuccessHtml: (url) => `🎉 Success! PR link copied and opened in a new tab. <a href="${url}" target="_blank" style="color:#0969da; font-weight:bold;">View your PR</a>`,
    prBody: 'PR created by Chrome Extension.',
    repoErrorPrefix: 'Repo Error',
    branchErrorPrefix: 'Branch Error',
    errorPrefix: 'Error',
    cannotLoadRepos: 'Unable to load repositories. Please check your Token.',
    cannotLoadPrs: 'Unable to load PRs.',
    cannotLoadBranches: 'Unable to load branches.'
  }
};

function t(key, ...args) {
  const value = translations[currentLanguage][key] || translations.vi[key] || key;
  return typeof value === 'function' ? value(...args) : value;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
}

function setStatus(text, color = 'black') {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.style.color = color;
    statusDiv.innerText = text;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const tokenInput = document.getElementById('token');
  const saveTokenBtn = document.getElementById('saveTokenBtn');
  const clearTokenBtn = document.getElementById('clearTokenBtn');
  const tokenBadge = document.getElementById('tokenBadge');
  const languageSelect = document.getElementById('languageSelect');
  const defaultRepoInput = document.getElementById('defaultRepoInput');
  
  const repoSelect = document.getElementById('repoSelect');
  const repoSearch = document.getElementById('repoSearch');
  const baseSelect = document.getElementById('baseSelect');
  const baseSearch = document.getElementById('baseSearch');
  const headSelect = document.getElementById('headSelect');
  const headSearch = document.getElementById('headSearch');
  const refreshListsBtn = document.getElementById('refreshListsBtn');
  const popoutBtn = document.getElementById('popoutBtn');

  const languageStorage = await chrome.storage.sync.get(['pr_quickly_language']);
  currentLanguage = languageStorage.pr_quickly_language || 'vi';
  if (languageSelect) languageSelect.value = currentLanguage;

  const defaultRepoStorage = await chrome.storage.sync.get(['pr_quickly_default_repo']);
  defaultRepoName = defaultRepoStorage.pr_quickly_default_repo || defaultRepoName;
  if (defaultRepoInput) defaultRepoInput.value = defaultRepoName;
  applyTranslations();

  if (languageSelect) {
    languageSelect.addEventListener('change', async (event) => {
      currentLanguage = event.target.value;
      await chrome.storage.sync.set({ pr_quickly_language: currentLanguage });
      applyTranslations();
      renderRepos(repoSearch.value || defaultRepoName);
      if (!activeToken) {
        resetBranchDropdowns(t('pleaseSaveToken'));
        renderPullRequests(t('pleaseSaveToken'));
        return;
      }
      if (!repoSelect.value) {
        resetBranchDropdowns(t('chooseRepoFirst'));
        renderPullRequests(t('chooseRepoToLoadPr'));
        return;
      }
      renderBranches(baseSearch.value, 'base');
      renderBranches(headSearch.value, 'head');
      renderPullRequests();
    });
  }

  if (defaultRepoInput) {
    defaultRepoInput.addEventListener('change', async (event) => {
      defaultRepoName = event.target.value.trim();
      await chrome.storage.sync.set({ pr_quickly_default_repo: defaultRepoName });
      repoSearch.value = defaultRepoName;
      renderRepos(defaultRepoName);
      const defaultRepo = findDefaultRepo();
      if (defaultRepo && activeToken) {
        selectRepoAndLoadData(activeToken, defaultRepo.full_name);
      }
    });
  }

  repoSearch.value = defaultRepoName;

  // Bước quan trọng: Phải đợi xác định chính xác API Endpoint dựa trên Tab hiện tại trước
  await xacDinhDomainHeThong();

  popoutBtn.addEventListener('click', async () => {
    const popoutUrl = chrome.runtime.getURL(`popup.html?popout=1&apiBase=${encodeURIComponent(currentApiBaseUrl)}`);
    await chrome.windows.create({
      url: popoutUrl,
      type: 'popup',
      width: 430,
      height: 760
    });
    window.close();
  });

  // Đọc token đã lưu từ bộ nhớ sync (Lưu vĩnh viễn không mất khi tắt máy)
  const stored = await chrome.storage.sync.get(['gh_token', 'gh_api_url']);
  let activeToken = stored.gh_token || '';
  if (stored.gh_api_url) {
    currentApiBaseUrl = stored.gh_api_url;
  }

  if (activeToken) {
    anThanhKhoaToken();
    taiDanhSachRepo(activeToken);
  }

  // Sự kiện lưu Token
  saveTokenBtn.addEventListener('click', async () => {
    const rawToken = tokenInput.value.trim();
    if (!rawToken || rawToken.startsWith('•••')) return;
    
    // Lưu vào bộ nhớ sync đồng bộ đám mây
    await chrome.storage.sync.set({ gh_token: rawToken, gh_api_url: currentApiBaseUrl });
    activeToken = rawToken;
    anThanhKhoaToken();
    taiDanhSachRepo(activeToken);
  });

  // Sự kiện xóa Token
  clearTokenBtn.addEventListener('click', async () => {
    await chrome.storage.sync.remove(['gh_token']);
    activeToken = '';
    tokenInput.value = '';
    tokenInput.disabled = false;
    saveTokenBtn.classList.remove('hidden');
    clearTokenBtn.classList.add('hidden');
    if (tokenBadge) tokenBadge.style.display = 'none';
    allRepos = [];
    allPullRequests = [];
    renderRepos(repoSearch.value || defaultRepoName);
    renderPullRequests(t('pleaseSaveToken'));
    resetBranchDropdowns(t('pleaseSaveToken'));
  });

  // Thay đổi Repo -> Load danh sách nhánh
  repoSelect.addEventListener('change', () => {
    if (!repoSelect.value) {
      allPullRequests = [];
      renderPullRequests(t('chooseRepoToLoadPr'));
      return;
    }
    taiDanhSachBranches(activeToken, repoSelect.value);
    taiDanhSachPullRequests(activeToken, repoSelect.value);
  });

  if (refreshListsBtn) {
    refreshListsBtn.addEventListener('click', () => {
      if (!activeToken) return setStatus(t('tokenRequired'), 'red');
      if (!repoSelect.value) return setStatus(t('chooseRepoToLoadPr'), 'red');

      taiDanhSachBranches(activeToken, repoSelect.value);
      taiDanhSachPullRequests(activeToken, repoSelect.value);
    });
  }

  // Lắng nghe sự kiện tìm kiếm
  repoSearch.addEventListener('input', (e) => renderRepos(e.target.value));
  baseSearch.addEventListener('input', (e) => renderBranches(e.target.value, 'base'));
  headSearch.addEventListener('input', (e) => renderBranches(e.target.value, 'head'));

  // Tạo PR
  document.getElementById('createPrBtn').addEventListener('click', async () => {
    const selectedRepo = repoSelect.value;
    const base = baseSelect.value;
    const head = headSelect.value;
    const title = document.getElementById('titleInput').value.trim();

    if (!activeToken) return setStatus(t('tokenRequired'), 'red');
    if (!selectedRepo || !base || !head || !title) return setStatus(t('requiredFields'), 'red');
    if (base === head) return setStatus(t('sameBranches'), 'red');

    setStatus(t('creatingPr'), 'black');

    try {
      const response = await fetch(`${currentApiBaseUrl}/repos/${selectedRepo}/pulls`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${activeToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, head, base, body: t('prBody') })
      });

      const data = await response.json();
      if (response.ok) {
        await copyTextToClipboard(data.html_url);
        await chrome.tabs.create({ url: data.html_url });
        taiDanhSachPullRequests(activeToken, selectedRepo);
        setStatus(t('createPrSuccess'), 'green');
        document.getElementById('status').innerHTML = t('createPrSuccessHtml', data.html_url);
      } else {
        let errorDetail = data.message;
        if (data.errors && data.errors.length > 0) {
          errorDetail = data.errors.map(err => err.message || err.code).join(', ');
        }
        throw new Error(`${data.message}: ${errorDetail}`);
      }
    } catch (err) {
      setStatus(`${t('errorPrefix')}: ${err.message}`, 'red');
    }
  });

  function anThanhKhoaToken() {
    tokenInput.value = '••••••••••••••••••••••••••••••••';
    tokenInput.disabled = true;
    saveTokenBtn.classList.add('hidden');
    clearTokenBtn.classList.remove('hidden');
    if (tokenBadge) tokenBadge.style.display = 'block';
  }
});

// Hàm xác định Domain Hệ Thống (Sửa lỗi bất đồng bộ giúp lấy chuẩn API)
async function xacDinhDomainHeThong() {
  const urlParams = new URLSearchParams(window.location.search);
  const apiBaseFromPopout = urlParams.get('apiBase');
  if (apiBaseFromPopout) {
    currentApiBaseUrl = apiBaseFromPopout;
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url) {
    try {
      const urlObj = new URL(tab.url);
      // Chỉ tự động nhận diện domain GitHub khi tab hiện tại thuộc github.com, *.gevernova.net hoặc có chứa "github" trong tên miền
      const isGitHub = urlObj.hostname === 'github.com' || urlObj.hostname.includes('github');
      const isEnterprise = urlObj.hostname.endsWith('.gevernova.net');

      if (isGitHub || isEnterprise) {
        if (urlObj.hostname === 'github.com') {
          currentApiBaseUrl = 'https://api.github.com';
        } else {
          currentApiBaseUrl = `https://${urlObj.hostname}/api/v3`;
        }
        // Lưu lại API URL thành công gần nhất vào storage để tái sử dụng
        await chrome.storage.sync.set({ gh_api_url: currentApiBaseUrl });
      } else {
        // Nếu ở tab khác ngoài GitHub (ví dụ: google.com, localhost...), lấy API URL đã lưu từ trước
        const stored = await chrome.storage.sync.get(['gh_api_url']);
        if (stored.gh_api_url) {
          currentApiBaseUrl = stored.gh_api_url;
        } else {
          currentApiBaseUrl = 'https://api.github.com'; // Mặc định là public GitHub
        }
      }
    } catch (e) {
      const stored = await chrome.storage.sync.get(['gh_api_url']);
      currentApiBaseUrl = stored.gh_api_url || 'https://api.github.com';
    }
  } else {
    // Nếu không có tab active (ví dụ trong popup độc lập hoặc cửa sổ mới), dùng API URL đã lưu
    const stored = await chrome.storage.sync.get(['gh_api_url']);
    currentApiBaseUrl = stored.gh_api_url || 'https://api.github.com';
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
}

// Gọi API lấy toàn bộ Repositories
async function taiDanhSachRepo(token) {
  const repoSelect = document.getElementById('repoSelect');
  if (!repoSelect) return;
  
  repoSelect.innerHTML = `<option value="">${t('loadingRepos')}</option>`;
  try {
    const response = await fetch(`${currentApiBaseUrl}/user/repos?per_page=100&sort=pushed`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) throw new Error(t('cannotLoadRepos'));

    allRepos = await response.json();
    renderRepos(repoSearch.value || defaultRepoName);

    const defaultRepo = findDefaultRepo();
    if (defaultRepo) {
      selectRepoAndLoadData(token, defaultRepo.full_name);
      return;
    }
    
    // Tự động chọn repo hiện tại đang mở trên trình duyệt nếu khớp
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      const pathParts = new URL(tab.url).pathname.split('/').filter(p => p);
      if (pathParts.length >= 2) {
        const currentRepoSlug = `${pathParts[0]}/${pathParts[1]}`.toLowerCase();
        const matchedRepo = allRepos.find(r => r.full_name.toLowerCase() === currentRepoSlug);
        if (matchedRepo) {
          selectRepoAndLoadData(token, matchedRepo.full_name);
        }
      }
    }
  } catch (err) {
    setStatus(`${t('repoErrorPrefix')}: ${err.message}`, 'red');
    document.getElementById('repoSelect').innerHTML = `<option value="">${t('cannotLoadData')}</option>`;
  }
}

function findDefaultRepo() {
  const normalizedDefaultName = defaultRepoName.toLowerCase();
  return allRepos.find(repo => repo.full_name.toLowerCase() === normalizedDefaultName)
    || allRepos.find(repo => repo.name && repo.name.toLowerCase() === normalizedDefaultName)
    || allRepos.find(repo => repo.full_name.toLowerCase().endsWith(`/${normalizedDefaultName}`));
}

function selectRepoAndLoadData(token, repoFullName) {
  const repoSelect = document.getElementById('repoSelect');
  if (repoSelect) repoSelect.value = repoFullName;
  taiDanhSachBranches(token, repoFullName);
  taiDanhSachPullRequests(token, repoFullName);
}

function renderRepos(keyword) {
  const repoSelect = document.getElementById('repoSelect');
  if (!repoSelect) return;
  repoSelect.innerHTML = `<option value="">${t('chooseRepository')}</option>`;
  
  const filtered = allRepos.filter(repo => 
    repo.full_name.toLowerCase().includes(keyword.toLowerCase())
  );

  filtered.forEach(repo => {
    const opt = new Option(repo.full_name, repo.full_name);
    repoSelect.add(opt);
  });
}

async function taiDanhSachPullRequests(token, repoFullName) {
  renderPullRequests(t('loadingOpenPrs'));

  try {
    const response = await fetch(`${currentApiBaseUrl}/repos/${repoFullName}/pulls?state=open&sort=created&direction=desc&per_page=20`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) throw new Error(t('cannotLoadPrs'));

    allPullRequests = await response.json();
    renderPullRequests();
  } catch (err) {
    allPullRequests = [];
    renderPullRequests(`-- ${err.message} --`);
  }
}

function renderPullRequests(emptyMessage = t('noOpenPrs')) {
  const prList = document.getElementById('prList');
  if (!prList) return;

  if (allPullRequests.length === 0) {
    prList.innerHTML = `<div class="pr-empty">${emptyMessage}</div>`;
    return;
  }

  const rows = allPullRequests.map(pr => {
    const createdAt = new Date(pr.created_at).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US');
    return `
      <tr>
        <td class="pr-title">
          <a class="pr-link" href="${pr.html_url}" target="_blank">#${pr.number} ${escapeHtml(pr.title)}</a>
          <div class="pr-branches">${escapeHtml(pr.head.ref)} → ${escapeHtml(pr.base.ref)}</div>
        </td>
        <td><span class="pr-state ${pr.state}">${pr.state}</span></td>
        <td>${createdAt}</td>
      </tr>
    `;
  }).join('');

  prList.innerHTML = `
    <table class="pr-table">
      <thead>
        <tr>
          <th>PR</th>
          <th>${t('prStatusHeader')}</th>
          <th>${t('createdDateHeader')}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Gọi API lấy danh sách toàn bộ các nhánh (Hỗ trợ phân trang nhiều hơn 100 nhánh)
async function taiDanhSachBranches(token, repoFullName) {
  resetBranchDropdowns(t('loadingBranches'));
  setStatus(t('scanningBranches'), 'black');
  
  allBranches = []; 
  let page = 1;
  const perPage = 100;
  let keepFetching = true;

  try {
    while (keepFetching) {
      const response = await fetch(`${currentApiBaseUrl}/repos/${repoFullName}/branches?per_page=${perPage}&page=${page}`, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!response.ok) throw new Error(t('cannotLoadBranches'));

      const fetchedBranches = await response.json();

      if (fetchedBranches.length > 0) {
        allBranches = allBranches.concat(fetchedBranches);
        if (fetchedBranches.length < perPage) {
          keepFetching = false;
        } else {
          page++;
        }
      } else {
        keepFetching = false;
      }
    }

    renderBranches('', 'base');
    renderBranches('', 'head');
    
    setStatus(t('branchesLoaded', allBranches.length), '#1a7f37');
    setTimeout(() => setStatus('', 'black'), 2000);

  } catch (err) {
    setStatus(`${t('branchErrorPrefix')}: ${err.message}`, 'red');
    resetBranchDropdowns(t('branchLoadError'));
  }
}

function renderBranches(keyword, type) {
  const selectEl = document.getElementById(type === 'base' ? 'baseSelect' : 'headSelect');
  if (!selectEl) return; 
  
  selectEl.innerHTML = '';
  const filtered = allBranches.filter(branch => 
    branch.name.toLowerCase().includes(keyword.toLowerCase())
  );

  if (filtered.length === 0) {
    selectEl.add(new Option(t('noBranchMatches'), ''));
    return;
  }

  filtered.forEach(branch => {
    const opt = new Option(branch.name, branch.name);
    if (type === 'base' && (branch.name === 'main' || branch.name === 'master' || branch.name === 'develop')) {
      opt.selected = true;
    }
    selectEl.add(opt);
  });
}

function resetBranchDropdowns(message) {
  const baseSelect = document.getElementById('baseSelect');
  const headSelect = document.getElementById('headSelect');
  if (baseSelect) baseSelect.innerHTML = `<option value="">${message}</option>`;
  if (headSelect) headSelect.innerHTML = `<option value="">${message}</option>`;
}
