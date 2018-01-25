import React from 'react';
import Button from 'material-ui/Button';
import EntityCard from './EntityCard';
import Icon from 'react-icons/lib/fa/chevron-circle-right';
import logGraph from '../../../utils/logGraph';


const iconStyle = {
  height: '20px',
  width: '30px'
}

const graphButtonStyle = {
  color: 'green',
  fontSize: '0.8rem',
  padding: '8px',
  fontWeight: 'bold'
}

class InfoBoxEntity extends React.Component {


  handleClick = () => {
    const entity = this.props.data.entities.ids[
      this.props.idToDisplay
    ];

    logGraph(entity.id);
    this.props.history.push(`/graph/${entity.id}`);
  };

  render() {
    const entity = this.props.data.entities.ids[
      this.props.idToDisplay
    ];
    let graphButton;
    const name = entity.name.length <= 17 || entity.name.split(' ').length === 1 ? entity.name : entity.name.slice(0, 16) + '...'
    if (entity.category !== 's' && entity.id !== parseInt(this.props.match.params.entityId, 10)) {
      graphButton = (<Button style={graphButtonStyle} onClick={this.handleClick}>
        {this.props.translate('graph.seeGraphButton') + ' (' + name + ')'} &nbsp;<Icon style={iconStyle} />
      </Button>);
    } else {
      graphButton = undefined;
    }

    return (

      <EntityCard
        entity={entity}
        graphButton={graphButton}
        {...this.props}
      />
    );
  }
}

export default InfoBoxEntity;