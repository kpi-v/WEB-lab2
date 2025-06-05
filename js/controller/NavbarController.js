import { NavbarView } from '../view/NavbarView.js';

export class NavbarController {
  constructor() {
    this.view = new NavbarView();
    this.view.update();
  }
}
