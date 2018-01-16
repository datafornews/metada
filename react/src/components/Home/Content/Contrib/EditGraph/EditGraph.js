import React from 'react'

import Expansion from '../../../../Utils/Expansion';
import EditEntityForm from './EditEntityForm';
import EditEdgeForm from './EditEdgeForm';


export default class EditGraph extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        if (panel === this.state.expanded) {
            expanded && this.setState({
                expanded: ''
            });
        } else {
            expanded && this.setState({
                expanded: panel
            });
        }
    };

    render() {

        return (
            <div>
                <Expansion
                    summaryHeading={this.props.translate("contribute.editEntity.summaryHeading")}
                    content={<EditEntityForm {...this.props} />}
                    handleChange={this.handleChange('panel1')}
                    expanded={this.state.expanded === 'panel1'}
                />
                <Expansion
                    summaryHeading={this.props.translate("contribute.editEdge.summaryHeading")}
                    content={<EditEdgeForm {...this.props} />}
                    handleChange={this.handleChange('panel2')}
                    expanded={this.state.expanded === 'panel2'}
                />
            </div>
        );
    }
}