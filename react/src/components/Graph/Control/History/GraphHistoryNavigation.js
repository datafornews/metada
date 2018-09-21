import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HistoryNext from './HistoryNext';
import HistoryPrevious from './HistoryPrevious';
import PropTypes from 'prop-types';

const styles = theme => ({
    historyContainer: {
        position: 'absolute',
        zIndex: 1
    }
});

class GraphHistoryNavigation extends Component {
    render() {
        const { classes, clientType, translate, routerLocations } = this.props;
        return (
            <div className={classes.historyContainer} style={clientType === "mobile" ? { left: 4, top: -48 } : { left: 16 }}>
                <HistoryPrevious
                    translate={translate}
                    clientType={clientType}
                    routerLocations={routerLocations}
                />
                <HistoryNext
                    translate={translate}
                    clientType={clientType}
                    routerLocations={routerLocations}
                />
            </div>
        )
    }
}

GraphHistoryNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    routerLocations: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(GraphHistoryNavigation);