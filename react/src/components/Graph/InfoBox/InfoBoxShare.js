import React from 'react';

class InfoBoxShare extends React.Component {
  render() {
    const label = this.props.share.label;
    const source = this.props.share.source;
    const target = this.props.share.target;
    const sourceName = this.props.data.entities.ids[source].name;
    const targetName = this.props.data.entities.ids[target].name;

    const str = `${sourceName} owns ${targetName} (${label})`;
    return (
      <div id={`infoBoxShare-${this.props.idToDisplay}`}>
        {str}
      </div>
    );
  }
}

export default InfoBoxShare;
