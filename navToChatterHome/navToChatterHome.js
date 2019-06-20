import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavToChatterHome extends NavigationMixin (LightningElement) {

    handleClick () {
        this [NavigationMixin.Navigate] ({
            type : 'standard__namedPage',
            attributes : {
                pageName : 'chatter'
            }
        });
    }
}