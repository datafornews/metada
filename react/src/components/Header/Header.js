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
    let locations = ['/extension', '/settings', '/about', '/search', '/contact', '/', '/callback', '/login'];
    if (this.props.clientType === "extension" || 1){
      locations.push('/stats');
    }
    if (pathname && (locations.indexOf(pathname) === -1 && pathname.indexOf('graph') === -1)) {
      this.props.history.push('/');
    }
  }


  redirect = (val) => {
    this.props.history.push(`/graph/${val.id}`);
  }
  render() {

    return (
      <div id='headerDiv'>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

