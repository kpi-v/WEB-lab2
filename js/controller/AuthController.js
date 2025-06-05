import { UserModel } from '../model/UserModel.js';
import { LoginView } from '../view/LoginView.js';
import { AlertView } from '../view/AlertView.js';

export class AuthController {
  constructor() {
    this.model = new UserModel();
    this.view = new LoginView();
    this.alertView = new AlertView();
    this.view.bindLoginSubmit(this.handleLogin.bind(this));
  }

  handleLogin({ email, password }) {
    this.view.clearError();

    const user = this.model.findByEmail(email);
    if (!user || user.password !== password) {
      this.alertView.show('Invalid email or password.');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = 'profile.html';
  }
}
