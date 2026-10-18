// BhumiSathi (ভূমিসাথী) API Client

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

function getToken() {
  return localStorage.getItem("lg_token") || "";
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("lg_token", token);
  } else {
    localStorage.removeItem("lg_token");
  }
}

async function request(endpoint, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {})
  };

  const token = getToken();
  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // If body is not FormData, set Content-Type to application/json
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errMsg = "অনুরোধটি সম্পন্ন করা যায়নি (Request failed)";
    try {
      const errData = await response.json();
      errMsg = errData.detail || errData.message || errMsg;
    } catch (e) {
      // fallback
    }
    throw new Error(errMsg);
  }

  return response.json();
}

export const api = {
  // Auth
  login: (identifier, password) => request("/auth/login", { method: "POST", body: { identifier, password } }),
  register: (data) => request("/auth/register", { method: "POST", body: data }),
  getMe: (userId) => request(`/auth/me${userId ? `?user_id=${userId}` : ""}`),
  getDemoUsers: () => request("/auth/demo-users"),

  // Dashboard & Seed
  getDashboardStats: () => request("/dashboard/stats"),
  resetSeedData: () => request("/seed", { method: "POST" }),

  // P2: Deed Verification
  verifyDeed: (data, userId) => request(`/verification/verify-deed${userId ? `?user_id=${userId}` : ""}`, { method: "POST", body: data }),
  uploadDeed: (formData) => request("/verification/upload-deed", { method: "POST", body: formData }),
  getVerificationReport: (ref) => request(`/verification/report/${ref}`),
  listVerificationReports: () => request("/verification/reports"),

  // P4: Smart E-Namjari
  applyMutation: (data, userId) => request(`/mutation/apply${userId ? `?user_id=${userId}` : ""}`, { method: "POST", body: data }),
  updateMutation: (trackingNo, data) => request(`/mutation/update/${trackingNo}`, { method: "PUT", body: data }),
  trackMutation: (trackingNo) => request(`/mutation/track/${trackingNo}`),
  getMyMutations: (userId) => request(`/mutation/my-applications?user_id=${userId || 1}`),
  getAllMutations: (statusFilter) => request(`/mutation/all-applications${statusFilter ? `?status_filter=${encodeURIComponent(statusFilter)}` : ""}`),
  performMutationAction: (data) => request("/mutation/action", { method: "POST", body: data }),
  getMutationStats: () => request("/mutation/stats"),

  // P5: Due Diligence
  assessDueDiligence: (data, userId) => request(`/due-diligence/assess${userId ? `?user_id=${userId}` : ""}`, { method: "POST", body: data }),
  getDueDiligenceReport: (ref) => request(`/due-diligence/report/${ref}`),
  listDueDiligenceReports: () => request("/due-diligence/reports"),

  // Properties
  getProperties: () => request("/properties"),
  getPropertyDetail: (plotId) => request(`/properties/${encodeURIComponent(plotId)}`),

  // Audit Logs & Notifications
  getAuditLogs: (limit = 50) => request(`/audit-logs?limit=${limit}`),
  getNotifications: (userId, role) => request(`/notifications?user_id=${userId || 1}&role=${role || "citizen"}`),
  markNotificationRead: (nid) => request(`/notifications/${nid}/read`, { method: "POST" }),

  // O(log N) High-Performance Binary Search API
  searchBinary: (query, category = "all", limit = 25) =>
    request(`/search/binary?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}&limit=${limit}`)
};
