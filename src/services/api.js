import { homeConfig, navigation, pageData, productDetail, userProfile } from './mockData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

async function request(path, options = {}, fallback) {
  if (USE_MOCK) return structuredClone(fallback);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`API ${path} failed: ${response.status}`);
  return response.json();
}

export function getHomeConfig() {
  return request('/home/config', {}, homeConfig);
}

export function getUserProfile() {
  return request('/user/profile', {}, userProfile);
}

export function getNavigation() {
  return request('/navigation', {}, navigation);
}

export function getProductDetail(id) {
  return request(`/products/${id}`, {}, productDetail);
}

export function getPageData(pageKey) {
  return request(`/pages/${pageKey}`, {}, pageData[pageKey] || pageData['knowledge-overview']);
}

export function searchAssistant(query) {
  return request('/assistant/search', {
    method: 'POST',
    body: JSON.stringify({ query })
  }, {
    query,
    answer: `已收到任务需求：“${query}”。后端接入后这里展示智能问答、知识库检索或 Agent 执行结果。`
  });
}
