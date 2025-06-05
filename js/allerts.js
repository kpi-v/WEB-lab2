function showAlert(message, type = 'danger', timeout = 1500) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');

    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    alertContainer.appendChild(alert);

    if (timeout) {
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), timeout/3);
        }, timeout);
    }
}