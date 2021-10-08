import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import ReactGA from 'react-ga';

if (window.location.href.toLowerCase().indexOf('localhost') == -1 && window.location.href.toLowerCase().indexOf('azurewebsites') == -1) {
    ReactGA.initialize('UA-1111');
    ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')

);