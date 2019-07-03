import { LightningElement, track } from 'lwc';

export default class MiscDomQuery extends LightningElement {
    @track selectionItems;

    oncheckboxChange () {
        const checked = Array.from (
            this.template.querySelectorAll ('lightning-input')
        ).filter (ele => ele.checked)
        .map (ele => ele.label);
        this.selectionItems = checked.join (', ');
    }
}