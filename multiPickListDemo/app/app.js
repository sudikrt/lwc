import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track
    state = {
        title: 'Welcome to Lightning Web Components Playground!',
    };

    @track yourSelectedValues;
    get options() {
        return [
            {
                label: 'supports',
                value: 'supports',
            },
            {
                label: 'has ability to show',
                value: 'shows',
            },
        ];
    }

    get msOptions () {
        return [{'key':1,'value':'Jaipur'},
                       {'key':2,'value':'Pune', 'selected' : true},
                       {'key':3,'value':'Hyderabad'},
                       {'key':4,'value':'Banglore'},
                       {'key':5,'value':'Gurgaon'},
                       {'key':6,'value':'Mumbai'},
                       {'key':7,'value':'Chennai'},
                       {'key':8,'value':'Noida'},
                       {'key':9,'value':'Delhi'},];
    }

    getSelectedItems () {
        this.yourSelectedValues = '';
        let self = this;
        this.template.querySelector ('c-multi-pick-list').getSelectedItems().forEach (function (eachItem) {
                console.log (eachItem.value);
                self.yourSelectedValues += eachItem.value + ', ';
        });
    }

    handleOnItemSelected (event) {
        if (event.detail) {
            this.yourSelectedValues = '';
            let self = this;
            
            event.detail.forEach (function (eachItem) {
                    console.log (eachItem.value);
                    self.yourSelectedValues += eachItem.value + ', ';
            });
        }
    }
}
