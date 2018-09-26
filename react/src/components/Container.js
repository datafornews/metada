import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import HelpIcon from 'react-icons/lib/fa/question-circle';
import IssueIcon from 'react-icons/lib/fa/exclamation-circle';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import Menu from './Header/Menu';
import SearchBar from './Search/SearchBar';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import mapStateToProps from '../store/defaultMapStateToProps';
import mapDispatchToProps from '../store/defaultMapDispatchToProps';

let drawerWidth = window.innerWidth < 800 ? parseInt(window.innerWidth * 0.4, 10) : parseInt(window.innerWidth * 0.25, 10);
if (drawerWidth < 50) {
    drawerWidth = 300;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex',
        maxHeight: '100vh',
        position: 'relative',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.default
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    mobileToolbar: {
        textAlign: "center"
    },
    iconButton: {
        width: '45%',
        margin: 'auto',
        maxWidth: 50
    },
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 3 * 3,
        minWidth: 0, // So the Typography noWrap works,
        // height: "100%",
        minHeight: `calc(100vh - ${theme.spacing.unit * 3 * 4}px)`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        position: "relative",
        overflow: "scroll",
        maxHeight: '100vh'
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-right': {
        marginRight: 0,
    },
    noPadding: {
        padding: `${theme.spacing.unit * 3 * 3}px 0px 0px 0px`
    },
});

class Container extends Component {
    render() {

        console.log('this.props :', this.props);

        const { classes, children, clientType, data, dataIsAvailable,
            history, isRehydrated, show, match,
            toggleIssue, translate, updateEntityInfoBox, isGraph } = this.props;

        const isMobile = clientType === 'mobile';
        const widths = isMobile ? show.drawer ? ["100%", "0%", "0%"] : ["25%", "50%", "25%"] : ["30%", "40%", "30%"];
        const paddingLeft = isMobile ? 0 : 16;
        const paddingRight = isMobile ? 0 : 16;
        const location = history.location.pathname.split('/')[1];
        const titleLoc = location ? location : 'search';

        return (
            <div className={classes.root}>
                <Helmet>
                    <title>Metada - {this.props.translate('home.menu.' + titleLoc)}</title>
                </Helmet>
                <AppBar className={classNames(
                    classes.appBar,
                    {
                        [classes.appBarShift]: isRehydrated && show.drawer && isGraph,
                        [classes["appBarShift-right"]]: isRehydrated && show.drawer && isGraph,
                    }
                )
                }
                    position="absolute">
                    <Toolbar style={{ paddingLeft, paddingRight }}>
                        <div style={{ width: widths[0], margin: "auto" }} className={isMobile ? classes.mobileToolbar : undefined}>
                            <Menu
                                history={history}
                                clientType={clientType}
                                show={show}
                                isRehydrated={isRehydrated}
                                translate={translate}
                            />
                        </div>
                        <Fade in={!isMobile || !show.drawer} timeout={500}>
                            <div style={{ width: widths[1], margin: "auto" }}>


                                {dataIsAvailable && <SearchBar
                                    data={data}
                                    show={show}
                                    history={history}
                                    match={match}
                                    isGraph={isGraph}
                                    translate={translate}
                                    preventAutofocus={true}
                                    updateEntityInfoBox={updateEntityInfoBox}
                                    selectStyle={{
                                        minHeight: 60,
                                        margin: 'auto',
                                        fontSize: 25,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                />}
                            </div>
                        </Fade>

                        <div style={{ width: widths[2], margin: "auto" }}>
                            {history.location.pathname.startsWith("/graph/") &&
                                <Fade in={!(isMobile && show.drawer)} timeout={500}>
                                    <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                                        <IconButton
                                            onClick={toggleIssue}
                                            style={{ color: "white" }}
                                            className={classes.iconButton}
                                        >
                                            <IssueIcon />
                                        </IconButton>
                                        {isMobile && <br />}
                                        <IconButton
                                            onClick={this.toggleHelp}
                                            style={{ color: "white" }}
                                            className={classes.iconButton}
                                        >
                                            <HelpIcon />
                                        </IconButton>
                                    </div>
                                </Fade>
                            }
                        </div>

                    </Toolbar>
                </AppBar>
                <main className={classNames(
                    classes.content,
                    isGraph && classes['content-right'],
                    {
                        [classes.contentShift]: isGraph && show.drawer,
                        [classes["contentShift-right"]]: isGraph && show.drawer,
                    },
                    isMobile && classes.noPadding
                )}
                    style={{ overflow: isGraph ? 'hidden' : 'scroll' }}
                >
                    {children}
                </main>
                {this.props.drawer}
            </div>
        )
    }
}

Container.propTypes = {
    classes: PropTypes.object.isRequired,
};

const _Container = connect(mapStateToProps, mapDispatchToProps)(Container);

export default withStyles(styles)(_Container);
