import React from 'react';

import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

import fetchData from '../../utils/fetchData';


class Header extends React.Component {

  componentDidMount() {
    const component = this;
    fetchData(component);
  }


  componentWillMount() {
    const pathname = this.props.history.location.pathname;
    const locations = ['/extension', '/settings', '/about', '/search', '/contrib', '/', '/profile'];
    if (pathname && (locations.indexOf(pathname) === -1 && pathname.indexOf('graph') === -1)) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div id='headerDiv'>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

