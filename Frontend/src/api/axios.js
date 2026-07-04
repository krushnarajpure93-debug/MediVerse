import axios from "axios";

/* =====================================================
   📌 AXIOS INSTANCE
===================================================== */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================================================
   📌 REQUEST INTERCEPTOR
===================================================== */

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* =====================================================
   📌 RESPONSE INTERCEPTOR
===================================================== */

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expired or invalid
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      console.error("Access denied:", error.response?.data?.message);
    }

    return Promise.reject(error);
  },
);

/* =====================================================
   📌 AUTH FUNCTIONS
===================================================== */

// Get Current User
export const getCurrentUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch {
    return null;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (res.data?.success && res.data?.token) {
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return { success: true, data: res.data };
    }

    return { success: false, message: "Invalid credentials" };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

// Register
export const register = async (userData) => {
  try {
    const res = await axiosInstance.post("/auth/register", userData);

    if (res.data?.success && res.data?.token) {
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return { success: true, data: res.data };
    }

    return { success: false, message: "Registration failed" };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Registration failed",
    };
  }
};

// Logout
export const logout = async () => {
  try {
    await axiosInstance.get("/auth/logout");
  } catch {
    // ignore
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};

/* =====================================================
   📌 HELPER FUNCTIONS
===================================================== */

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

export const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const getUserRole = () => {
  const user = getUserData();
  return user?.role || null;
};

export default axiosInstance;
