// This is the main entry point to the playground. By default,
// it simply creates a single lightning web component, and adds
// it to the DOM tree.

import * as Engine from 'lwc';
import App from 'c-app';

const element = Engine.createElement('c-app', { is: App });
document.body.appendChild(element);
