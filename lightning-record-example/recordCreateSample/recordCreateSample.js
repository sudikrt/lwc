import { LightningElement, track, api } from 'lwc';

export default class RecordCreateSample extends LightningElement {
    @track contactId;
    @api recordId;
    handleSuccess (event) {
        this.contactId = event.detail.id;
        console.log (event.detail);
    }
}