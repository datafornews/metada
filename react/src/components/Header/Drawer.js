import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import ClearIcon from '@material-ui/icons/Clear';
import HelpIcon from 'react-icons/lib/fa/question-circle';
import IssueIcon from 'react-icons/lib/fa/exclamation-circle';
import Fade from '@material-ui/core/Fade';


import PropTypes from 'prop-types';

import DrawerContent from './DrawerContent';

import Menu from './Menu';
import SearchBar from '../Search/SearchBar';


let drawerWidth = window.innerWidth < 800 ? parseInt(window.innerWidth * 0.4, 10) : parseInt(window.innerWidth * 0.25, 10);
if (drawerWidth < 50) {
    drawerWidth = 300;
}

const styles = theme => (
    {
        root: {
            flexGrow: 1,
            height: "100%",
            zIndex: 1,
            overflow: 'hidden',
            display: 'flex',
            maxHeight: '100vh'
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
        drawerPaper: {
            position: 'relative',
            width: drawerWidth,
            maxHeight: '100vh',
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
        toolbar: theme.mixins.toolbar,
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        noPadding: {
            padding: `${theme.spacing.unit * 3 * 3}px 0px 0px 0px`
        },
        mobileToolbar: {
            textAlign: "center"
        },
        iconButton: {
            width: '45%',
            margin: 'auto',
            maxWidth: 50
        },
        docked: {
            height: "100%"
        }
    }
);



class ClippedDrawer extends Component {


    componentWillMount() {
        if (!this.props.history.location.pathname.startsWith("/graph/")) {
            this.props.toggleDrawer(false);
        }
    }

    toggleHelp = () => {
        this.props.show.help ? this.props.stopHelp() : this.props.startHelp();
        const isMobile = this.props.clientType === 'mobile';
        !isMobile && setTimeout(this.props.reRenderGraph, 300)
    }

    goHome = () => {
        this.props.show.drawer && this.props.toggleDrawer();
        this.props.history.push('/');
    }

    render() {
        const { classes, ...noClassProps } = this.props;
        const isMobile = this.props.clientType === 'mobile';

        const widths = isMobile ? this.props.show.drawer ? ["100%", "0%", "0%"] : ["25%", "50%", "25%"] : ["30%", "40%", "30%"];
        const paddingLeft = isMobile ? 0 : 16;
        const paddingRight = isMobile ? 0 : 16;
        const isGraph = this.props.history.location.pathname.startsWith("/graph/");


        const drawerContent = !isGraph ? "" : <DrawerContent {...noClassProps} />
        return (
            <div className={classes.root}>
                <AppBar className={classNames(
                    classes.appBar,
                    {
                        [classes.appBarShift]: this.props.show.drawer,
                        [classes["appBarShift-right"]]: this.props.show.drawer,
                    }
                )
                }
                    position="absolute">
                    <Toolbar style={{ paddingLeft, paddingRight }}>
                        <div style={{ width: widths[0], margin: "auto" }} className={isMobile ? classes.mobileToolbar : undefined}>
                            <Menu
                                history={this.props.history}
                                clientType={this.props.clientType}
                                show={this.props.show}
                                isRehydrated={this.props.isRehydrated}
                            />
                        </div>
                        <Fade in={!isMobile || !this.props.show.drawer} timeout={500}>
                            <div style={{ width: widths[1], margin: "auto" }}>


                                {this.props.dataIsAvailable && <SearchBar
                                    data={this.props.data}
                                    toggleAbout={this.props.toggleAbout}
                                    show={this.props.show}
                                    toggleSideButtons={this.props.toggleSideButtons}
                                    history={this.props.history}
                                    translate={this.props.translate}
                                    preventAutofocus={this.props.preventAutofocus}
                                    updateEntityInfoBox={this.props.updateEntityInfoBox}
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
                            {this.props.history.location.pathname.startsWith("/graph/") &&
                                <Fade in={!(isMobile && this.props.show.drawer)} timeout={500}>
                                    <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                                        <IconButton
                                            onClick={this.props.toggleIssue}
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
                    this.props.history.location.pathname.startsWith('/graph/') && classes['content-right'],
                    {
                        [classes.contentShift]: this.props.show.drawer,
                        [classes["contentShift-right"]]: this.props.show.drawer,
                    },
                    isMobile && classes.noPadding
                )}
                    style={{ overflow: isGraph ? 'hidden' : 'scroll' }}
                >
                    {this.props.children}
                </main>

                {this.props.history.location.pathname.startsWith('/graph/') && <div style={{ maxHeight: '100vh' }}>
                    <Drawer
                        variant="persistent"
                        classes={{
                            paper: classes.drawerPaper,
                            docked: classes.docked
                        }}
                        open={this.props.isRehydrated && this.props.show.drawer}
                        anchor="right"
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.props.toggleDrawer}>
                                <ClearIcon />
                            </IconButton>
                        </div>
                        {drawerContent}
                    </Drawer>
                </div>
                }
            </div>
        );
    }
}


ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);