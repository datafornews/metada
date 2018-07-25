import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';

// import metadaTheme from './theme/metadaTheme'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import store, { history } from './store/store';
import Home from './components/Home/Home';
import Graph from './components/Graph/Graph';
import Header from './components/Header/Header';


import './style/index.css';


window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();


const defaultStyle = {

};

const styles = {
    'browser': {
        ...defaultStyle
    },
    'extension': {
        ...defaultStyle,
        height: '600px',
        width: '754px',
    },
    'mobile': {
        ...defaultStyle
    }
}

const theme = createMuiTheme();


const router = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                    {/* <V0MuiThemeProvider theme={metadaTheme}> */}
                    <div id='index' style={styles[store.getState().clientType]}>
                        <Header history={history} />
                        <Switch>
                            <Route exact path='/' component={Home}></Route>
                            <Route exact path='/extension' component={Home}></Route>
                            <Route exact path='/settings' component={Home}></Route>
                            <Route exact path='/about' component={Home}></Route>
                            <Route exact path='/search' component={Home}></Route>
                            <Route exact path='/contact' component={Home}></Route>
                            <Route exact path='/stats' component={Home}></Route>
                            <Route path='/graph/:entityId' component={Graph}></Route>
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


