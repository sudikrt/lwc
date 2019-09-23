import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class YtPlayerForRecordPage extends LightningElement {

    @api fieldName;
    @api objectApiName;
    @api recordId;

    @wire (getRecord, {recordId: '$recordId', fields:'$fields'})
    record;

    get youTubeId () {
        return this.record && this.record.data ? this.record.data.fields[this.fieldName].value : '';
    }

    get fields () {
        return [this.objectApiName + '.' + this.fieldName];
    }


}