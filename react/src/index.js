import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';

// import metadaTheme from './theme/metadaTheme'

import { MuiThemeProvider } from '@material-ui/core/styles';


import store, { history } from './store/store';
// import Home from './components/Home/Home';
import Graph from './components/Graph/Graph';
import Header from './components/Header/Header';
import theme from './theme/metadaTheme'
import DefaultRoute from './components/DefaultRoute';
import Main from './components/Home/Content/Main/Main';
import About from './components/Home/Content/About/About';
import Extension from './components/Home/Content/Extension/Extension';
import Contribute from './components/Home/Content/Contribute/Contribute';
import Settings from './components/Home/Content/Settings/Settings';
import Contact from './components/Home/Content/Contact/Contact';
import Stats from './components/Home/Content/Stats/Stats';

import './style/index.css';


console.log('INDEX', performance.now())

window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();


const defaultStyle = {
    maxHeight: '100vh'
};

const styles = {
    'browser': {
        ...defaultStyle
    },
    'extension': {
        ...defaultStyle,
        // height: '600px',
        width: '754px',
    },
    'mobile': {
        ...defaultStyle
    }
}

const router = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                {/* <V0MuiThemeProvider theme={metadaTheme}> */}
                <div id='index' style={styles[store.getState().clientType]}>
                    <Header history={history} />
                    <Switch>
                        <Route exact path='/' component={Main}></Route>
                        <Route exact path='/s/:filter' component={Main}></Route>
                        <Route exact path='/extension' component={Extension}></Route>
                        <Route exact path='/contribute' component={Contribute}></Route>
                        <Route exact path='/settings' component={Settings}></Route>
                        <Route exact path='/about' component={About}></Route>
                        <Route exact path='/search' component={Main}></Route>
                        <Route exact path='/contact' component={Contact}></Route>
                        <Route exact path='/stats' component={Stats}></Route>
                        <Route exact path='/graph/:entityId' component={Graph}></Route>
                        <Route path="*" component={DefaultRoute} />
                    </Switch>
                </div>
                {/* </V0MuiThemeProvider> */}
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));

let isExtension;
try {
    isExtension = window.browser.tabs !== undefined;
} catch (error) {
    //Not Chrome browser
    isExtension = false;
}

if (!isExtension) {
    console.log('Registering Service Worker');
    registerServiceWorker();
} else {
    console.log('Not registering Service Worker');
}


