import React from 'react';
import cytoscape from 'cytoscape';
import { Helmet } from "react-helmet";

import { cytoParamsFromContainer } from '../../utils/cytoParams';
import getCytoData from '../../utils/getCytoData';
import InfoBoxEntityUI from './InfoBox/InfoBoxEntityUI';
import SideButtons from './SideButtons/SideButtons';
import SearchBar from '../Search/SearchBar';

let defaultStyle = {
  margin: 'auto',
  width: '70%',
  height: parseInt(window.screen.availHeight / 2, 10) + 'px',
};

const cyStyles = {
  'browser': {
    ...defaultStyle,
  },
  'extension': {
    ...defaultStyle,
    height: '400px',
    width: '700px',
    padding: '0px',
    // float: 'right'
  },
  'mobile': {
    ...defaultStyle,
    width: '98%',
    minHeight: '300px'
  }
};

class CytoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateEntityInfoBox(this.props.match.params.entityId);

    if (this.props.clientType === 'mobile' && this.props.show.sideButtons) {
      this.props.toggle('sideButtons');
    }

    this.state = {
      update: false,
      changeWiki: false,
      focus: 0,
      scroll: false
    };
  }

  allowScroll = (event) => {
    if (event.keyCode === 16) {
      this.setState({
        scroll: true
      });
      this.cy.userZoomingEnabled(true);
    }
  }

  preventScroll = (event) => {
    if (event.keyCode === 16) {
      this.setState({
        scroll: false
      })
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
    document.addEventListener("keydown", this.allowScroll, false);
    document.addEventListener("keyup", this.preventScroll, false);
    if (location !== this.props.currentDisplay) {
      this.props.displayEntity(location);
      this.props.updateEntityInfoBox(location);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.allowScroll, false);
    document.removeEventListener("keyup", this.preventScroll, false);
    this.props.show.ftux && this.props.toggleFtux();
  }



  renderCytoscapeElement = () => {
    console.log('rendering.')

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
    const isMobile = this.props.clientType === 'mobile'
    const cy = cytoscape(cytoParamsFromContainer(cyElement, cytoData, entity.id, isMobile));
    cy.ready(() => {
      cy.elements('node[category != "s"]').on(
        'tap',
        (event) => {
          this.setState({
            changeWiki: true
          });
          container.props.updateEntityInfoBox(event.target.id());
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
  }

  componentDidUpdate(prevProps, prevState) {
    const location = parseInt(this.props.match.params.entityId, 10);
    if (location !== this.props.currentDisplay) {
      this.props.displayEntity(location);
      this.props.updateEntityInfoBox(location);
      this.renderCytoscapeElement();
    }
  }

  render() {

    if (!this.props.show.searchBar) {
      defaultStyle.marginTop = '20px'
    }

    const id = this.props.match.params.entityId;
    const entity = this.props.data.entities.ids[id];

    return (
      <div>
        <Helmet>
          <title>Metada - {entity.name}</title>
        </Helmet>
        {
          this.props.show.searchBar && this.props.dataIsAvailable && <SearchBar
            {...this.props}
            focus={this.state.focus}
            width={cyStyles[this.props.clientType].width} />
        }
        <div id="cy" style={cyStyles[this.props.clientType]} onContextMenu={this.handleContextMenu} />
        <SideButtons
          {...this.props}
          focusSearchBar={this.focusSearchBar}
          reRenderGraph={this.renderCytoscapeElement}
        />
        <InfoBoxEntityUI {...this.props} changeWiki={this.state.changeWiki} cytoScroll={this.state.scroll} />
      </div>
    );
  }
}


export default CytoContainer;