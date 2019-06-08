import { LightningElement, track, api } from 'lwc';

export default class TodoList extends LightningElement {

    @track filteredTodos = [];

    _todo = [];

    priorityFilter = false;

    @api
    get todos () {
        return this._todo;
    }
    set todos (val) {
        this._todo = val;
        this.filterTodos ();
    }

    filterTodos () {
        if (this.priorityFilter) {
            this.filteredTodos = this._todo.filter (
                todo => todo.priority === true
            );
        } else {
            this.filteredTodos = this._todo;
        }
    }


    handleCheckboxChange (event) {
        this.priorityFilter = event.target.checked;
        this.filterTodos();
    }
}