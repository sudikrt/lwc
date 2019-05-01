import { LightningElement, track, api } from 'lwc';

export default class RecordCreateOverrideDefaultBehaviourSample extends LightningElement {
    @track contactId;
    @api recordId;
    handleSubmit (event) {
        event.preventDefault ();
        const fields = event.detail.fields;

        console.log(JSON.stringify(fields));

        fields.Title = 'Head Ops';
        fields.Phone = '2123123123';
        //fields.LeadSource = 'Web';
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    handleSuccess (event) {
        this.contactId = event.detail.id;
        console.log (event.detail);
    }
}