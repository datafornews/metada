import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';

import InfoDrawer from './InfoDrawer/InfoDrawer';
import Container from '../Container';

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


class Graph extends React.Component {


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
    }
  }


  componentWillUnmount() {
    this.props.toggleDrawer(false);
  }

  render() {

    const {
      classes, history, infoBox, isRehydrated, show, toggleHelpSuggestion,
      toggleHelp, clientType, toggleIssue, translate, preventAutofocus, currentLanguage,
      data, match, routerLocations, dataIsAvailable, updateEntityInfoBox, updateRouterLocation,
      reRenderGraph, startHelp, stopHelp, toggleDrawer } = this.props;

    return <Container
      clientType={clientType}
      data={data}
      dataIsAvailable={dataIsAvailable}
      history={history}
      infoBox={infoBox}
      isRehydrated={isRehydrated}
      match={match}
      preventAutofocus={preventAutofocus}
      reRenderGraph={reRenderGraph}
      show={show}
      startHelp={startHelp}
      stopHelp={stopHelp}
      toggleDrawer={toggleDrawer}
      toggleIssue={toggleIssue}
      translate={translate}
      updateEntityInfoBox={updateEntityInfoBox}
      isGraph={true}
      drawer={<InfoDrawer
        clientType={clientType}
        data={data}
        dataIsAvailable={dataIsAvailable}
        currentLanguage={currentLanguage}
        history={history}
        infoBox={infoBox}
        isRehydrated={isRehydrated}
        match={match}
        reRenderGraph={reRenderGraph}
        show={show}
        startHelp={startHelp}
        stopHelp={stopHelp}
        toggleDrawer={toggleDrawer}
        translate={translate}
      />}
    >
      {dataIsAvailable ?
        <div>
          <div className={classes.controlsContainer}>
            {infoBox.type === "entity" ? <Controls
              clientType={clientType}
              data={data}
              history={history}
              infoBox={infoBox}
              match={match}
              routerLocations={routerLocations}
              show={show}
              toggleDrawer={toggleDrawer}
              translate={translate}
              updateRouterLocation={updateRouterLocation}
            />
              :
              <Edge
                clientType={clientType}
                infoBox={infoBox}
                data={data}
              />

            }
            <HelpSuggestion
              isRehydrated={isRehydrated}
              show={show}
              toggleHelpSuggestion={toggleHelpSuggestion}
              toggleHelp={toggleHelp}
              clientType={clientType}
            />
          </div>
          <CytoContainer
            clientType={this.props.clientType}
            currentDisplay={this.props.currentDisplay}
            data={this.props.data}
            displayEntity={this.props.displayEntity}
            history={this.props.history}
            infoBox={this.props.infoBox}
            isRehydrated={this.props.isRehydrated}
            match={this.props.match}
            reRenderGraph={this.props.reRenderGraph}
            show={this.props.show}
            stopHelp={this.props.stopHelp}
            toggleDoubleClickHelp={this.props.toggleDoubleClickHelp}
            toggleDrawer={this.props.toggleDrawer}
            toggleLongClickHelp={this.props.toggleLongClickHelp}
            translate={this.props.translate}
            updateEntityInfoBox={this.props.updateEntityInfoBox}
            updateRouterLocation={this.props.updateRouterLocation}
            updateShareInfoBox={this.props.updateShareInfoBox}
          />
          <Issue
            translate={translate}
            clientType={clientType}
            show={show}
            toggleIssue={toggleIssue}
          />
        </div>
        :
        <Waiting clientType={clientType} translate={translate} toTranslate='home.loadingData' />
      }
    </Container>
  }
}

Graph = connect(mapStateToProps, mapDispatchToProps)(Graph);

export default withStyles(styles)(Graph);