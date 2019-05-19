import { LightningElement, track, api } from 'lwc';

const MINIMAL_SEARCH_TERM_LENGTH = 2; // Min number of chars required to search
const SEARCH_DELAY = 300; // Wait 300 ms after user stops typing then, peform search

export default class Lookup extends LightningElement {

    @api label;
    @api isMultiEntry       = false;
    @api selection          = [];
    @api errors             = [];
    @api placeHolder        = '';
    @api scrollAfterNItems;

    @track hasFocus         = false;
    @track searchResults    = [];
    @track searchTerm       = '';


    blurTimeout;
    cleanSearchTerm;
    searchThrottlingTimeout;

    @api
    setSearchResults(results) {
        this.searchResults = results.map(result => {
            if (typeof result.icon === 'undefined') {
                result.icon = 'standard:default';
            }
            return result;
        });
    }

    @api
    getSelection() {
        return this.selection;
    }


    hasResults () {
        return this.searchResults.length > 0;
    }
    hasSelection () {
        return this.selection.length > 0;

    }
    isSelectionAllowed () {
        if (this.isMultiEntry) {
            return true;
        }
        return !this.hasSelection ();
    }
    handleFocus () {
        if (!this.isSelectionAllowed ()) {
            return;
        }
        this.hasFocus = true;
    }
    handleblur () {
        //prevent action if its not allowed
        if (!this.isSelectionAllowed ()) {
            return;
        } 
        // Delay hiding combobox so that we can capture selected result
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.blurTimeout = window.setTimeout (() => {
            this.hasFocus = false;
            this.blurTimeout = null;
        }, 300);
    }

    handleInput (event) {
        if (!this.isSelectionAllowed ()) {
            return;
        }
        this.updateSearchTerm(event.target.value)
    }

    handleClearSelection() {
        this.selection = [];
        // Notify parent components that selection has changed
        this.dispatchEvent(new CustomEvent('selectionchange'));
    }

    handleComboboxClick () {
        if (this.blurTimeout) {
            window.clearTimeout(this.blurTimeout);
        }
        this.hasFocus = false;
    }

    updateSearchTerm(newSearchTerm) { 
        this.searchTerm = newSearchTerm;
        const newCleanSearchTerm = newSearchTerm.trim ().replace (/\*/g, '').toLowerCase ();
        if (this.cleanSearchTerm === newCleanSearchTerm) {
            return;
        }
        this.cleanSearchTerm = newCleanSearchTerm;

        if (newCleanSearchTerm.length < MINIMAL_SEARCH_TERM_LENGTH) {
            this.searchResults = [];
            return;
        }

        if (this.searchThrottlingTimeout) {
            clearTimeout (this.searchThrottlingTimeout);
        }

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.searchThrottlingTimeout = setTimeout (() => {
            if (this.cleanSearchTerm.length > MINIMAL_SEARCH_TERM_LENGTH) {
                const searchEvent = new CustomEvent ('search', {
                    detail : {
                        searchTerm: this.cleanSearchTerm,
                        selectedIds: this.selection.map(element => element.id)
                    }
                });
                this.dispatchEvent (searchEvent);
            }
            this.searchThrottlingTimeout = null;
        }, SEARCH_DELAY);
    }

    handleResultClick(event) {
        const recordId = event.currentTarget.dataset.recordid;

        // Save selection
        let selectedItem = this.searchResults.filter(result => result.id === recordId);
        if (selectedItem.length === 0) {
            return;
        }
        selectedItem = selectedItem[0];
        const newSelection = [...this.selection];
        newSelection.push(selectedItem);
        this.selection = newSelection;

        // Reset search
        this.searchTerm = '';
        this.searchResults = [];

        // Notify parent components that selection has changed
        this.dispatchEvent(new CustomEvent('selectionchange'));
    }

    handleRemoveSelectedItem(event) {
        const recordId = event.currentTarget.name;
        this.selection = this.selection.filter(item => item.id !== recordId);
        // Notify parent components that selection has changed
        this.dispatchEvent(new CustomEvent('selectionchange'));
    }

    get listboxClass ()  {
        return 'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid '
        + (this.scrollAfterNItems ? 'slds-dropdown_length-with-icon-' + this.scrollAfterNItems : '');
    }
    get clearSelectionButtonClass() {
        return 'slds-button slds-button_icon slds-input__icon slds-input__icon_right '
            + (this.hasSelection() ? '' : 'slds-hide');
    }
    get searchIconClass () {
        let css = 'slds-input__icon slds-input__icon_right ';
        if (!this.isMultiEntry) {
            css += (this.hasSelection() ? 'slds-hide' : '');
        }
        return css;
    }

    get containerClass () {
        let css = 'slds-combobox_container slds-has-inline-listbox ';
        if (this.hasFocus && this.hasResults ()) {
            css += 'slds-has-input-focus ';
        } 
        if (this.errors.length > 0) {
            css += 'has-custom-error';
        }
        return css;
    }

    get dropDownClass () {
        let css = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ';
        if (this.hasFocus && this.hasResults ()) {
            css += 'slds-is-open';
        }
        else {
            css += 'slds-combobox-lookup';
        }
        return css;
    }

    get comboboxClass () {
        let css = 'slds-combobox__form-element slds-input-has-icon ';
        if (this.isMultiEntry) {
            css += 'slds-input-has-icon_right';
        } else {
            css += (this.hasSelection () ? 'slds-input-has-icon_left-right' : 'slds-input-has-icon_right');
        }
        return css;
    }

    get inputClass () {
        let css = 'slds-input slds-combobox__input has-custom-height '
            + (this.errors.length === 0 ? '' : 'has-custom-error ');
        if (!this.isMultiEntry) {
            css += 'slds-combobox__input-value '
            + (this.hasSelection() ? 'has-custom-border' : '');
        }
        return css;
    }

    get inputValue () {
        if (this.isMultiEntry) {
            return this.searchTerm;
        }
        return this.hasSelection() ? this.selection[0].title : this.searchTerm;
    }

    get isInputReadOnly () {
        if (this.isMultiEntry) {
            return false;
        }
        return this.hasSelection ();
     }



    get selectIcon () {
        return this.hasSelection () ? this.selection[0].icon  :  'standard:default';
    }

    get selectIconClass () {
        return 'slds-combobox__input-entity-icon ' + (this.hasSelection () ? '' : 'slds-hide');
    }
    get isExpanded () {
        return this.hasResults ();
    }
}