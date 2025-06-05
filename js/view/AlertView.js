export class AlertView {
  constructor(containerId = 'alert-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      document.body.appendChild(this.container);
    }
  }

  show(message, type = 'danger', timeout = 1500) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    this.container.appendChild(alert);

    if (timeout) {
      setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), timeout / 3);
      }, timeout);
    }
  }

  clearAll() {
    this.container.innerHTML = '';
  }
}