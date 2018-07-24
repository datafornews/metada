import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

import Drawer from '../Header/Drawer';

import CytoContainer from './CytoContainer';

import Waiting from '../Waiting';

class _Graph extends React.Component {


  componentWillMount() {
    if (this.props.clientType === 'mobile' && this.props.show.help) {
      this.props.stopHelp();
    }
  }


  render() {

    return this.props.dataIsAvailable ?
      <Drawer {...this.props}>
        <CytoContainer {...this.props} />
      </Drawer>
      :
      <Waiting translate={this.props.translate} toTranslate='home.loadingData' />;
  }
}

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
