import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Menu from './Header/Menu';
import AppBarIcons from './Header/AppBarIcons';
import SearchBar from './Search/SearchBar';
import Logo from './Header/Logo'

import { withStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    appBar: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.default,
        position: 'fixed',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuGridDiv: {
        [theme.breakpoints.only('xs')]: {
            justifyContent: 'space-evenly',
            minHeight: 52
        },
        alignItems: 'left',
        display: 'flex',
        justifyContent: 'space-between'
    },
    menuGridDivDrawer: {
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-evenly'
        },
        display: 'flex'
    },
    searchBar: {
        display: "flex",
        height: "52px",
        justifyContent: 'center'
    },
    toolbar: {
        [theme.breakpoints.only('xs')]: {
            paddingLeft: 0,
            paddingRight: 0
        },
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
});

class AppBar extends Component {

    goHome = () => {
        this.props.history.push('/');
    }

    render() {
        const { classes, clientType, data, dataIsAvailable,
            history, isRehydrated, show, match, showSearchBar,
            toggleIssue, toggleHelp, translate, updateEntityInfoBox, isGraph, width } = this.props;

        return <MaterialAppBar
            className={classNames(
                classes.appBar,
                {
                    [classes.appBarShift]: isRehydrated && show.drawer && isGraph,
                }
            )}
            position="absolute"
            style={{
                marginLeft: isRehydrated && show.drawer && isGraph ? "15vw" : 'unset',
                width: isRehydrated && show.drawer && isGraph ? `75vw` : '100vw',
            }}
        >
            <Toolbar className={classes.toolbar}>
                <Menu
                    history={history}
                    clientType={clientType}
                    show={show}
                    isRehydrated={isRehydrated}
                    translate={translate}
                    isGraph={isGraph}
                />
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid
                        item
                        className={classNames(classes.menuGridDiv, show.drawer && classes.menuGridDivDrawer)}
                        xs={12}
                        sm={show.drawer && isGraph ? 12 : 6}
                        md={show.drawer && isGraph ? 5 : 4}
                    >

                        <Logo
                            color="inherit"
                            aria-haspopup="true"
                            onClick={this.goHome}
                            clientType={clientType}
                            show={show}
                            isRehydrated={isRehydrated}
                        />

                        <AppBarIcons
                            toggleHelp={toggleHelp}
                            toggleIssue={toggleIssue}
                            isGraph={Boolean(isGraph)}
                            width={width}
                            show={show}
                        />
                    </Grid>
                    <Fade in={showSearchBar} timeout={250} unmountOnExit={width === "xs"} mountOnEnter={width === "xs"}>
                        <Grid item xs={12} sm={show.drawer && isGraph ? 12 : 5} md={show.drawer && isGraph ? 5 : 4}>
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
                    </Fade>

                </Grid>
            </Toolbar>
        </MaterialAppBar>
    }
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);