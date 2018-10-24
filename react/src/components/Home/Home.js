import React from 'react';
import { check_website } from '../../utils/backgroundUtils';

import Container from '../Container';

import updateData from '../../utils/updateData';

class Home extends React.Component {

  state = {
    wiki: null
  }

  componentDidMount() {
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
            component.props.history.push('/graph/' + entity.id);
            sessionStorage['default_' + entity.id] = 'true';
            component.props.updateEntityInfoBox(entity.id);
            component.props.displayEntity(entity.id);
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

    const { children } = this.props;

    return (
      <Container {...this.props}>
        <div style={{ margin: 'auto' }} ref='exampleDiv'>
          {children}
        </div>
      </Container>
    );
  }
}

export default Home;