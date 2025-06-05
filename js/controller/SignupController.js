import { UserModel } from '../model/UserModel.js';
import { SignupView } from '../view/SignupView.js';
import { AlertView } from '../view/AlertView.js';

export class SignupController {
  constructor() {
    this.model = new UserModel();
    this.view = new SignupView();
    this.alert = new AlertView();

    this.view.bindSignupSubmit(this.handleSignup.bind(this));
  }

  handleSignup({ name, email, password, bday, gender }) {
    const existing = this.model.findByEmail(email);
    if (existing) {
      this.alert.show('User already exists : (', 'danger');
      return;
    }

    const newUser = { name, email, password, bday, gender };
    this.model.save(newUser);
    this.alert.show('Signup successful. Redirecting...', 'success');
    setTimeout(() => window.location.href = 'login.html', 1000);
  }
}
