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
      if (this.props.history.location.pathname.indexOf('index.html') !== -1) {
        this.props.history.push('/');
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.match.path !== nextProps.match.path
  }


  render() {

    const { translate, data, match, dataIsAvailable } = this.props;

    let title;

    if (match.path.startsWith('/graph/')) {
      const entity = dataIsAvailable && match ?
        data.entities.ids[parseInt(match.params.entityId, 10)] :
        { name: '' };
      if (entity) {
        switch (entity.category) {
          case 'm':
            title = `${translate('helmet.title.media')} ${entity.name} ?`;
            break;

          default:
            title = `${translate('helmet.title.other')} ${entity.name} ${translate('helmet.title.otherAfter')} ? `;
            break;
        }
      }
    } else if (match.path.startsWith('/s/')) {
      title = translate('helmet.title.home');
    } else {
      title = translate(`helmet.title.${match.path.split('/')[1].length ? match.path.split('/')[1] : "home"}`);
    }

    return <Helmet>
      <title>{title}</title>
      <meta name="description" content={translate('helmet.description.main')} />
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

