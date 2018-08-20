import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import { check_website } from '../../utils/backgroundUtils';
import wtf_wikipedia from 'wtf_wikipedia';
import { Helmet } from "react-helmet";

// import Scroll from 'react-scroll';

import LearnAbout from './Content/LearnAbout/LearnAbout';
import HomeSearchBar from './Content/HomeSearchBar/HomeSearchBar';
import Contact from './Content/Contact/Contact';
import Settings from './Content/Settings/Settings';
import HomeContentTabs from './Content/Tabs';
import Extension from './Content/Extension/Extension';
import Header from './Header/Header';
import Stats from './Content/Stats/Stats';
import Example from './Content/Example/Example';

import Drawer from '../Header/Drawer';

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

  componentWillMount() {
    const component = this;
    if (this.props.clientType === 'extension') {
      window.browser.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (tabs.length === 0) {
          console.log('tabs.length is 0')
          return;
        }
        var url = tabs[0].url;
        if (component.props.dataIsAvailable) {
          const entity = check_website(component.props.data, url);
          if (entity && !sessionStorage['default_' + entity.id]) {
            // an entity was found and it is the first time 
            // the Extension sees this entity for this session
            // (It is assumed that if the user re-clicks on the Extension
            // during the session they intend to access the whole Extension)
            sessionStorage['default_' + entity.id] = 'true';
            component.props.updateEntityInfoBox(entity.id);
            component.props.displayEntity(entity.id);
            component.props.closeAll();
            component.props.history.push('/graph/' + entity.id);
          }
        }
      });
    }
    if (this.props.location.pathname === '/') {
      this.props.closeAll();
      this.props.toggleSearchBar();
      localStorage['reduxPersist:show'] = JSON.stringify({
        'intent': false,
        'contact': false,
        'settings': false,
        'extension': false,
        'stats': false,
        'searchBar': true
      });
    } else {
      const location = this.props.location.pathname.split('/')[1];
      if (location) {
        this.props.closeAll();
        this.props.toggle(location);
        localStorage['reduxPersist:show'] = JSON.stringify({
          ...this.props.show,
          location: true
        })
      };
    }

  }


  componentWillReceiveProps(nextProps) {
    const newLocation = nextProps.location.pathname.split('/')[1] || 'search';
    const location = this.props.location.pathname.split('/')[1] || 'search';
    if (location !== newLocation) {
      this.props.closeAll();
      this.props.toggle(newLocation);
    }
  }


  componentWillUpdate(nextProps, nextState) {
    if (sessionStorage.graphHistory && sessionStorage.graphHistory.length > 2) {
      sessionStorage.graphHistory = "[]";
      sessionStorage.location = "-1";
    }
  }


  componentDidUpdate(prevProps, prevState) {
    updateData(this);
  }



  render() {

    const location = this.props.location.pathname.split('/')[1];

    console.log(location);

    return (
      <Drawer {...this.props}>
        <div style={{ margin: 'auto' }}>


          <Helmet>
            <title>Metada - {this.props.translate('home.tabs.' + location)}</title>
          </Helmet>
          {location ? '' : <Header {...this.props} style={homeContentDivStyle[this.props.clientType]} />}
          <div style={homeContentDivStyle[this.props.clientType]}>
            {location ? '' : <Example {...this.props} nb={4} />}
            {/* <HomeContentTabs {...this.props} /> */}
            {/* <HomeSearchBar {...this.props} /> */}
            <LearnAbout {...this.props} />
            <Contact {...this.props} />
            <Settings {...this.props} />
            <Extension {...this.props} />
            <Stats {...this.props} />
            {/* {this.state.wiki &&} */}
          </div>
        </div>
      </Drawer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);