// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResetIcon from 'react-icons/lib/fa/refresh';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';
import { colors } from '../../../theme/metadaTheme';

const styles = theme => (sideButtonStyle);



class HomeButton extends React.Component {


    handleClick = () => {
        this.props.reRenderGraph();
    }

    render() {
        const entity = this.props.data.entities.ids[parseInt(this.props.match.params.entityId, 10)];
        return <SideElement
            id="tooltip-ResetButton"
            title={this.props.translate('graph.sideButtons.resetTooltip')}
            placement="right"
            content={<ResetIcon className={this.props.classes.icon} style={{ color: colors[entity.category] }} />}
            onClick={this.handleClick}
            {...this.props}
            button
        />
    }
}

HomeButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeButton);