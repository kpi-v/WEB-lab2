export class UserModel {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.key = 'users';
  }

  getAll() {
    return JSON.parse(this.storage.getItem(this.key) || '[]');
  }

  findByEmail(email) {
    return this.getAll().find(user => user.email === email);
  }

  save(user) {
    const users = this.getAll();
    users.push(user);
    this.storage.setItem(this.key, JSON.stringify(users));
  }
}
