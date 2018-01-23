// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import UndoIcon from 'material-ui-icons/Undo';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';

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

        return <SideElement
            id="tooltip-PreviousButton"
            title={this.props.translate('graph.sideButtons.previousTooltip')}
            placement="right"
            content={<UndoIcon className={this.props.classes.icon} />}
            onClick={this.handleClick}
            disabled={disabled}
            {...this.props}
            button
        />
    }
}

PreviousButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviousButton);