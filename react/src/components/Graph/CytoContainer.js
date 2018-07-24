import React from 'react';
import cytoscape from 'cytoscape';
import { Helmet } from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';


import { cytoParamsFromContainer } from '../../utils/cytoParams';
import getCytoData from '../../utils/getCytoData';
import InfoBoxEntityUI from './InfoBox/InfoBoxEntityUI';
import SideButtons from './SideButtons/SideButtons';
// import SearchBar from '../Search/SearchBar';
import ShiftToScroll from './SideButtons/ShiftToScroll';
import SideCards from './SideCards';

const styles = theme => ({
  cytoContainer: {
    height: "100%",
    minHeight: `calc(100vh - ${theme.spacing.unit * 3 * 4}px)`,
    // border: "black 2px solid"
  },
  cyDiv: {
    height: "100%",
    minHeight: `calc(100vh - ${theme.spacing.unit * 3 * 4}px)`,
    // border: "grey 2px solid"
  },
  pad: {
    paddingRight: "250px"
  }
})


let defaultStyle = {
  margin: 'auto',
  width: '70%',
  height: "100%",
  position: 'relative',
  display: 'flex',
  justifyContent: 'center'
};


class CytoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateEntityInfoBox(this.props.match.params.entityId);

    if (this.props.clientType === 'mobile' && this.props.show.sideButtons) {
      this.props.toggle('sideButtons');
    }

    let scroll = false;
    if (this.props.clientType === 'mobile') {
      scroll = true;
    }

    this.state = {
      update: false,
      changeWiki: false,
      focus: 0,
      scroll: scroll,
      lastTap: new Date().getTime()
    };
  }

  allowScroll = (event) => {
    if (event.keyCode === 16) {
      this.setState({
        scroll: true
      });
      this.cy.userPanningEnabled(true);
      this.cy.userZoomingEnabled(true);
    }
  }

  preventScroll = (event) => {
    if (event.keyCode === 16) {
      this.setState({
        scroll: false
      })
      this.cy.userPanningEnabled(false);
      this.cy.userZoomingEnabled(false);
    }
  }

  focusSearchBar = () => {
    this.setState({
      focus: this.state.focus + 1
    })
  }


  componentWillMount() {
    const location = parseInt(this.props.match.params.entityId, 10);
    if (this.props.clientType !== 'mobile') {
      document.addEventListener("keydown", this.allowScroll, false);
      document.addEventListener("keyup", this.preventScroll, false);
    }
    if (location !== this.props.currentDisplay) {
      this.props.displayEntity(location);
      this.props.updateEntityInfoBox(location);
    }
  }

  componentWillUnmount() {
    if (this.props.clientType !== 'mobile') {
      document.removeEventListener("keydown", this.allowScroll, false);
      document.removeEventListener("keyup", this.preventScroll, false);
    }
    // this.props.show.help && this.props.stopHelp();
  }



  renderCytoscapeElement = () => {
    console.log('rendering');
    const time = false;
    if (time) {
      console.time('Full Cyto');
      console.time('      Data Cyto');
    }
    const container = this;
    const data = this.props.data;
    const id = this.props.match.params.entityId;
    const entity = data.entities.ids[id];
    let cytoData = getCytoData(data, entity);

    const graphHistory = sessionStorage.getItem('graphHistory');
    if (!graphHistory) {
      sessionStorage.setItem('graphHistory', JSON.stringify(
        [id]
      ));
      sessionStorage.setItem('location', JSON.stringify(
        0
      ));
    }

    if (time) {
      console.timeEnd('      Data Cyto');
      console.time('      Render Cyto');
    }
    var cyElement = document.getElementById('cy');
    const cy = cytoscape(cytoParamsFromContainer(cyElement, cytoData, entity.id, this.props.clientType, this.props.infoBox.data));
    cy.ready(() => {
      cy.elements('node[category != "s"]').on(
        'tap',
        (event) => {

          // if (!this.props.show.drawer) {
          //   container.props.toggleDrawer();
          // }
          const now = new Date().getTime();
          var timesince = now - this.state.lastTap;
          if ((timesince < 600) && (timesince > 0)) {
            // double tap
            this.props.history.push(`/graph/${event.target.id()}`);
            document.body.style.cursor = 'default';

          } else {
            // too much time to be a doubletap
            this.setState({
              changeWiki: true
            });
            container.props.updateEntityInfoBox(event.target.id());
          }

          this.setState({
            lastTap: new Date().getTime()
          })
        },
      );
      cy.elements('node').on(
        'drag',
        (event) => {
          console.log('drag');
          event.preventDefault();
          return false
        },
      );
      if (time) {
        console.timeEnd('      Render Cyto');
        console.timeEnd('Full Cyto');
      }
    });
    cy.userZoomingEnabled(this.state.scroll);
    cy.on('mouseover', 'node', function (evt) {
      document.body.style.cursor = 'pointer';
    });
    cy.on('mouseout', 'node', function (evt) {
      document.body.style.cursor = 'default';
    });
    this.cy = cy;
  }

  componentDidMount() {
    this.setState({
      update: true
    });
    this.renderCytoscapeElement()
    if (this.props.clientType === 'mobile') {
      this.cy.panningEnabled(true);
      this.cy.userZoomingEnabled(true);
      this.cy.zoomingEnabled(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const location = parseInt(this.props.match.params.entityId, 10);
    if (location !== this.props.currentDisplay) {
      this.props.displayEntity(location);
      this.props.updateEntityInfoBox(location);
      this.renderCytoscapeElement();
      return
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.show.drawer !== this.props.show.drawer) {
      setTimeout(this.renderCytoscapeElement, 300);
      if (!nextProps.show.drawer) {
        this.props.updateEntityInfoBox(parseInt(this.props.match.params.entityId, 10))
      }
    }
  }


  render() {

    if (!this.props.show.searchBar) {
      defaultStyle.marginTop = '20px'
    }

    const id = this.props.match.params.entityId;
    const entity = this.props.data.entities.ids[id];

    const { classes, ...noClassProps } = this.props;

    const pad = this.props.show.legend || this.props.show.help;

    return (
      <div>
        <div id="cytoContainer" className={classNames(classes.cytoContainer, pad && classes.pad)}>
          <Helmet>
            <title>Metada - {entity.name}</title>
          </Helmet>
          <div id="cy" className={classes.cyDiv} onContextMenu={this.handleContextMenu} >
          </div>
          {this.props.clientType !== 'mobile' && <ShiftToScroll translate={this.props.translate} />}
          <SideButtons
            {...noClassProps}
            focusSearchBar={this.focusSearchBar}
            reRenderGraph={this.renderCytoscapeElement}
          />
        </div>
        <SideCards {...noClassProps} reRenderGraph={this.renderCytoscapeElement}/>
      </div>

    );
  }
}


export default withStyles(styles)(CytoContainer);