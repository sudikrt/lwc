import { LightningElement, api } from 'lwc';

export default class RecordEditSample extends LightningElement {
    @api recordId;
    handleSubmit (event) {
        console.log('onsubmit: '+ event.detail.fields);
    }
    handleSuccess (event) {
        console.log('Success :' + event.detail.id);
    }
}