import { UrlController } from './UrlController.js';
import { UrlView } from '../view/UrlView.js';

export class HomepageController {
  constructor() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    let userId;

    if (user?.email) {
      userId = user.email;
    } else {
      // Plug/guest identity
      if (!localStorage.getItem('guestId')) {
        const anonId = 'anon_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('guestId', anonId);
      }
      userId = localStorage.getItem('guestId');
    }

    new UrlController(userId, new UrlView());
  }
}
