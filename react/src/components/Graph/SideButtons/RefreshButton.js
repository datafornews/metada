// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResetIcon from 'react-icons/lib/fa/refresh';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';

const styles = theme => (sideButtonStyle);

class HomeButton extends React.Component {


    handleClick = () => {
        this.props.reRenderGraph();
    }

    render() {

        return <SideElement
            id="tooltip-ResetButton"
            title={this.props.translate('graph.sideButtons.resetTooltip')}
            placement="right"
            content={<ResetIcon className={this.props.classes.icon} />}
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