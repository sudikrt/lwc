import { LightningElement, track, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_RECORD from '@salesforce/schema/Account';

export default class WireGetPicklistValuesByRecordType extends LightningElement {

    @track error;
    @track treeModel;

    @wire(getPicklistValuesByRecordType, {
        objectApiName: ACCOUNT_RECORD,
        recordTypeId: '0120K000000OgJMQA0'
    })wiredValues ({error, data}) {
        if (data) {
            this.error = undefined;
            // eslint-disable-next-line no-debugger
            debugger;
            this.treeModel = this.buildTreeModel(data.picklistFieldValues);
        } else {
            this.treeModel = undefined;
            this.error = error;
        }
    }
    buildTreeModel (picklistValues) {
        const treeNodes = [];
        Object.keys (picklistValues).forEach (pickList => {
            treeNodes.push ({
                label : pickList,
                items : picklistValues[pickList].values.map (item => ({
                    label : item.label,
                    name: item.value
                }))
            })
        })
        return treeNodes;
    }
}