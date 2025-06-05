import { ProfileView } from '../view/ProfileView.js';
import { AlertView } from '../view/AlertView.js';
import { UrlController } from './UrlController.js';
import { UrlView } from '../view/UrlView.js';

export class ProfileController {
  constructor() {
    this.view = new ProfileView();
    this.alert = new AlertView();
    this.user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!this.user) {
      window.location.href = 'login.html';
      return;
    }

    this.view.renderUserName(this.user);
    this.view.bindUpdateProfile(this.handleUpdate.bind(this));
    this.view.bindProfileChangeDetection(this.user);
    this.view.bindProfileCancel(JSON.parse(JSON.stringify(this.user)));

    new UrlController(this.user.email, new UrlView());

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
      });
    }
  }

  handleUpdate(updatedUser) {
    if (!updatedUser.name || !updatedUser.email) {
      this.alert.show('Name and Email are required.', 'danger');
      return;
    }
    this.user = { ...this.user, ...updatedUser };
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.view.renderUserName(this.user);
    this.alert.show('Profile updated.', 'success');
    this.view.disableUpdateButton();
  }
}
