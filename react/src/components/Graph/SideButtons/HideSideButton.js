// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';



const styles = theme => (sideButtonStyle);

class HideButton extends React.Component {


    handleClick = () => {
        this.props.show.sideButtons && this.props.show.help && this.props.stopHelp();
        this.props.toggleSideButtons();
    }


    render() {
        const title = this.props.show.sideButtons ? this.props.translate('graph.sideButtons.hideTooltip') : this.props.translate('graph.sideButtons.menuTooltip');
        let icon;
        if (this.props.show.sideButtons) {
            icon = <ClearIcon className={this.props.classes.icon} />;
        } else {
            icon = <MenuIcon className={this.props.classes.icon} />;
        }

        return <SideElement
            id="tooltip-HideButton"
            title={title}
            placement="right"
            content={icon}
            onClick={this.handleClick}
            {...this.props}
            button
        />;
    }
}

HideButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HideButton);