import { bindActionCreators } from 'redux';
import { setActiveLanguage } from 'react-localize-redux';
import * as actionCreators from '../actions/actionCreators';
import * as toggleActions from '../actions/toggleActions';
import { actions as rrfActions } from 'react-redux-form';

let renamedActions = {};
Object.keys(rrfActions).map((v,k)=> {
  renamedActions['rrf' + v.replace(/\b\w/g, l => l.toUpperCase())] = rrfActions[v]
  return null;
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...actionCreators,
      ...toggleActions,
      setActiveLanguage,
      // ...renamedActions
    },
    dispatch);
}

export default mapDispatchToProps