import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HistoryNext from './HistoryNext';
import HistoryPrevious from './HistoryPrevious';

const styles = theme => ({
    historyContainer: {
        position: 'absolute',
        zIndex: 1
    }
});

class GraphHistoryNavigation extends Component {
    render() {
        const { classes, ...noClassProps } = this.props;
        return (
            <div className={classes.historyContainer} style={this.props.clientType === "mobile" ? { left: 4, top: -48 } : { left: 16 }}>
                <HistoryPrevious {...noClassProps} />
                <HistoryNext {...noClassProps} />
            </div>
        )
    }
}

export default withStyles(styles)(GraphHistoryNavigation);