import { UrlService } from '../model/UrlService.js';
import { AlertView } from '../view/AlertView.js';

export class UrlController {
    constructor(userId, urlView) {
        this.service = new UrlService(userId);
        this.view = urlView;
        this.alert = new AlertView();

        this.userUrls = this.service.getUserUrls();

        this.view.renderUrlTable(this.userUrls, this.handleEdit.bind(this), this.handleDelete.bind(this));
        this.view.bindAddUrl(this.handleAdd.bind(this));
    }

    handleAdd(original) {
        const entry = this.service.addUrl(original);
        this.userUrls.push(entry);
        this.view.renderUrlTable(this.userUrls, this.handleEdit.bind(this), this.handleDelete.bind(this));
        this.alert.show('URL added.', 'success');
        return entry; 
    }

    handleEdit(index, newOriginal) {
        if (this.service.updateUrl(index, newOriginal, this.userUrls)) {
            this.userUrls[index].original = newOriginal;
            this.view.renderUrlTable(this.userUrls, this.handleEdit.bind(this), this.handleDelete.bind(this));
            this.alert.show('URL updated.', 'success');
        }
    }

    handleDelete(index) {
        this.service.deleteUrl(index, this.userUrls);
        this.userUrls.splice(index, 1);
        this.view.renderUrlTable(this.userUrls, this.handleEdit.bind(this), this.handleDelete.bind(this));
        this.alert.show('URL deleted.', 'warning');
    }
}
