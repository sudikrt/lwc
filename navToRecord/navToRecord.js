import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getSingleContact from '@salesforce/apex/AccountContactController.getSingleContact';
export default class NavToRecord extends NavigationMixin( LightningElement ){

    @wire(getSingleContact) contact;
    handleClick () {
        this[NavigationMixin.Navigate] ({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.contact.data.Id,
                objectApiName : 'Contact',
                actionName : 'view'
            }
        });
    }

    handleEditClick () {
        this[NavigationMixin.Navigate] ({
            type : 'standard__recordPage',
            attributes : {
                recordId : this.contact.data.Id,
                objectApiName : 'Contact',
                actionName : 'edit'
            }
        });
    }
}