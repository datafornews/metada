// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RedoIcon from '@material-ui/icons/Redo';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';

const styles = theme => (sideButtonStyle);

class NextButton extends React.Component {


    handleClick = () => {
        const history = JSON.parse(sessionStorage.getItem('graphHistory'));
        const location = JSON.parse(sessionStorage.getItem('location'));
        sessionStorage.location = location + 1;
        if (this.props.data.idSet.indexOf(parseInt(history[location + 1], 10)) > -1) {
            this.props.history.push('/graph/' + history[location + 1]);
        } else {
            console.log('Unknown : ', history[location - 1])
        }
    }

    render() {

        const disabled = JSON.parse(sessionStorage.graphHistory).length - 1 === JSON.parse(sessionStorage.location);

        return <SideElement
            id="tooltip-ResetButton"
            title={this.props.translate('graph.sideButtons.nextTooltip')}
            placement="right"
            content={<RedoIcon className={this.props.classes.icon} />}
            onClick={this.handleClick}
            disabled={disabled}
            {...this.props}
            button
        />
    }
}

NextButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NextButton);