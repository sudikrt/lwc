import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavToHome extends NavigationMixin(LightningElement) {
    onNavHomeclick () {
        this[NavigationMixin.Navigate]({
            type : 'standard__namedPage',
            attributes : {
                pageName : 'home'
            }
        });
    }
}