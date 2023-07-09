// 哈希表 + 有序
class LRUCache {
  constructor(num) {
    this.num = num;
    this.data = new Map();
  }
  get(key) {
    if (!this.data.has(key)) return null;
    const value = this.data.get(key);
    this.data.delete(key);
    this.data.set(key, value);
  }
  set(key, value) {
    if (this.data.get(key)) {
      this.data.delete(key);
    }
    this.data.set(key, value);
    if (this.data.size > num) {
      const key = this.data.keys().next.value;
      this.data.delete(key);
    }
  }
}
