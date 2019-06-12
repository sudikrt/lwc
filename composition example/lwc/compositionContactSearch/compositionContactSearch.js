import { LightningElement, track } from 'lwc';
import findContacts from '@salesforce/apex/AccountContactController.findContacts';
const DELAY = 350;

export default class CompositionContactSearch extends LightningElement {
    @track contacts;
    @track error;

    handleSearchChange (event) {
        window.clearTimeout(this.delayTimeout);

        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout (() => {
            findContacts ({searchKey})
            .then (result => {
                this.contacts = result;
                this.error = undefined;
            }).catch (err => {
                this.error = err;
                this.contacts = undefined;
            });
        }, DELAY);
    }
}