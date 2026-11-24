import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'SPENDWISE_DATA';

export async function loadData() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
export async function saveData(data) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {}
}
