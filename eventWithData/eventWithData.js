import { LightningElement, track, wire } from 'lwc';
import getAllContact from '@salesforce/apex/AccountContactController.getAllContact';

export default class EventWithData extends LightningElement {
    @track selectedContact;

    @wire(getAllContact) contacts;

    handleOnSelect (event) {
        const contactId = event.detail;
        this.selectedContact = this.contacts.data.find (contact => contact.Id === contactId);
    }
}