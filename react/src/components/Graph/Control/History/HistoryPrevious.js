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
        const { classes, routerLocations } = this.props;
        const title = this.props.translate('graph.previousGraphTooltip');
        const disabled = routerLocations ? routerLocations.index === 0 : true;
        return disabled ?
            <div style={{ display: this.props.clientType === 'mobile' ? 'inline-block' : 'block' }}>
                <IconButton disabled={disabled}>
                    <PreviousIcon />
                </IconButton>
            </div>
            :
            <Tooltip
                title={title}
                placement="right"
            >
                <div style={{ display: this.props.clientType === 'mobile' ? 'inline-block' : 'block' }}>
                    <IconButton disabled={disabled} onClick={this.handleClick}>
                        <PreviousIcon className={classes.icon} />
                    </IconButton>
                </div>
            </Tooltip >

    }
}

export default withStyles(styles)(HistoryPrevious);