import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/** LookupController.search() Apex method */
import apexSearch from '@salesforce/apex/LookupController.search';

export default class LookUpContainer extends LightningElement {
    
    // Use alerts instead of toast to notify user
    @api notifyViaAlerts = false;
    
    @track isMultiEntry = false;
    @track initialSelection = [
        {id: 'na', sObjectType: 'na', icon: 'standard:lightning_component', title: 'Inital selection', subtitle:'Not a valid record'}
    ];
    @track errors = [];

    @api sObjectApi;
    @api limit            = 10;
    @api titleField;
    @api subtitleField;
    @api listOfFields = [];
    @api iconName;

    handleLookupTypeChange(event) {
        this.initialSelection = [];
        this.errors = [];
        this.isMultiEntry = event.target.checked;
    }

    handleSearch(event) {

        let param = {};
        param.searchTerm = event.detail.searchTerm;
        param.selectedIds = event.detail.selectedIds;

        param.sObjectApiName = this.sObjectApi;
        param.limitVal = this.limit;
        param.title = this.titleField;
        param.subTitle = this.subtitleField;
        param.iconName = this.iconName;

        apexSearch(param)
            .then(results => {
                this.template.querySelector('c-lookup').setSearchResults(results);
            })
            .catch(error => {
                this.notifyUser('Lookup Error', 'An error occured while searching with the lookup field.', 'error');
                // eslint-disable-next-line no-console
                console.error('Lookup error', JSON.stringify(error));
                this.errors = [error];
            });
    }

    handleSelectionChange() {
        this.errors = [];
    }

    handleSubmit() {
        this.checkForErrors();
        if (this.errors.length === 0) {
            this.notifyUser('Success', 'The form was submitted.', 'success');
        }
    }

    checkForErrors() {
        const selection = this.template.querySelector('c-lookup').getSelection();
        if (selection.length === 0) {
            this.errors = [
                { message: 'You must make a selection before submitting!' },
                { message: 'Please make a selection and try again.' }
            ];
        } else {
            this.errors = [];
        }
    }

    notifyUser(title, message, variant) {
        if (this.notifyViaAlerts){
            // Notify via alert
            // eslint-disable-next-line no-alert
            alert(`${title}\n${message}`);
        } else {
            // Notify via toast
            const toastEvent = new ShowToastEvent({ title, message, variant });
            this.dispatchEvent(toastEvent);
        }
    }
}
