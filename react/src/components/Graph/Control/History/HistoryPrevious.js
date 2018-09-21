import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PreviousIcon from 'react-icons/lib/md/arrow-back';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    icon: {
        height: 40,
        width: 40
    }
});

class HistoryPrevious extends Component {

    handleClick = () => {
        const newLoc = this.props.routerLocations.locations[this.props.routerLocations.index - 1];
        this.props.history.push(newLoc);
        this.props.goToPreviousGraph();
        this.props.updateEntityInfoBox(parseInt(newLoc.split('/').reverse()[0], 10))
    }

    render() {
        const { classes, routerLocations, translate, clientType } = this.props;
        const title = translate('graph.previousGraphTooltip');
        const disabled = routerLocations ? routerLocations.index === 0 : true;
        return disabled ?
            <div style={{ display: clientType === 'mobile' ? 'inline-block' : 'block' }}>
                <IconButton disabled={disabled}>
                    <PreviousIcon />
                </IconButton>
            </div>
            :
            <Tooltip
                title={title}
                placement="right"
            >
                <div style={{ display: clientType === 'mobile' ? 'inline-block' : 'block' }}>
                    <IconButton disabled={disabled} onClick={this.handleClick}>
                        <PreviousIcon className={classes.icon} />
                    </IconButton>
                </div>
            </Tooltip >

    }
}


HistoryPrevious.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    routerLocations: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(HistoryPrevious);