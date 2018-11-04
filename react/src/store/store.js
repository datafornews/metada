import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { initialize, addTranslation, setActiveLanguage } from 'react-localize-redux';

// import the root reducer
import combinedReducer from '../reducers/index';
import defaultState from './defaultState';

export const history = createBrowserHistory();

if (window) {
    window.browser = (function () {
        return window.msBrowser ||
            window.browser ||
            window.chrome;
    })();
}

const middleware = routerMiddleware(history);

const enhancers = compose(autoRehydrate(), applyMiddleware(middleware),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(combinedReducer, defaultState, enhancers);

// Multi-language support

let languageToUse = localStorage ? localStorage.getItem('activeLanguage') : "en";
if (!languageToUse && navigator) {
    languageToUse = navigator.language || navigator.userLanguage;
    languageToUse = languageToUse.indexOf('fr') > -1 ? 'fr' : 'en';
}
const languages = ['en', 'fr'];
store.dispatch(initialize(languages));//, { defaultLanguage: 'fr' }));
const json = require('../static/texts/global.locale.json');
store.dispatch(addTranslation(json));
store.dispatch(setActiveLanguage(languageToUse));

// Set Client type
let clientType, isExtension;
try {
    isExtension = window.browser.tabs !== undefined;
} catch (error) {
    //Not Chrome browser
    isExtension = false;
}
if (!navigator) {
    clientType = "server";
} else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    clientType = 'mobile';
} else if (isExtension) {
    clientType = 'extension';
} else {
    clientType = "browser";
}

store.dispatch({
    type: 'SET_CLIENT_TYPE',
    clientType
});

persistStore(store, {}, () => {
    store.dispatch({
        type: 'STORE_IS_REHYDRATED'
    })
});

// By default reducers are not hot reloaded, only components
// To make them hot reloadable : 
if (module && module.hot) {
    module.hot.accept('../reducers/', () => {
        const nextCombinedReducer = require('../reducers/index').default;
        store.replaceReducer(nextCombinedReducer);
    })
}

export default store;

