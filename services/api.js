import axios from 'axios';
import Constants from 'expo-constants';
import { getToken } from '../utils/authStorage';

// Get API URL from environment variables or use default
// For development: Use your computer's IP address (e.g., 'http://192.168.1.100:8080')
// For production: Use your production server URL
const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ||
  process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:4000/api";

// Log the API URL being used (remove in production)
console.log('API Base URL:', API_BASE_URL);

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== AUTHENTICATION ====================
export const authAPI = {
  // Login CHW (Mobile) - calls the Spring Boot backend /mobile/healthworkers/login endpoint
  login: (credentials) => api.post('/mobile/healthworkers/login', credentials),
  
  // Register CHW (Mobile)
  signup: (userData) => api.post('/mobile/healthworkers/register', userData),
  
  // Note: The MotherLink2 API doesn't have forgot-password, verify, reset-password, logout endpoints for mobile
  // These may need to be implemented or handled differently
  // forgotPassword: (phoneNumber) => api.post('/mobile/health-worker/forgot-password', { phoneNumber }),
  // verifyOTP: (data) => api.post('/mobile/health-worker/verify', data),
  // resetPassword: (data) => api.post('/mobile/health-worker/reset-password', data),
  // logout: () => api.post('/mobile/health-worker/logout'),
};

// ==================== HOME ====================
export const homeAPI = {
  // Get overview statistics
  getOverview: () => api.get('/mobile/home/overview'),
  
  // Get today's appointments
  getTodayAppointments: () => api.get('/mobile/home/appointments/today'),
  
  // Get calendar data
  getCalendarData: (month, year) => api.get(`/mobile/home/calendar?month=${month}&year=${year}`),
};

// ==================== MOTHER MANAGEMENT ====================
export const motherAPI = {
  // Get all mothers
  getAllMothers: () => api.get('/mobile/healthworkers/allMothers'),
  
  // Get total mothers count
  getTotalMothers: () => api.get('/mobile/healthworkers/totalMothers'),
  
  // Create mother
  createMother: (motherData) => api.post('/mobile/healthworkers/createMother', motherData),
  
  // Update mother
  updateMother: (id, motherData) => api.put(`/mobile/healthworkers/update/${id}`, motherData),
  
  // Delete mother
  deleteMother: (id) => api.delete(`/mobile/healthworkers/delete/${id}`),
  
  // Note: Some endpoints like getMotherById, searchMothers may need to be implemented
  // getMotherById: (id) => api.get(`/api/mothers/${id}`),
  // searchMothers: (query) => api.get(`/api/mothers/search?q=${query}`),
};

// ==================== CHILD MANAGEMENT ====================
export const childAPI = {
  // Get all children
  getAllChildren: (params) => api.get('/api/children', { params }),
  
  // Get child by ID
  getChildById: (id) => api.get(`/api/children/${id}`),
  
  // Register new child
  registerChild: (childData) => api.post('/api/children', childData),
  
  // Update child
  updateChild: (id, childData) => api.put(`/api/children/${id}`, childData),
  
  // Delete child
  deleteChild: (id) => api.delete(`/api/children/${id}`),
  
  // Get child statistics
  getChildStats: () => api.get('/api/children/stats'),
  
  // Search children
  searchChildren: (query) => api.get(`/api/children/search?q=${query}`),
};

// ==================== APPOINTMENTS ====================
export const appointmentAPI = {
  // Get upcoming appointments
  getUpcomingAppointments: () => api.get('/mobile/healthworkers/appointments/upcoming'),
  
  // Note: Other appointment endpoints may need to be implemented or use admin endpoints
  // getAllAppointments: (params) => api.get('/api/appointments', { params }),
  // getAppointmentById: (id) => api.get(`/api/appointments/${id}`),
  // createAppointment: (appointmentData) => api.post('/api/appointments', appointmentData),
  // updateAppointment: (id, appointmentData) => api.put(`/api/appointments/${id}`, appointmentData),
  // deleteAppointment: (id) => api.delete(`/api/appointments/${id}`),
  // getAppointmentStats: () => api.get('/api/appointments/stats'),
  // getAppointmentsByStatus: (status) => api.get(`/api/appointments/status/${status}`),
  // completeAppointment: (id) => api.post(`/api/appointments/${id}/complete`),
};

