// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import HomeIcon from 'material-ui-icons/Home';
import Tooltip from 'material-ui/Tooltip';
import sideButtonStyle from './sideButtonStyle';

const styles = theme => (sideButtonStyle);

class HomeButton extends React.Component {
    
    handleClick = () => {
        this.props.show.searchBar && this.props.toggleSearchBar();
        sessionStorage.graphHistory = '[]';
        sessionStorage.location = '-1';
        this.props.history.push('/');
    }

    render() {

        return (
            <Tooltip
                id="tooltip-HomeButton"
                title={this.props.translate('graph.sideButtons.homeTooltip')}
                placement="bottom"
                style={{ textAlign: 'center' }}
            >
                <Button raised fab className={this.props.classes.button} onClick={this.handleClick}>
                    <HomeIcon className={this.props.classes.icon} />
                </Button>
            </Tooltip>
        );
    }
}

HomeButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeButton);