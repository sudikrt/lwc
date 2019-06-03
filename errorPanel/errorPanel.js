import { LightningElement, api, track } from 'lwc';
import {reduceErrors} from 'c/ldsUtils';

export default class ErrorPanel extends LightningElement {
    @api message = 'Error retrieving data';

    @track viewDetails = false;

    @api errors;


    get errorMessages () {
        return reduceErrors (this.errors);
    }
    handleCheckBoxChange (event) {
        this.viewDetails = event.target.checked;
    }
}