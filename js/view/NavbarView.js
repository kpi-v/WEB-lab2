export class NavbarView {
  constructor() {
    this.loginBtn = document.getElementById('login-btn');
    this.signupBtn = document.getElementById('signup-btn');
    this.helloUser = document.getElementById('hello-user');
  }

  update() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
      this.helloUser.textContent = user.name || user.email || 'User';
      this.helloUser.classList.remove('d-none');
      this.loginBtn?.classList.add('d-none');
      this.signupBtn?.classList.add('d-none');
    } else {
      this.helloUser?.classList.add('d-none');
      this.loginBtn?.classList.remove('d-none');
      this.signupBtn?.classList.remove('d-none');
    }
  }
}
