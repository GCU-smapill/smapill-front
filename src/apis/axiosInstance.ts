// axiosInstance.ts
import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 리프레시 요청 중복 방지를 위한 전역 변수
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: 'https://your-api.com',
  timeout: 5000,
});

// ✅ 요청 인터셉터
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.log('Token Load Error', e);
  }
  return config;
});

// ✅ 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 리프레시 요청 중복 방지
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
          const { data } = await axios.post('https://your-api.com/v1/auth/refresh', {
            refresh: refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = data.data;
          await AsyncStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
          await AsyncStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);
          return accessToken;
        })().catch(async () => {
          await AsyncStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
          await AsyncStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
          return Promise.reject(error);
        }).finally(() => {
          refreshPromise = null;
        });
      }

      // 새 토큰을 받은 후 원래 요청 재시도
      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
