import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@motherlink/token";
const WORKER_KEY = "@motherlink/worker";

export const saveSession = async (token, worker) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token || ""],
      [WORKER_KEY, JSON.stringify(worker || {})],
    ]);
  } catch (error) {
    console.warn("Failed to save session", error);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY);
    return value || null;
  } catch (error) {
    console.warn("Failed to read auth token", error);
    return null;
  }
};

export const getWorker = async () => {
  try {
    const value = await AsyncStorage.getItem(WORKER_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn("Failed to read worker profile", error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, WORKER_KEY]);
  } catch (error) {
    console.warn("Failed to clear auth session", error);
  }
};

