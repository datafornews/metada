import React from 'react';
import Button from 'material-ui/Button';
import EntityCard from './EntityCard';
import Timeline from 'material-ui-icons/Timeline';
import logGraph from '../../../utils/logGraph';


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
    if (entity.category !== 's' && entity.id !== parseInt(this.props.match.params.entityId, 10)) {
      graphButton = (<Button style={{ color: 'green' }} onClick={this.handleClick}>
        {this.props.translate('graph.seeGraphButton')} &nbsp; &nbsp;<Timeline />
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