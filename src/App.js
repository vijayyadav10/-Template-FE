import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import ContentTemplates from './page/ContentTemplates';
import AddTemplate from './page/AddTemplate';
import EditTemplate from './page/EditTemplate';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContent: [],
            name: null,
            nameTwo: null
        };
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" exact><ContentTemplates /></Route>
                    <Route path="/add-template" exact><AddTemplate /></Route>
                    <Route path="/edit-template/:templateId" exact><EditTemplate /></Route>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;