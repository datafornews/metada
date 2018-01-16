// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';
import Tooltip from 'material-ui/Tooltip';
import Scroll from 'react-scroll';
import sideButtonStyle from './sideButtonStyle';

const styles = theme => (sideButtonStyle);

class SearchButton extends React.Component {


    handleClick = () => {
        if (!this.props.show.searchBar) {
            this.props.toggleSearchBar()
            this.props.clientType === 'mobile' && this.props.toggleSideButtons();
        } else {
            Scroll.animateScroll.scrollToTop({
                duration: 300,
                delay: 0,
                smooth: true
            });
            setTimeout(this.props.focusSearchBar, 200)
        }
    }

    render() {
        const { classes } = this.props
        return (
            <Tooltip
                id="tooltip-SearchButton"
                title={
                    this.props.show.searchBar ?
                        this.props.translate('graph.sideButtons.searchTooltipDisabled')
                        :
                        this.props.translate('graph.sideButtons.searchTooltip')
                }
                placement="bottom"
                className={classes.tooltip}
            >
                <Button raised fab className={classes.button} onClick={this.handleClick}>
                    <SearchIcon className={classes.icon} />
                </Button>
            </Tooltip>
        );
    }
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButton);