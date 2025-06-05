export class ProfileView {
  constructor() {
    this.nameContainer = document.getElementById('profile-name');
    this.tabContainer = document.getElementById('url-table-body');
    this.updateBtn = document.getElementById('update-profile-btn');
    this.cancelBtn = document.getElementById('cancel-profile-btn');
    this.addUrlBtn = document.getElementById('add-url-btn');
  }

  renderUserName(user) {
    if (!user || typeof user !== 'object') return;

    if (this.nameContainer && user.name) {
      this.nameContainer.textContent = `Hello, ${user.name}`;
    }

    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');
    const genderField = document.querySelector('#gender');
    const bdayField = document.querySelector('#bday');

    if (nameField) nameField.value = user.name ?? '';
    if (emailField) emailField.value = user.email ?? '';
    if (genderField) genderField.value = user.gender ?? '';
    if (bdayField) bdayField.value = user.bday ?? '';

    this.disableUpdateButton();
  }

  bindUpdateProfile(handler) {
    this.updateBtn?.addEventListener('click', () => {
      const updatedUser = {
        name: document.querySelector('#name')?.value.trim(),
        email: document.querySelector('#email')?.value.trim(),
        gender: document.querySelector('#gender')?.value,
        bday: document.querySelector('#bday')?.value
      };
      handler(updatedUser);
    });
  }

  bindProfileChangeDetection(originalUser) {
    const fields = ['name', 'email', 'gender', 'bday'].map(id => document.querySelector(`#${id}`));
    const compare = () => {
      const changed = fields.some(field => {
        if (!field) return false;
        return field.value.trim() !== (originalUser[field.id] || '');
      });
      this.updateBtn.disabled = !changed;
    };
    fields.forEach(field => field?.addEventListener('input', compare));
    compare();
  }

  bindProfileCancel(originalUser) {
    this.cancelBtn?.addEventListener('click', () => {
      const userFromStorage = JSON.parse(localStorage.getItem('loggedInUser')) || originalUser;
      this.renderUserName(userFromStorage);
      this.disableUpdateButton();
    });
  }

  bindAddUrl(callback) {
    this.addUrlBtn?.addEventListener('click', () => {
      const target = prompt("Enter destination URL:");
      if (target && target.trim()) {
        callback(target.trim());
      }
    });
  }

  renderUrlTable(urls, onEdit, onDelete) {
    if (!this.tabContainer) return;
    this.tabContainer.innerHTML = '';
    urls.forEach(({ short, original }, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td contenteditable="true" class="editable-url">${original}</td>
        <td><a href="${short}" target="_blank">${short}</a></td>
        <td>
          <button class="btn btn-sm btn-outline-primary edit-url">Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-url">Delete</button>
        </td>
      `;
      const editBtn = row.querySelector('.edit-url');
      const deleteBtn = row.querySelector('.delete-url');
      editBtn?.addEventListener('click', () => {
        const newUrl = prompt("Update destination URL:", row.children[1].textContent);
        if (newUrl) onEdit(index, newUrl);
      });
      deleteBtn?.addEventListener('click', () => onDelete(index));
      this.tabContainer.appendChild(row);
    });
  }

  disableUpdateButton() {
    if (this.updateBtn) this.updateBtn.disabled = true;
  }
}
