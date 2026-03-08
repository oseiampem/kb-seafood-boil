import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Attach JWT token for admin requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('kb_admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error intercept — redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      if (isAdminRoute && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('kb_admin_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

// ── Orders ─────────────────────────────────────────────────────────────────
export const submitOrder = (data) => api.post('/api/orders', data);

export const getOrders = (params) => api.get('/api/orders', { params });

export const updateOrderStatus = (id, status) =>
  api.put(`/api/orders/${id}`, { status });

export const deleteOrder = (id) => api.delete(`/api/orders/${id}`);

// ── Auth ───────────────────────────────────────────────────────────────────
export const loginAdmin = (credentials) => api.post('/api/auth/login', credentials);

export const verifyToken = () => api.get('/api/auth/verify');

export default api;
