import { LightningElement, api } from 'lwc';

export default class CompositionWithAppBuilder extends LightningElement {
    @api pickListValue;
    @api stringValue;
    @api numberValue;
}