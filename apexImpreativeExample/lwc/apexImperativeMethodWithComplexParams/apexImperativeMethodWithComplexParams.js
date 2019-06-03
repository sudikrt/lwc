import { LightningElement, track } from 'lwc';
import checkApexTypes from '@salesforce/apex/ApexTypesController.checkApexTypes';
export default class ApexImperativeMethodWithComplexParams extends LightningElement {
    listItemValue = 4;
    numberValue = 50;
    stringValue = 'Test';

    @track message;
    @track error;

    handleStringChange (event) {
        this.stringValue = event.target.value;
    }
    handleNumberChange (event) {
        this.numberValue = event.target.value;
    }

    handleListItemChange (event) {
        this.listItemValue = event.target.value;
    }

    handleButtonClick () {
        let paramObj = {
            someString : this.stringValue,
            someInteger : this.numberValue,
            someList: []
        };
        for (let i = 0; i < this.listItemValue; i++) {
            paramObj.someList.push (
                {
                    someInnerString : this.stringValue,
                    someInnerInteger : this.numberValue
                }
            );
        }
        checkApexTypes ({wrapper : paramObj})
            .then (result => {
                this.message = result;
                this.error = undefined;
            })
            .catch (error => {
                this.message = undefined;
                this.error = error;
            });

    }
}