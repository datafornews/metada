import React from 'react';

import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';


import fetchData from '../../utils/fetchData';


class Header extends React.Component {

  componentDidMount() {
    const component = this;
    fetchData(component)
  }

  checkOrRedirect = (props) => {
    return
    // let redirect = true;
    // const pathname = props.history.location.pathname;
    // const match = this.props.match;
    // let locations = ['/extension', '/settings', '/about', '/search', '/contact', '/', '/callback', '/login'];
    // if (props.clientType === "extension" || 1) {
    //   locations.push('/stats');
    // }
    // if (pathname && match) {
    //   if (locations.indexOf(pathname) !== -1) {
    //     redirect = false;
    //   } else if (pathname.startsWith('/graph/') && /^\d+$/.test(match.params.entityId)) {
    //     redirect = false;
    //   } else if (pathname.startsWith('/s/') && /^\d+$/.test(match.params.filter)) {
    //     redirect = false;
    //   }

    //   if (redirect) {
    //     console.log('redirect');
    //     props.history.push('/');
    //   }
    // }
  }


  componentWillUpdate(nextProps, nextState) {
    if (nextProps.history.location.pathname !== this.props.history.location.pathname) {
      this.checkOrRedirect(nextProps);
    }
  }


  componentWillMount() {
    if (this.props.clientType === 'extension') {
      document.getElementsByTagName('html')[0].style.height = '600px';
      console.log('this.props.history.location :', this.props.history.location);
      if (this.props.history.location.pathname.indexOf('index.html') !== -1) {
        this.props.history.push('/');
      }
    }
    this.checkOrRedirect(this.props);
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

