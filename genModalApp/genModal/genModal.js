import { LightningElement, api } from 'lwc';

export default class GenModal extends LightningElement {
    @api title = 'Generic Alert Modal';
    @api textCancel = 'Cancel';
    @api textOk = 'Ok';
    @api message = 'Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad dolore quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing.';

    clickCancel (event) {
        this.sendResult ('cancel');
    }
    clickOk (event) {
        this.sendResult ('ok');
    }
    sendResult (res) {
        const evt = new CustomEvent ('selected', { detail : res});
        this.dispatchEvent (evt);
        document.body.querySelector('c-gen-modal').parentNode.removeChild (document.body.querySelector('c-gen-modal'))
        //document.querySelector ('c-gen-modal').parentNode.removeChild (document.querySelector ('c-gen-modal'))
    }

}