import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapStateToProps from '../store/defaultMapStateToProps';
import mapDispatchToProps from '../store/defaultMapDispatchToProps';
import AppBar from './AppBar';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Header from './Header/Header'

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex',
        position: 'relative',
        width: '100%',
    },
    limitHeight: {
        height: "100%",
        maxHeight: '100vh',
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 3 * 3,
        minWidth: 0, // So the Typography noWrap works,
        minHeight: `calc(100vh - ${theme.spacing.unit * 3 * 4}px)`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        position: "relative",
        overflow: "scroll",
        maxHeight: `calc(100vh - ${theme.spacing.unit * 3 * 3})px`,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    noPadding: {
        padding: `${theme.spacing.unit * 3 * 3}px 0px 0px 0px`
    },
    shiftMainDown: {
        paddingTop: theme.spacing.unit * 3 * 4
    },
    noMarginLeft: {
        marginLeft: "0px"
    },
    shiftMainLeft: {
        marginLeft: "-25vw",
        [theme.breakpoints.only('xs')]: {
            marginLeft: "-40vw",
        }
    },
    shrinkMainWidth: {
        width: "75vw",
        [theme.breakpoints.only('xs')]: {
            width: "60vw",
        }
    },
    fullMainWidth: {
        width: "100vw",
    },
});

class Container extends Component {

    render() {
        const { classes, children, clientType, data, dataIsAvailable,
            history, isRehydrated, show, match, isMain, setData, makeDataAvailable,
            toggleIssue, toggleHelp, translate, updateEntityInfoBox, isGraph, width } = this.props;

        const showSearchBar = isRehydrated && !(isMain && show.mainSearchBar) && !(isGraph && show.drawer && width === "xs");
        return (
            <div className={
                classNames(
                    classes.root,
                    !isMain && classes.limitHeight
                )
            }>
                <Header
                    translate={translate}
                    makeDataAvailable={makeDataAvailable}
                    setData={setData}
                    match={match}
                    data={data}
                    history={history}
                />

                <AppBar
                    showSearchBar={showSearchBar}
                    show={show}
                    clientType={clientType}
                    data={data}
                    dataIsAvailable={dataIsAvailable}
                    history={history}
                    isRehydrated={isRehydrated}
                    show={show}
                    match={match}
                    showSearchBar={showSearchBar}
                    toggleIssue={toggleIssue}
                    toggleHelp={toggleHelp}
                    translate={translate}
                    updateEntityInfoBox={updateEntityInfoBox}
                    isGraph={isGraph}
                    width={width}
                />

                {this.props.drawer}
                <main
                    className={classNames(
                        classes.content,
                        {
                            [classes.contentShift]: isGraph && show.drawer,
                            [classes["contentShift-left"]]: isGraph && show.drawer,
                        },
                        width === "xs" && classes.noPadding,
                        showSearchBar && width === "xs" && classes.shiftMainDown,
                        isRehydrated && isGraph ? show.drawer ? classes.noMarginLeft : classes.shiftMainLeft : classes.noMarginLeft,
                        isRehydrated && show.drawer && isGraph ? classes.shrinkMainWidth : classes.fullMainWidth
                    )}
                    style={{
                        overflow: isGraph ? 'hidden' : 'scroll',
                    }}
                    id="main-metada"
                >
                    {children}
                </main>
            </div>
        )
    }
}

Container.propTypes = {
    classes: PropTypes.object.isRequired,
};

const _Container = connect(mapStateToProps, mapDispatchToProps)(Container);

export default withWidth()(withStyles(styles)(_Container));
