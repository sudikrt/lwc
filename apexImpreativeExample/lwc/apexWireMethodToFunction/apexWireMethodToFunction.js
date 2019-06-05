import { LightningElement, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/AccountContactController.getAllContact';


export default class ApexWireMethodToFunction extends LightningElement {
    @track contacts;
    @track error;
    
    @wire (getContactList)
    wiredContacts ({error, data}) {
        if (data) {
            this.contacts  = data;
            this.error = undefined;
        } else {
            this.error = error;
            this.contacts = undefined;
        }
    }
}