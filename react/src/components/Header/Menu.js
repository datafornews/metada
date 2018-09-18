import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';

import MenuList from '@material-ui/core/MenuList';

import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from './Logo'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import HomeIcon from 'react-icons/lib/md/home';
import ContactIcon from 'react-icons/lib/md/email';
import ExtensionIcon from '@material-ui/icons/SaveAltTwoTone';
import StatsIcon from 'react-icons/lib/md/insert-chart';
import SettingsIcon from 'react-icons/lib/md/settings';
import AboutIcon from 'react-icons/lib/md/people';

import Share from './Share';

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.secondary.main,
            outline: "none"
        },
    },
    icon: {
        height: 30,
        width: 30,
        color: theme.palette.default
    },
    menuList: {
        outline: "none"
    },
    root: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '0px 0px 4px 4px',
    },
    secondary: {
        color: theme.palette.default
    }
});


class CollapseMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        console.log('handleclick');
        if (this.props.clientType !== 'mobile') {
            this.goTo('/')()
        } else {
            this.setState({ anchorEl: event.currentTarget });
        }
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    open = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    goTo = to => () => {
        this.props.history.push(to)
        this.handleClose()
    }

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <span>
                <Logo
                    color="inherit"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    aria-owns={anchorEl ? 'fade-menu' : null}
                    clientType={this.props.clientType}
                    onMouseEnter={this.open}
                    show={this.props.show}
                    isRehydrated={this.props.isRehydrated}
                />
                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Collapse
                            {...TransitionProps}
                            id="menu-list-grow"
                            timeout={{
                                enter: 500
                            }}
                        >
                            <Paper className={classes.root} elevation={0}>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList className={classes.menuList} onMouseLeave={this.handleClose}>
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/')}>
                                            <ListItemIcon className={classes.icon}>
                                                <HomeIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary="Home" />
                                        </MenuItem>
                                        {this.props.clientType === "extension" && <MenuItem className={classes.menuItem} onClick={this.goTo('/stats')}>
                                            <ListItemIcon className={classes.icon}>
                                                <StatsIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary="Stats" />
                                        </MenuItem>}
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/about')}>
                                            <ListItemIcon className={classes.icon}>
                                                <AboutIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary="About" />
                                        </MenuItem>
                                        {this.props.clientType !== "extension" && <MenuItem className={classes.menuItem} onClick={this.goTo('/extension')}>
                                            <ListItemIcon className={classes.icon}>
                                                <ExtensionIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary="Extension" />
                                        </MenuItem>}
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/contact')}>
                                            <ListItemIcon className={classes.icon}>
                                                <ContactIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary="Contact" />
                                        </MenuItem>
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/settings')}>
                                            <ListItemIcon className={classes.icon}>
                                                <SettingsIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary="Settings" />
                                        </MenuItem>
                                        <MenuItem className={classes.menuItem} >
                                            <Share clientType={this.props.clientType} />
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Collapse>
                    )}
                </Popper>
            </span>
        );
    }
}

export default withStyles(styles)(CollapseMenu);