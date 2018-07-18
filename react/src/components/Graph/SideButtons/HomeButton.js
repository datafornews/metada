// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';

import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';

const styles = theme => (sideButtonStyle);

class HomeButton extends React.Component {


    handleClick = () => {
        this.props.show.searchBar && this.props.toggleSearchBar();
        sessionStorage.graphHistory = '[]';
        sessionStorage.location = '-1';
        this.props.history.push('/');
    }

    render() {

        return <SideElement
            id="tooltip-HomeButton"
            title={this.props.translate('graph.sideButtons.homeTooltip')}
            placement="right"
            content={<HomeIcon className={this.props.classes.icon} />}
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