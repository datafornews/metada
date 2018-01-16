import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { localeReducer as locale } from 'react-localize-redux';
import {
    combineForms
  } from 'react-redux-form';

import data from './data';
import show from './show';
import infoBox from './infoBox';
import clientType from './clientType';
import currentDisplay from './currentDisplay';
import dataIsAvailable from './dataIsAvailable';

const initialUserState = {
    firstName: 'Jane',
    lastName: 'Doe',
    password: '',
    confirmPassword: '',
    email: ''
  };



const rootReducer = combineReducers({
    clientType,
    currentDisplay,
    data,
    dataIsAvailable,
    infoBox,
    locale,
    router: routerReducer,
    show,
    userSignupForm: combineForms({
        user: initialUserState,
      }, 'userSignupForm')
});

export default rootReducer;