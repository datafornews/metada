import React from 'react';
import Button from 'material-ui/Button';
import EntityCard from './EntityCard';
import Timeline from 'react-icons/lib/md/more';
import logGraph from '../../../utils/logGraph';


const iconStyle = {
  height: '20px',
  width: '30px'
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
    const name = entity.name.length < 11 || entity.name.split(' ').length == 1 ? entity.name : entity.name.slice(0, 10) + '...'
    if (entity.category !== 's' && entity.id !== parseInt(this.props.match.params.entityId, 10)) {
      graphButton = (<Button style={{ color: 'green', fontSize: '0.8rem' }} onClick={this.handleClick}>
        {this.props.translate('graph.seeGraphButton') + ' (' + name + ')'} &nbsp;<Timeline style={iconStyle} />
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