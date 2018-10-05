import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HistoryNext from './HistoryNext';
import HistoryPrevious from './HistoryPrevious';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
    historyContainer: {
        position: 'absolute',
        zIndex: 1
    }
});

class GraphHistoryNavigation extends Component {
    render() {
        const { classes, clientType, translate, routerLocations, history, show,
            goToPreviousGraph, goToNextGraph, updateEntityInfoBox } = this.props;

        return (
            <Fade in={clientType !== 'mobile' || !show.drawer}>
                <div className={classes.historyContainer} style={clientType === "mobile" ? { left: 4, top: -48 } : { left: 16 }}>
                    {routerLocations.index !== 0 && <HistoryPrevious
                        translate={translate}
                        clientType={clientType}
                        routerLocations={routerLocations}
                        history={history}
                        goToPreviousGraph={goToPreviousGraph}
                        updateEntityInfoBox={updateEntityInfoBox}
                    />}
                    {routerLocations.locations.length > 1 && routerLocations.locations.length - 1 !== routerLocations.index && <HistoryNext
                        translate={translate}
                        clientType={clientType}
                        routerLocations={routerLocations}
                        history={history}
                        goToNextGraph={goToNextGraph}
                        updateEntityInfoBox={updateEntityInfoBox}
                    />}
                </div>
            </Fade>
        )
    }
}

GraphHistoryNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    routerLocations: PropTypes.object.isRequired,
    show: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(GraphHistoryNavigation);