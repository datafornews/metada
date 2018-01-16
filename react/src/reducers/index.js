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
import user from './user';
import graph from './graph';


const initialUserState = {
  first_name: 'Jane',
  last_name: 'Doe',
  password: '',
  confirmPassword: '',
  email: ''
};

const initialEdgeState = {};
const initialEntityState = {};

const rootReducer = combineReducers({
  clientType,
  currentDisplay,
  data,
  dataIsAvailable,
  infoBox,
  locale,
  router: routerReducer,
  show,
  user,
  graph,
  signupForm: combineForms({
    user: initialUserState,
  }, 'signupForm'),
  loginForm: combineForms({
    user: initialUserState,
  }, 'loginForm'),
  editProfileForm: combineForms({
    user: initialUserState,
  }, 'editProfileForm'),
  editEdgeForm: combineForms({
    edge: initialEdgeState,
  }, 'editEdgeForm'),
  editEntityForm: combineForms({
    entity: initialEntityState,
  }, 'editEntityForm'),
});

export default rootReducer;