import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

import Drawer from '../Header/Drawer';

import CytoContainer from './CytoContainer';
import Issue from './Issue';
import Controls from './Control/Controls'
import Edge from './Control/Edge'
import HelpSuggestion from './Help/HelpSuggestion'

import Waiting from '../Waiting';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  controlsContainer: {
    maxHeight: 80,
    minHeight: 80,
  },
});


class _Graph extends React.Component {


  componentWillMount() {
    if (this.props.clientType === 'mobile' && this.props.show.help) {
      this.props.stopHelp();
    }
    this.props.resetRouterLocation(this.props.history.location.pathname);

  }


  componentDidMount() {
    this.props.isRehydrated && this.props.dataIsAvailable && this.props.clientType !== "mobile" && this.props.toggleDrawer(true);
    this.props.isRehydrated && this.props.dataIsAvailable && this.props.updateEntityInfoBox(
      parseInt(this.props.match.params.entityId, 10)
    );
  }


  componentWillReceiveProps(nextProps) {
    if ((nextProps.isRehydrated && !this.props.isRehydrated && nextProps.dataIsAvailable) || (nextProps.isRehydrated && nextProps.dataIsAvailable && !this.props.dataIsAvailable)) {
      nextProps.resetRouterLocation(nextProps.history.location.pathname);
      nextProps.toggleDrawer(true);
      console.log('cwrp')
    }
  }


  componentWillUnmount() {
    this.props.toggleDrawer(false);
  }

  render() {

    const { classes, ...noClassProps } = this.props;
    const { dataIsAvailable } = noClassProps;

    return <Drawer {...noClassProps}>
      {dataIsAvailable ?
        <div>
          <div className={classes.controlsContainer}>
            {this.props.infoBox.type === "entity" ? <Controls {...noClassProps} /> : <Edge {...noClassProps} />}
            <HelpSuggestion
              isRehydrated={this.props.isRehydrated}
              show={this.props.show}
              toggleHelpSuggestion={this.props.toggleHelpSuggestion}
              toggleHelp={this.props.toggleHelp}
              clientType={this.props.clientType}
            />
          </div>
          <CytoContainer {...noClassProps} />
          <Issue
            translate={this.props.translate}
            clientType={this.props.clientType}
            show={this.props.show}
            toggleIssue={this.props.toggleIssue}
          />
        </div>
        :
        <Waiting clientType={this.props.clientType} translate={this.props.translate} toTranslate='home.loadingData' />
      }
    </Drawer>
  }
}

const Graph = connect(mapStateToProps, mapDispatchToProps)(_Graph);

export default withStyles(styles)(Graph);