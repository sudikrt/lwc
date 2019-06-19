import { LightningElement, wire } from 'lwc';
import getAllContact from '@salesforce/apex/AccountContactController.getAllContact';

export default class ContactList extends LightningElement {
    @wire (getAllContact) contacts;

    handleSelect (event) {
        event.preventDefault ();

        const selectEvent = new CustomEvent ('contactSelect', {
            detail : {contactId : event.currentTarget.dataSet.contactId}
        });
        this.dispatchEvent (selectEvent);
    }
}