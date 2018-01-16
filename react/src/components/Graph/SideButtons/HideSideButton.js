// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import ClearIcon from 'material-ui-icons/Clear';
import Tooltip from 'material-ui/Tooltip';
import sideButtonStyle from './sideButtonStyle';



const styles = theme => (sideButtonStyle);

class HideMobileButton extends React.Component {


    handleClick = () => {
        this.props.toggleSideButtons();
    }

    render() {
        const title = this.props.show.sideButtons ? this.props.translate('graph.sideButtons.hideTooltip') : this.props.translate('graph.sideButtons.menuTooltip');
        return (
            <Tooltip
                id="tooltip-ResetButton"
                title={title}
                placement="bottom"
                style={{ textAlign: 'center' }}
            >
                <Button raised fab className={this.props.classes.button} onClick={this.handleClick}>
                    {!this.props.show.sideButtons && <MenuIcon className={this.props.classes.icon} />}
                    {this.props.show.sideButtons && <ClearIcon className={this.props.classes.icon} />}
                </Button>
            </Tooltip>
        );
    }
}

HideMobileButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HideMobileButton);