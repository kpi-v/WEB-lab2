export class SignupView {
  constructor() {
    this.form = document.querySelector('#signup-form');
    this.nameInput = this.form?.querySelector('#name');
    this.emailInput = this.form?.querySelector('#email');
    this.passwordInput = this.form?.querySelector('#password');
    this.bdayInput = this.form?.querySelector('#bday');
    this.genderInput = this.form?.querySelector('#gender');
  }

  bindSignupSubmit(handler) {
    if (!this.form) return;
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      handler({
        name: this.nameInput?.value.trim(),
        email: this.emailInput?.value.trim(),
        password: this.passwordInput?.value.trim(),
        bday: this.bdayInput?.value,
        gender: this.genderInput?.value
      });
    });
  }
}
