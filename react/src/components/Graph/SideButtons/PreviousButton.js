// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import UndoIcon from 'material-ui-icons/Undo';
import Tooltip from 'material-ui/Tooltip';
import sideButtonStyle from './sideButtonStyle';

const styles = theme => (sideButtonStyle);

class PreviousButton extends React.Component {


    handleClick = () => {
        const history = JSON.parse(sessionStorage.graphHistory);
        let location = JSON.parse(sessionStorage.location);
        if (location === -1) {
            location = 0;
        }
        sessionStorage.location = location - 1;
        if (this.props.data.idSet.indexOf(parseInt(history[location - 1], 10)) > -1) {
            this.props.history.push('/graph/' + history[location - 1]);
        } else {
            console.log('Unknown : ', history[location - 1])
        }
    }

    render() {
        const disabled = JSON.parse(sessionStorage.location) <= 0;
        
        return disabled ?
            (<Button raised fab disabled={disabled} className={this.props.classes.button} onClick={this.handleClick}>
                <UndoIcon className={this.props.classes.icon} />
            </Button>)
            :
            (
                <Tooltip
                    id="tooltip-ResetButton"
                    title={this.props.translate('graph.sideButtons.previousTooltip')}
                    placement="bottom"
                    style={{ textAlign: 'center' }}
                >
                    <Button raised fab disabled={disabled} className={this.props.classes.button} onClick={this.handleClick}>
                        <UndoIcon className={this.props.classes.icon} />
                    </Button>
                </Tooltip>
            );
    }
}

PreviousButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviousButton);