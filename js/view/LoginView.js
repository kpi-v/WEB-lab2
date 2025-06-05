export class LoginView {
  constructor() {
    this.form = document.querySelector('#login-form');
    this.emailInput = this.form?.querySelector('#email');
    this.passwordInput = this.form?.querySelector('#password');
    this.errorContainer = document.querySelector('#error-msg') || this._createErrorBox();
  }

  bindLoginSubmit(handler) {
    if (!this.form) return;
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      handler({
        email: this.emailInput?.value.trim(),
        password: this.passwordInput?.value.trim()
      });
    });
  }

  showError(message) {
    this.errorContainer.textContent = message;
    this.errorContainer.style.display = 'block';
  }

  clearError() {
    this.errorContainer.textContent = '';
    this.errorContainer.style.display = 'none';
  }

  _createErrorBox() {
    const box = document.createElement('div');
    box.id = 'error-msg';
    box.style.color = 'red';
    box.style.display = 'none';
    this.form?.appendChild(box);
    return box;
  }
}