import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

import Drawer from '../Header/Drawer';

import CytoContainer from './CytoContainer';
import Issue from './Issue';
import Controls from './Controls'
import Edge from './Edge'

import Waiting from '../Waiting';

class _Graph extends React.Component {


  componentWillMount() {
    if (this.props.clientType === 'mobile' && this.props.show.help) {
      this.props.stopHelp();
    }
    this.props.resetRouterLocation(this.props.history.location.pathname);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isRehydrated && !this.props.isRehydrated) {
      nextProps.resetRouterLocation(nextProps.history.location.pathname);
    }
  }



  render() {
    return this.props.dataIsAvailable ?
      <Drawer {...this.props}>
        {this.props.infoBox.type === "entity" ? <Controls {...this.props} /> : <Edge {...this.props} />}
        <CytoContainer {...this.props} />
        <Issue
          translate={this.props.translate}
          clientType={this.props.clientType}
          show={this.props.show}
          toggleIssue={this.props.toggleIssue}
        />
      </Drawer>
      :
      <Waiting translate={this.props.translate} toTranslate='home.loadingData' />;
  }
}

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default Graph;
