import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import NextIcon from 'react-icons/lib/md/arrow-forward';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    icon: {
        height: 40,
        width: 40
    }
});

class HistoryNext extends Component {

    handleClick = () => {
        const newLoc = this.props.routerLocations.locations[this.props.routerLocations.index + 1];
        this.props.history.push(newLoc);
        this.props.updateEntityInfoBox(parseInt(newLoc.split('/').reverse()[0], 10))
        this.props.goToNextGraph();
    }

    render() {
        const { classes, routerLocations } = this.props;
        const title = this.props.translate('graph.nextGraphTooltip');
        const disabled = routerLocations ? routerLocations.index === routerLocations.locations.length - 1 : true;

        return disabled ?
            <div style={{ display: this.props.clientType === 'mobile' ? 'inline-block' : 'block' }}>
                <IconButton disabled={disabled}>
                    <NextIcon />
                </IconButton>
            </div>
            :
            <Tooltip
                title={title}
                placement="right"
            >
                <div style={{ display: this.props.clientType === 'mobile' ? 'inline-block' : 'block' }}>
                    <IconButton disabled={disabled} onClick={this.handleClick}>
                        <NextIcon className={classes.icon} />
                    </IconButton>
                </div>
            </Tooltip>

    }
}

export default withStyles(styles)(HistoryNext);