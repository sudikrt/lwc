import { LightningElement, api } from 'lwc';

export default class RecordFormDynamicContact extends LightningElement {
    @api objectApiName;
    @api recordId;
    fields = ['AccountId', 'Name', 'Title', 'Phone', 'Email'];
}