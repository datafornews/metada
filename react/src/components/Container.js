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
import Logo from './Header/Logo'
import Grid from '@material-ui/core/Grid';
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
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    mobileToolbar: {
        textAlign: "center"
    },
    iconButton: {
        width: '45%',
        maxWidth: 50,
        margin: '0px 4px'
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
    'content-left': {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    noPadding: {
        padding: `${theme.spacing.unit * 3 * 3}px 0px 0px 0px`
    },
    searchBar: {
        height: "52px",
        display: "flex",
    }
});

class Container extends Component {

    goHome = () => {
        this.props.history.push('/');
    }

    render() {
        const { classes, children, clientType, data, dataIsAvailable,
            history, isRehydrated, show, match,
            toggleIssue, toggleHelp, translate, updateEntityInfoBox, isGraph } = this.props;

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
                        [classes["appBarShift-left"]]: isRehydrated && show.drawer && isGraph,
                    }
                )
                }
                    position="absolute">
                    <Toolbar style={{ paddingLeft, paddingRight }}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            {/* <div style={{ width: widths[0], margin: "auto" }} className={isMobile ? classes.mobileToolbar : undefined}> */}
                            <Grid item xs={6} sm={5}>
                                <Menu
                                    history={history}
                                    clientType={clientType}
                                    show={show}
                                    isRehydrated={isRehydrated}
                                    translate={translate}
                                />
                                {/* </div> */}
                                {history.location.pathname.startsWith("/graph/") ?

                                    <Fade in={!(isMobile && show.drawer)} timeout={500}>
                                        <div style={{ display: "inline-flex", justifyContent: 'flex-start' }}>
                                            <IconButton
                                                onClick={toggleIssue}
                                                style={{ color: "white" }}
                                                className={classes.iconButton}
                                            >
                                                <IssueIcon />
                                            </IconButton>
                                            {isMobile && <br />}
                                            <IconButton
                                                onClick={toggleHelp}
                                                style={{ color: "white" }}
                                                className={classes.iconButton}
                                            >
                                                <HelpIcon />
                                            </IconButton>
                                        </div>
                                    </Fade>
                                    :
                                    isMobile ?

                                        <Logo
                                            color="inherit"
                                            aria-haspopup="true"
                                            onClick={this.goHome}
                                            clientType={clientType}
                                            show={show}
                                            isRehydrated={isRehydrated}
                                        />
                                        : ''
                                }
                            </Grid>
                            <Grid item xs={6} sm={show.drawer ? 6 : 5} md={show.drawer ? 5 : 4}>
                                <Fade in={!isMobile || !show.drawer} timeout={500}>
                                    {/* <div style={{ width: widths[1], margin: "auto" }}> */}

                                    <div>
                                        {dataIsAvailable && <div className={classes.searchBar}><SearchBar
                                            data={data}
                                            show={show}
                                            history={history}
                                            match={match}
                                            isGraph={isGraph}
                                            translate={translate}
                                            preventAutofocus={true}
                                            updateEntityInfoBox={updateEntityInfoBox}
                                            controlStyle={{
                                                margin: 'auto',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        /></div>}
                                    </div>
                                    {/* </div> */}
                                </Fade>
                            </Grid>
                            {/* <div style={{ width: widths[2], margin: "auto" }}> */}

                            {/* </div> */}

                        </Grid>
                    </Toolbar>
                </AppBar>
                {this.props.drawer}
                <main className={classNames(
                    classes.content,
                    isGraph && classes['content-left'],
                    {
                        [classes.contentShift]: isGraph && show.drawer,
                        [classes["contentShift-left"]]: isGraph && show.drawer,
                    },
                    isMobile && classes.noPadding
                )}
                    style={{ overflow: isGraph ? 'hidden' : 'scroll' }}
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

export default withStyles(styles)(_Container);
