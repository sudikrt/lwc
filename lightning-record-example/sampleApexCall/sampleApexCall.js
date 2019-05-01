import { LightningElement, wire } from 'lwc';

import sayHello from '@salesforce/apex/HelloWorld.sayHello'
export default class SampleApexCall extends LightningElement {
    @wire(sayHello) result;
}