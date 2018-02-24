import React from 'react';
import EntityCard from './EntityCard';
import logGraph from '../../../utils/logGraph';
import GraphButton from './GraphButton';

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
      graphButton = <GraphButton {...this.props}
                    handleClick={this.handleClick}
                    name={name}/>
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