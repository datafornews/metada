// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SearchIcon from 'material-ui-icons/Search';
import Scroll from 'react-scroll';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';

const styles = theme => (sideButtonStyle);

class SearchButton extends React.Component {


    handleClick = () => {
        if (!this.props.show.searchBar) {
            // this.props.toggleSideButtons();
            this.props.toggleSearchBar();
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
        return <SideElement
            id="tooltip-SearchButton"
            title={
                this.props.show.searchBar ?
                    this.props.translate('graph.sideButtons.searchTooltipDisabled')
                    :
                    this.props.translate('graph.sideButtons.searchTooltip')
            }
            placement="right"
            content={<SearchIcon className={classes.icon} />}
            onClick={this.handleClick}
            {...this.props}
            button
        />
    }
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButton);