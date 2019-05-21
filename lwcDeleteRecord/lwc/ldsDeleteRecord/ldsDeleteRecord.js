import { LightningElement, track, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import {deleteRecord} from 'lightning/uiRecordApi';
import getAccountList from  '@salesforce/apex/AccountContactController.getAccountList';


export default class LdsDeleteRecord extends LightningElement {
    @track accounts;

    wiredAccountsResult;

    @wire (getAccountList) 
    wireAccounts (result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = result.data;
        } else {
            this.accounts = undefined;
        }
    }

    deleteAccount (event) {
        deleteRecord (event.target.dataset.recordid)
        .then ( () => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account deleted',
                    variant: 'success'
                })
            );
            return refreshApex (this.wiredAccountsResult)
        })
        .catch (error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.toString (),
                    variant: 'error'
                })
            );
        })
    }
}