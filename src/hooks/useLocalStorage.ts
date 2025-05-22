// hooks/useAsyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key: string) => {
  const setItem = async (value: unknown) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.log('SetItem Error:', error);
    }
  };

  const getItem = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? item : null;
    } catch (error) {
      console.log('GetItem Error:', error);
      return null;
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('RemoveItem Error:', error);
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};
