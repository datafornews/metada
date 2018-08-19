import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import ClearIcon from '@material-ui/icons/Clear';
import DescriptionIcon from 'react-icons/lib/fa/file-text';
import HelpIcon from 'react-icons/lib/fa/question-circle';


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
            position: 'relative',
            display: 'flex',
        },
        appBar: {
            position: 'absolute',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
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
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit * 3,
            paddingTop: theme.spacing.unit * 3 * 3,
            minWidth: 0, // So the Typography noWrap works,
            height: "100%",
            minHeight: `calc(100vh - ${theme.spacing.unit * 3 * 4}px)`,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            position: "relative",
            overflow: "scroll"
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
            padding: "48px 0px"
        },
        mobileToolbar: {
            marginBottom: "8px !important",
            textAlign: "center"
        }
    }
);



class ClippedDrawer extends Component {


    componentWillMount() {
        if (this.props.history.location.pathname.startsWith("/graph/")) {
            !this.props.show.drawer && this.props.toggleDrawer()
        } else {
            this.props.show.drawer && this.props.toggleDrawer()
        }
    }

    toggleHelp = () => {
        this.props.show.help ? this.props.stopHelp() : this.props.startHelp();
        this.props.clientType !== "mobile" && setTimeout(this.props.reRenderGraph, 300)
    }

    goHome = () => {
        this.props.show.drawer && this.props.toggleDrawer();
        this.props.history.push('/');
    }

    render() {
        const { classes, ...noClassProps } = this.props;

        const size = this.props.clientType !== "mobile" ? "large" : 'small';

        const drawerContent = !this.props.history.location.pathname.startsWith("/graph/") ? "" : <DrawerContent {...noClassProps} />
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
                    <Toolbar>
                        <div style={{ width: "30%", margin: "auto" }} className={this.props.clientType === "mobile" ? classes.mobileToolbar : undefined}>

                            <Menu history={this.props.history} clientType={this.props.clientType}/>
                            <Button size={size} mini={size === "small"} variant="extendedFab" aria-label="metada" color="secondary" onClick={this.goHome}>
                                Metada
                            </Button>
                        </div>
                        {(this.props.clientType !== "mobile" || !this.props.show.drawer) && <div style={{ width: "50%", margin: "auto" }}>


                            <SearchBar
                                data={this.props.data}
                                toggleAbout={this.props.toggleAbout}
                                show={this.props.show}
                                closeAll={this.props.closeAll}
                                toggleSideButtons={this.props.toggleSideButtons}
                                history={this.props.history}
                                data={this.props.data}
                                translate={this.props.translate}
                                preventAutofocus={this.props.preventAutofocus}
                                updateEntityInfoBox={this.props.updateEntityInfoBox}
                            />
                        </div>}
                        <div style={{ width: "20%", margin: "auto" }}>
                            {!this.props.show.drawer && this.props.history.location.pathname.startsWith("/graph/") &&
                                <div style={{display:"flex", justifyContent:'flex-end'}}>
                                    <IconButton
                                        onClick={this.toggleHelp}
                                        style={{color: "white" }}
                                    >
                                        <HelpIcon />
                                    </IconButton>
                                </div>
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
                    this.props.clientType === "mobile" && classes.noPadding
                )}>
                    {this.props.children}
                </main>

                {this.props.history.location.pathname.startsWith('/graph/') && <Drawer
                    variant="persistent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={this.props.show.drawer}
                    anchor="right"
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.props.toggleDrawer}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                    {drawerContent}
                </Drawer>
                }
            </div>
        );
    }
}


ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);