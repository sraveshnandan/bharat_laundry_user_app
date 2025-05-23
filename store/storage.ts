import { MMKV } from "react-native-mmkv";
const token_storage = new MMKV({
  id: "token_storage",
  encryptionKey: "your-encryption-key",
});

const storage = new MMKV({
  id: "app-storage",
  encryptionKey: "your-encryption-key",
});

const MMKVStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const data = storage.getString(key);
    return data ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

export { MMKVStorage, token_storage };
