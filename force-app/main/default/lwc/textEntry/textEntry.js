import { LightningElement, track } from 'lwc';

export default class TextEntry extends LightningElement {
    @track charsLeft = 160;

    inputChange(event){
        const bodyInput = event.target.value;
        this.charsLeft = 160 - bodyInput.length;
    }
}