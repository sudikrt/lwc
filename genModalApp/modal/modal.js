import { LightningElement,track, api } from 'lwc';
 
export default class Modal extends LightningElement {
     @track bShowModal = false;
 
    /* javaScipt functions start */ 
    @api
    openModal() {    
        // to open modal window set 'bShowModal' tarck value as true
        this.bShowModal = true;
    }
    
    @api
    closeModal() {   
        // to close modal window set 'bShowModal' tarck value as false
        //this.bShowModal = false;
        document.body.querySelector('c-modal').parentNode.removeChild (document.body.querySelector('c-modal'))
    }
    /* javaScipt functions end */ 
}
 