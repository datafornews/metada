import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import HelpIcon from 'react-icons/lib/fa/question-circle';
import IssueIcon from 'react-icons/lib/fa/exclamation-circle';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import Menu from './Header/Menu';
import SearchBar from './Search/SearchBar';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import Logo from './Header/Logo'
import Grid from '@material-ui/core/Grid';
import mapStateToProps from '../store/defaultMapStateToProps';
import mapDispatchToProps from '../store/defaultMapDispatchToProps';
import withWidth from '@material-ui/core/withWidth';

const _drawerWidth = Math.max(
    window.innerWidth < 800 ? parseInt(window.innerWidth * 0.4, 10) : parseInt(window.innerWidth * 0.25, 10),
    150
);

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
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 3 * 3,
        minWidth: 0, // So the Typography noWrap works,
        minHeight: `calc(100vh - ${theme.spacing.unit * 3 * 4}px)`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        position: "relative",
        overflow: "scroll",
        maxHeight: '100vh'
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
        justifyContent: 'center'
    },
    menuGridDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.only('xs')]: {
            // backgroundColor: 'red',
            justifyContent: 'space-evenly',
        },
    },
    menuGridDivDrawer: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            // backgroundColor: 'red',
            justifyContent: 'space-evenly',
        }
    }
});

class Container extends Component {

    state = { drawerWidth: _drawerWidth }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const drawerWidth = Math.max(
            window.innerWidth < 800 ? parseInt(window.innerWidth * 0.4, 10) : parseInt(window.innerWidth * 0.25, 10),
            150
        );
        this.setState({
            drawerWidth
        })
        console.log('Container :', drawerWidth);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    goHome = () => {
        this.props.history.push('/');
    }

    render() {
        const { classes, children, clientType, data, dataIsAvailable,
            history, isRehydrated, show, match,
            toggleIssue, toggleHelp, translate, updateEntityInfoBox, isGraph, width } = this.props;

        const isMobile = clientType === 'mobile';
        const paddingLeft = isMobile ? 0 : 16;
        const paddingRight = isMobile ? 0 : 16;
        const location = history.location.pathname.split('/')[1];
        const titleLoc = location ? location : 'search';
        const showSearchBar = !show.mainSearchBar && (!isMobile || !show.drawer);
        const isLarge = ["xl", "lg", "md"].indexOf(width) > -1;

        return (
            <div className={classes.root}>
                <Helmet>
                    <title>Metada - {this.props.translate('home.menu.' + titleLoc)}</title>
                </Helmet>
                <AppBar
                    className={classNames(
                        classes.appBar,
                        {
                            [classes.appBarShift]: isRehydrated && show.drawer && isGraph,
                        }
                    )}
                    position="absolute"
                    style={{
                        marginLeft: isRehydrated && show.drawer && isGraph ? this.state.drawerWidth : 'unset',
                        width: isRehydrated && show.drawer && isGraph ? `calc(100% - ${this.state.drawerWidth}px)` : '100%',
                    }}
                >
                    <Toolbar style={{ paddingLeft, paddingRight }}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid
                                className={classNames(classes.menuGridDiv, show.drawer && classes.menuGridDivDrawer)}
                                item xs={12} sm={show.drawer ? 12 : 6} md={show.drawer ? 5 : 4}
                            >
                                <Menu
                                    history={history}
                                    clientType={clientType}
                                    show={show}
                                    isRehydrated={isRehydrated}
                                    translate={translate}
                                />
                                {/* </div> */}
                                {isGraph && !(width === "xs" && show.drawer) ?
                                    <Grow
                                        in={isGraph && !(width === "xs" && show.drawer)}
                                        timeout={{
                                            enter: 300,
                                            exit: 0
                                        }}
                                    >
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
                                    </Grow>
                                    :
                                    width === "xs" && 0 ?

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
                            {(showSearchBar || isLarge ) && <Fade in={showSearchBar} timeout={250}>
                                <Grid item xs={12} sm={show.drawer ? 12 : 5} md={show.drawer ? 5 : 4}>
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
                                </Grid>
                            </Fade>}

                        </Grid>
                    </Toolbar>
                </AppBar>
                {this.props.drawer}
                <main
                    className={classNames(
                        classes.content,
                        {
                            [classes.contentShift]: isGraph && show.drawer,
                            [classes["contentShift-left"]]: isGraph && show.drawer,
                        },
                        isMobile && classes.noPadding
                    )}
                    style={{
                        overflow: isGraph ? 'hidden' : 'scroll',
                        marginLeft: isRehydrated && isGraph ? show.drawer ? "0px" : -this.state.drawerWidth : "0px",
                        width: isRehydrated && show.drawer && isGraph ? `calc(100% - ${this.state.drawerWidth}px)` : '100%',
                    }}
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
