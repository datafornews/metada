import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import classNames from 'classnames';

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
import ContributeIcon from 'react-icons/lib/io/upload';

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
    },
    burgerButton: {
        marginRight: 12,
    },
    menuDiv: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'inline-flex',
    }
});


class CollapseMenu extends React.Component {
    state = {
        anchorEl: null,
        isOpen: false
    };

    handleClick = event => {
        if (this.props.clientType !== 'mobile') {
            this.goTo('/')()
        } else {
            this.setState({ anchorEl: this.anchor });
        }
    };

    close = () => {
        this.setState({ anchorEl: null, isOpen: false });
    };

    open = event => {
        this.setState({ anchorEl: this.anchor, isOpen: true });
    }

    clickMenu = () => {
        Boolean(this.state.isOpen) ? this.close() : this.open();
    }

    goTo = to => () => {
        this.props.history.push(to);
        this.close();
    }

    render() {
        const { anchorEl } = this.state;
        const { classes, clientType } = this.props;
        return (
            <ClickAwayListener onClickAway={this.close}>
                <div
                    ref={(div) => {
                        this.anchor = div;
                    }}
                    className={classes.container}
                >
                    <div className={classes.menuDiv}>
                        <button className={
                            classNames(
                                'hamburger',
                                'hamburger--elastic',
                                {
                                    'is-active': Boolean(anchorEl)
                                },
                                'burgerButton'
                            )
                        }
                            type="button"
                            onClick={this.clickMenu}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                        {clientType !== 'mobile' && <Logo
                            color="inherit"
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            aria-owns={anchorEl ? 'fade-menu' : null}
                            clientType={this.props.clientType}
                            show={this.props.show}
                            isRehydrated={this.props.isRehydrated}
                        />}
                    </div>
                    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition disablePortal style={{zIndex: 10}}>
                        {({ TransitionProps, placement }) => (
                            <Collapse
                                {...TransitionProps}
                                timeout={{
                                    enter: 500
                                }}
                            >
                                <Paper className={classes.root} elevation={0}>
                                    <MenuList className={classes.menuList} onMouseLeave={this.close}>
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/')}>
                                            <ListItemIcon className={classes.icon}>
                                                <HomeIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.home')} />
                                        </MenuItem>
                                        {this.props.clientType === "extension" && <MenuItem className={classes.menuItem} onClick={this.goTo('/stats')}>
                                            <ListItemIcon className={classes.icon}>
                                                <StatsIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.stats')} />
                                        </MenuItem>}
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/about')}>
                                            <ListItemIcon className={classes.icon}>
                                                <AboutIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.about')} />
                                        </MenuItem>
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/contribute')}>
                                            <ListItemIcon className={classes.icon}>
                                                <ContributeIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.contribute')} />
                                        </MenuItem>
                                        {this.props.clientType !== "extension" && <MenuItem className={classes.menuItem} onClick={this.goTo('/extension')}>
                                            <ListItemIcon className={classes.icon}>
                                                <ExtensionIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.extension')} />
                                        </MenuItem>}
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/contact')}>
                                            <ListItemIcon className={classes.icon}>
                                                <ContactIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.contact')} />
                                        </MenuItem>
                                        <MenuItem className={classes.menuItem} onClick={this.goTo('/settings')}>
                                            <ListItemIcon className={classes.icon}>
                                                <SettingsIcon />
                                            </ListItemIcon>
                                            <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.settings')} />
                                        </MenuItem>
                                        <MenuItem className={classes.menuItem} >
                                            <Share clientType={this.props.clientType} />
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </Collapse>
                        )}
                    </Popper>
                </div>
            </ClickAwayListener>
        );
    }
}

export default withStyles(styles)(CollapseMenu);