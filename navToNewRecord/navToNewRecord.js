import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavToNewRecord extends NavigationMixin (LightningElement) {

    handleOnclick () {
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes: {
                objectApiName : 'Contact',
                actionName : 'new'
            }
        });
    }
}