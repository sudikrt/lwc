import { LightningElement, api } from 'lwc';

export default class ContactListItem extends LightningElement {
    @api contact;

    handleClick (event) {
        event.preventDefault();
        const selectEvent = new CustomEvent ('select', {detail: this.contact.Id});
        this.dispatchEvent (selectEvent);
    }
}