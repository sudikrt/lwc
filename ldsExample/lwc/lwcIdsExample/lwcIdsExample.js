import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getSingleContact_t from '@salesforce/apex/AccountContactController.getSingleContact'
export default class LwcIdsExample extends NavigationMixin (LightningElement) {
    @wire(getSingleContact_t) contact;

    navigateToContact () {
        this [NavigationMixin.Navigate] ({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.contact.data.Id,
                objectApiName : 'Contact',
                actionName : 'view'
            }
        })
    }


}