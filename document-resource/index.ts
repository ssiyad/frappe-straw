import { api } from '../api';
import { Resource } from '../resource';

export class DocumentResource extends Resource {
  /**
   * Save this document. If successful, refresh the document.
   */
  async save() {
    return api({
      url: 'frappe.desk.form.save.savedocs',
      method: 'post',
      body: {
        doc: JSON.stringify(this.data),
        action: 'Save',
      },
    }).then(this.refresh);
  }

  /**
   * Submit this document. If successful, refresh the document.
   */
  async submit() {
    return api({
      url: 'frappe.desk.form.save.savedocs',
      method: 'post',
      body: {
        doc: JSON.stringify(this.data),
        action: 'Submit',
      },
    }).then(this.refresh);
  }

  /**
   * Cancel this document. If successful, refresh the document.
   */
  async cancel() {
    return api({
      url: 'frappe.desk.form.save.savedocs',
      method: 'post',
      body: {
        doc: JSON.stringify(this.data),
        action: 'Cancel',
      },
    }).then(this.refresh);
  }
}

/**
 * Create a `DocumentResource`.
 * @param doctype - Document type.
 * @param docname - Document name.
 * @returns `DocumentResource`
 */
export function createDocumentResource({
  doctype,
  docname,
}: {
  doctype: string;
  docname: string;
}) {
  const url = '/api/resource/' + doctype + '/' + docname;
  return new DocumentResource(url);
}
