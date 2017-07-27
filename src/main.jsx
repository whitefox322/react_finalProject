import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";

import {App} from './components/App';

const mountPoint = document.getElementById("mount-point");

const render = (Component) =>
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        mountPoint);

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').App;
        render(NextApp);
    });
}