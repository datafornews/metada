import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';
import Loadable from 'react-loadable';

import { MuiThemeProvider } from '@material-ui/core/styles';


import store, { history } from './store/store';
import Loading from './Loading';
import theme from './theme/metadaTheme';
import { colors } from './theme/metadaTheme'
import './style/index.css';

export const AsyncComponents = {
    'graph': Loadable({
        loader: () => import(/* webpackChunkName: "Graph" */ './components/Graph/Graph'),
        loading: Loading
    }),
    'default': Loadable({
        loader: () => import(/* webpackChunkName: "DefaultRoute" */ './components/DefaultRoute'),
        loading: Loading
    }),
    'home': Loadable({
        loader: () => import(/* webpackChunkName: "Home" */ './components/Main/Content/Home/Home'),
        loading: Loading
    }),
    'about': Loadable({
        loader: () => import(/* webpackChunkName: "About" */ './components/Main/Content/About/About'),
        loading: Loading
    }),
    'extension': Loadable({
        loader: () => import(/* webpackChunkName: "Extension" */ './components/Main/Content/Extension/Extension'),
        loading: Loading
    }),
    'contribute': Loadable({
        loader: () => import(/* webpackChunkName: "Contribute" */ './components/Main/Content/Contribute/Contribute'),
        loading: Loading
    }),
    'settings': Loadable({
        loader: () => import(/* webpackChunkName: "Settings" */ './components/Main/Content/Settings/Settings'),
        loading: Loading
    }),
    'contact': Loadable({
        loader: () => import(/* webpackChunkName: "Contact" */ './components/Main/Content/Contact/Contact'),
        loading: Loading
    }),
    'stats': Loadable({
        loader: () => import(/* webpackChunkName: "Stats" */ './components/Main/Content/Stats/Stats'),
        loading: Loading
    })
};



// console.log('INDEX', performance.now());
localStorage && localStorage.removeItem('reduxPersist:infoBox');

if (window) {
    window.browser = (function () {
        return window.msBrowser ||
            window.browser ||
            window.chrome;
    })();
}


const defaultStyle = {
    maxHeight: '100vh',
    background: colors.background
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

                <div id='index' style={styles[store.getState().clientType]}>
                    <Switch>
                        <Route exact path='/' component={AsyncComponents.home}></Route>
                        <Route exact path='/s/:filter' component={AsyncComponents.home}></Route>
                        <Route exact path='/graph/:entityId' component={AsyncComponents.graph}></Route>
                        {
                            ['extension', 'contribute', 'settings', 'about', 'contact', 'stats'].map(
                                (loc, k) => {
                                    return <Route
                                        exact
                                        path={`/${loc}`}
                                        component={AsyncComponents[loc]}
                                        key={k}
                                    />
                                }
                            )
                        }
                        <Route path="*" component={AsyncComponents.default} />
                    </Switch>
                </div>
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


