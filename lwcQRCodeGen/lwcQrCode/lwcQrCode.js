import {LightningElement, api } from 'lwc';
import qrcode from './qrcode.js';

export default class LqcQRCode extends LightningElement {
    @api qrCodeString = 'Sample Hello Str';
    @api qrCodeTitle = 'QR - Code';
    renderedCallback () {
        const _qrCode = new qrcode(0, 'H');
        _qrCode.addData (this.qrCodeString);
        _qrCode.make ();
        this.template.querySelector ('.qr-code').innerHTML = _qrCode.createSvgTag ({})
    }
} 