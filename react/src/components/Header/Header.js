import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';


import fetchData from '../../utils/fetchData';

import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

class Header extends React.Component {

  componentDidMount() {
    const component = this;
    fetchData(component)
  }


  componentWillMount() {
    if (this.props.clientType === 'extension') {
      document.getElementsByTagName('html')[0].style.height = '600px';
      console.log('this.props.history.location :', this.props.history.location);
      if (this.props.history.location.pathname.indexOf('index.html') !== -1) {
        this.props.history.push('/');
      }
    }
  }

  render() {


    console.log(this.props);

    const { translate, data, match, dataIsAvailable } = this.props;

    const entity = dataIsAvailable && match ?
      data.entities.ids[parseInt(match.params.entityId, 10)] :
      { name: '' };
    let title;

    if (entity) {
      switch (entity.category) {
        case 'm':
          title = `${translate('helmet.title.media')} ${entity.name}`;
          break;

        default:
          title = `${translate('helmet.title.other')} ${entity.name}`;
          break
      }
    }

    console.log({ title });

    return <Helmet>
      <title>{title}</title>
    </Helmet>
  }
}



Header.propTypes = {
  makeDataAvailable: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

