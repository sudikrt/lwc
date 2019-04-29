import { LightningElement,track, createElement } from 'lwc';


import Modal from 'c-modal';
import GenModal from 'c-gen_modal'

export default class TestingApp extends LightningElement {

    constructor() {
        super();
    }
    connectedCallback() {

    }  
    openModal() {  
        if (!document.body.querySelector('c-gen-modal')) {
            const element = createElement('c-gen-modal', { is: GenModal });
            document.body.appendChild(element);
            element.addEventListener ('selected', function (event) {
                console.log (event.detail);
            });
        }
         
        if (!document.body.querySelector('c-modal')) {
            const element = createElement('c-modal', { is: Modal });
           // document.body.appendChild(element);   
        }
        
        //document.body.querySelector('c-modal').openModal();
    }
}

 