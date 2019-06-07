import { LightningElement, api } from 'lwc';

export default class ChartBar extends LightningElement {
    @api percentage;

    get style () {
        if (!this.percentage) {
            this.percentage = 0;
        }
        return  `width : ${this.percentage}%`;
    }
}