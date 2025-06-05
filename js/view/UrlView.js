export class UrlView {
  constructor() {
    this.tabContainer = document.getElementById('url-table-body');
    this.addUrlBtn = document.getElementById('add-url-btn');
    this.urlModal = new bootstrap.Modal(document.getElementById('urlModal'));
    this.urlInput = document.getElementById('urlInput');
    this.shortDisplay = document.getElementById('shortCodeDisplay');
    this.modalSaveBtn = document.getElementById('urlModalSave');
  }

  bindAddUrl(callback) {
    this.addUrlBtn?.addEventListener('click', () => {
      const destinationInput = document.querySelector('#new-url-input');
      this.urlInput.value = destinationInput?.value.trim() || '';
      this.shortDisplay.value = '(auto-generated)';
      this.modalSaveBtn.textContent = 'Save';
      this.modalSaveBtn.disabled = false;
      this.urlModal.show();

      this.modalSaveBtn.onclick = () => {
        const target = this.urlInput.value.trim();
        if (!target) return;

        const newEntry = callback(target);
        if (newEntry && newEntry.short) {
          const shortCode = newEntry.short.replace(/^https?:\/\//, '').replace(/^.*\//, '');
          this.shortDisplay.value = shortCode;

          this.modalSaveBtn.textContent = 'Copied!';
          this.modalSaveBtn.onclick = null;

          const copyBtn = document.createElement('button');
          copyBtn.className = 'btn btn-outline-secondary ms-2';
          copyBtn.textContent = 'Copy';
          copyBtn.onclick = () => {
            navigator.clipboard.writeText(newEntry.short);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
          };

          this.shortDisplay.parentElement.appendChild(copyBtn);

          this.modalSaveBtn.disabled = true;
        } else {
          this.urlModal.hide();
        }
      };
    });
  }

  renderUrlTable(urls, onEdit, onDelete) {
    if (!this.tabContainer) return;
    this.tabContainer.innerHTML = '';
    urls.forEach(({ short, original }, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${original}</td>
        <td><a href="${short}" target="_blank">${short}</a></td>
        <td>
          <button class="btn btn-sm btn-outline-primary edit-url">Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-url">Delete</button>
        </td>
      `;
      const editBtn = row.querySelector('.edit-url');
      const deleteBtn = row.querySelector('.delete-url');
      editBtn?.addEventListener('click', () => {
        this.urlInput.value = original;
        this.shortDisplay.value = short.replace(/^https?:\/\//, '').replace(/^.*\//, '');
        this.modalSaveBtn.textContent = 'Save';
        this.modalSaveBtn.disabled = false;
        this.urlModal.show();
        this.modalSaveBtn.onclick = () => {
          const newUrl = this.urlInput.value.trim();
          if (newUrl) onEdit(index, newUrl);
          this.urlModal.hide();
        };
      });
      deleteBtn?.addEventListener('click', () => onDelete(index));
      this.tabContainer.appendChild(row);
    });
  }
}
