import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';


import CytoContainer from './CytoContainer';
import Waiting from '../Waiting';

class _Graph extends React.Component {

  render() {

    return this.props.dataIsAvailable ?
      <CytoContainer {...this.props} />
      :
      <Waiting translate={this.props.translate} toTranslate='home.loadingData' />;
  }
}

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