// ==================== NOTIFICATIONS ====================
export const notificationAPI = {
  // Get today's notifications
  getTodayNotifications: () => api.get('/mobile/healthworkers/notifications/today'),
  
  // Note: Other notification endpoints may need to be implemented or use admin endpoints
  // getAllNotifications: (params) => api.get('/api/notifications', { params }),
  // getNotificationById: (id) => api.get(`/api/notifications/${id}`),
  // markAsRead: (id) => api.put(`/api/notifications/${id}/read`),
  // markAllAsRead: () => api.put('/api/notifications/read-all'),
  // deleteNotification: (id) => api.delete(`/api/notifications/${id}`),
  // getNotificationsByType: (type) => api.get(`/api/notifications/type/${type}`),
};

// ==================== ANALYTICS ====================
export const analyticsAPI = {
  // Get analytics data
  getAnalytics: (period) => api.get(`/api/analytics?period=${period}`),
  
  // Get antenatal appointments chart data
  getAntenatalChartData: (period) => api.get(`/api/analytics/antenatal-chart?period=${period}`),
  
  // Get attendance overview
  getAttendanceOverview: () => api.get('/api/analytics/attendance'),
  
  // Get emergency overview
  getEmergencyOverview: () => api.get('/api/analytics/emergency'),
};

// ==================== HOME VISITS ====================
export const homeVisitAPI = {
  // Get all home visits
  getAllHomeVisits: (params) => api.get('/api/home-visits', { params }),
  
  // Get home visit by ID
  getHomeVisitById: (id) => api.get(`/api/home-visits/${id}`),
  
  // Create home visit
  createHomeVisit: (visitData) => api.post('/api/home-visits', visitData),
  
  // Update home visit
  updateHomeVisit: (id, visitData) => api.put(`/api/home-visits/${id}`, visitData),
  
  // Delete home visit
  deleteHomeVisit: (id) => api.delete(`/api/home-visits/${id}`),
};

// ==================== HOUSE DETAILS ====================
export const houseAPI = {
  // Get all houses
  getAllHouses: (params) => api.get('/api/houses', { params }),
  
  // Get house by ID
  getHouseById: (id) => api.get(`/api/houses/${id}`),
  
  // Create house
  createHouse: (houseData) => api.post('/api/houses', houseData),
  
  // Update house
  updateHouse: (id, houseData) => api.put(`/api/houses/${id}`, houseData),
  
  // Delete house
  deleteHouse: (id) => api.delete(`/api/houses/${id}`),
  
  // Search houses
  searchHouses: (query) => api.get(`/api/houses/search?q=${query}`),
};

// ==================== EMERGENCIES ====================
export const emergencyAPI = {
  // Get all emergencies
  getAllEmergencies: (params) => api.get('/api/emergencies', { params }),
  
  // Get emergency by ID
  getEmergencyById: (id) => api.get(`/api/emergencies/${id}`),
  
  // Create emergency record
  createEmergency: (emergencyData) => api.post('/api/emergencies', emergencyData),
  
  // Update emergency
  updateEmergency: (id, emergencyData) => api.put(`/api/emergencies/${id}`, emergencyData),
  
  // Delete emergency
  deleteEmergency: (id) => api.delete(`/api/emergencies/${id}`),
  
  // Get emergency statistics
  getEmergencyStats: () => api.get('/api/emergencies/stats'),
};

// ==================== PROFILE ====================
export const profileAPI = {
  // Get user profile
  getProfile: () => api.get('/api/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/api/profile', profileData),
  
  // Change password
  changePassword: (passwordData) => api.put('/api/profile/password', passwordData),
};

export default api;

