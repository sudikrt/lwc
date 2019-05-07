import { LightningElement, wire } from 'lwc';
import getAccountContact from  '@salesforce/apex/AccountContactController.getAccountContactList'

export default class AccountContactListExample extends LightningElement {
    @wire (getAccountContact) accounts;
}