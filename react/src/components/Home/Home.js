import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import { check_website } from '../../utils/backgroundUtils';
import { Helmet } from "react-helmet";

import LearnAbout from './Content/LearnAbout/LearnAbout';
import Contact from './Content/Contact/Contact';
import Settings from './Content/Settings/Settings';
import Extension from './Content/Extension/Extension';
import Stats from './Content/Stats/Stats';
import Main from './Content/Main/Main';
import Contribute from './Content/Contribute/Contribute';

import Container from '../Container';
import PropTypes from 'prop-types';


import updateData from '../../utils/updateData';

const homeContentDivStyle = {
  "mobile": {
    textAlign: 'center',
    width: '80%',
    margin: 'auto'
  },
  "browser": {
    textAlign: 'unset',
    maxWidth: "900px",
    width: '70%',
    margin: 'auto'
  },
  "extension": {
    textAlign: 'unset',
    maxWidth: "900px",
    width: '80%',
    margin: 'auto'
  }
};

class Home extends React.Component {

  state = {
    wiki: null
  }

  componentDidMount() {
    const component = this;
    if (this.props.clientType === 'extension') {
      const _n = performance.now();
      window.browser.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (tabs.length === 0) {
          console.log('tabs.length is 0')
          return;
        }
        console.log('getting tab', '(s)', (performance.now() - _n) / 1000)
        var url = tabs[0].url;
        if (component.props.dataIsAvailable) {
          const _p = performance.now();
          const entity = check_website(component.props.data, url);
          console.log('check_website', '(s)', (performance.now() - _p) / 1000)
          if (entity && !sessionStorage['default_' + entity.id]) {
            // an entity was found and it is the first time 
            // the Extension sees this entity for this session
            // (It is assumed that if the user re-clicks on the Extension
            // during the session they intend to access the whole Extension)
            const _a = performance.now();
            component.props.history.push('/graph/' + entity.id);
            console.log('history.push', '(s)', (performance.now() - _a) / 1000)
            const _z = performance.now();
            sessionStorage['default_' + entity.id] = 'true';
            console.log('setting default', '(s)', (performance.now() - _z) / 1000)
            const _e = performance.now();
            component.props.updateEntityInfoBox(entity.id);
            console.log('update info', '(s)', (performance.now() - _e) / 1000)
            const _t = performance.now();
            component.props.displayEntity(entity.id);
            console.log('display entity', '(s)', (performance.now() - _t) / 1000)
            console.log('Checking tab', '(s)', (performance.now() - _n) / 1000)
          }
        }
      });
      console.log('HOME', performance.now())
    }

    const location = this.props.location.pathname.split('/')[1];
    if (location) {
      this.props.toggle(location);
    };


  }

  componentWillReceiveProps(nextProps) {
    const newLocation = nextProps.location.pathname.split('/')[1] || 'search';
    const location = this.props.location.pathname.split('/')[1] || 'search';
    if (location !== newLocation) {
      this.props.toggle(newLocation);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    updateData(this);
  }




  render() {

    return (
      <Container {...this.props}>
        <div style={{ margin: 'auto', marginTop: 8 }} ref='exampleDiv'>
          {this.props.isMain && this.props.children}
          {/* {["", "s"].indexOf(location) === -1 ? '' : <Main {...this.props} nb={4} />} */}

          <div style={homeContentDivStyle[this.props.clientType]}>

            {!this.props.isMain && this.props.children}
            {/* <LearnAbout {...this.props} />
            <Contact {...this.props} />
            <Settings {...this.props} />
            <Extension {...this.props} />
            <Stats {...this.props} />
            <Contribute {...this.props} /> */}
          </div>
        </div>
      </Container>
    );
  }
}

export default Home;
// export default connect(mapStateToProps, mapDispatchToProps)(Home);