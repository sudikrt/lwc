import { LightningElement, track, api } from 'lwc';

export default class Clock extends LightningElement {
    @track timeStamp = new Date ();

    @api
    refresh () {
        this.timeStamp = new Date ();
    }
}