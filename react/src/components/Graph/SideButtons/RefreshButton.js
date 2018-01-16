// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ResetIcon from 'material-ui-icons/Autorenew';
import Tooltip from 'material-ui/Tooltip';
import sideButtonStyle from './sideButtonStyle';

const styles = theme => (sideButtonStyle);

class HomeButton extends React.Component {

    handleClick = () => {
        this.props.reRenderGraph();
    }

    render() {

        return (
            <Tooltip
                id="tooltip-ResetButton"
                title={this.props.translate('graph.sideButtons.resetTooltip')}
                placement="bottom"
                style={{ textAlign: 'center' }}
            >
                <Button raised fab className={this.props.classes.button} onClick={this.handleClick}>
                    <ResetIcon className={this.props.classes.icon} />
                </Button>
            </Tooltip>
        );
    }
}

HomeButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeButton);