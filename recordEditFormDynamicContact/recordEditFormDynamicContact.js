import { LightningElement, api } from 'lwc';

export default class RecordEditFormDynamicContact extends LightningElement {
    @api objectApiName;
    @api recordId;
}