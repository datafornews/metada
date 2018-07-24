// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';

const styles = theme => (sideButtonStyle);

class InfoDrawerButton extends React.Component {


    handleClick = () => {
        this.props.toggleDrawer();
    }

    render() {
        const entity = this.props.data.entities.ids[
            this.props.infoBox.data
        ];
        if (entity && entity.category !== 's' && entity.id !== parseInt(this.props.match.params.entityId, 10)) {
            return <SideElement
                id="tooltip-ResetButton"
                title={this.props.translate('graph.sideButtons.nextTooltip')}
                placement="right"
                content={<DescriptionIcon style={{ color: "green" }} className={this.props.classes.icon} />}
                onClick={this.handleClick}
                // disabled={disabled}
                {...this.props}
                button
            />
        }
        return "";

    }
}

InfoDrawerButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoDrawerButton);