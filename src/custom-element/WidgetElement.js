import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

class WidgetElement extends HTMLElement {
    constructor() {
        super();
        this.reactRootRef = React.createRef();
        this.mountPoint = null;
    }

    get config() {
        console.log("GET CONFIG THIS.REACTROOTREF.CURRENT",this.reactRootRef.current)
        return this.reactRootRef.current ? this.reactRootRef.current.state : {};
    }

    set config(value) {
        console.log("BALUE", value)
        console.log("SET CONFIG", this.reactRootRef.current);
        return this.reactRootRef.current.setState(value);
    }

    connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);
        ReactDOM.render(<App ref={this.reactRootRef} />, this.mountPoint);
    }
}

window.customElements.define('my-widget-config', WidgetElement);

export default WidgetElement;
