export class UrlService {
  constructor(userId) {
    this.userId = userId;
    this.storageKey = 'shortenedUrls';
    this.urls = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getUserUrls() {
    return this.urls.filter(url => url.userId === this.userId);
  }

  addUrl(original) {
    const short = 'kv21.me/' + Math.random().toString(36).substring(2, 8);
    const entry = { userId: this.userId, original, short };
    this.urls.push(entry);
    this._persist();
    return entry;
  }

  updateUrl(index, newOriginal, userUrls) {
    const target = userUrls[index];
    const globalIndex = this.urls.findIndex(u => u.userId === this.userId && u.short === target.short);
    if (globalIndex !== -1) {
      this.urls[globalIndex].original = newOriginal;
      this._persist();
      return true;
    }
    return false;
  }

  deleteUrl(index, userUrls) {
    const target = userUrls[index];
    this.urls = this.urls.filter(u => !(u.userId === this.userId && u.short === target.short));
    this._persist();
  }

  _persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.urls));
  }
}
