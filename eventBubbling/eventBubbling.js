import { LightningElement, track, wire } from 'lwc';
import getAllContact from '@salesforce/apex/AccountContactController.getAllContact';

export default class EventBubbling extends LightningElement {

    @track selectedContact;

    @wire(getAllContact) contacts;

    handleOnSelect (event) {
        this.selectedContact = event.target.contact;
    }
}