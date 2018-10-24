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
import Menu from '@material-ui/core/Menu';

import HomeIcon from 'react-icons/lib/md/home';
import ContactIcon from 'react-icons/lib/md/email';
import ExtensionIcon from '@material-ui/icons/SaveAltTwoTone';
import StatsIcon from 'react-icons/lib/md/insert-chart';
import SettingsIcon from 'react-icons/lib/md/settings';
import AboutIcon from 'react-icons/lib/md/people';
import ContributeIcon from 'react-icons/lib/io/upload';

import Share from './Share';


import { AsyncComponents } from '../../index';

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.secondary.main,
            outline: "none"
        },
    },
    icon: {
        height: theme.spacing.unit * 4,
        width: theme.spacing.unit * 4,
        color: theme.palette.default
    },
    menuList: {
        outline: "none"
    },
    menu: {
        padding: 0
    },
    paper: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '0px 0px 4px 4px',
    },
    secondary: {
        color: theme.palette.default
    },
    burgerButton: {
        position: 'absolute',
        left: theme.spacing.unit
    },
    menuDiv: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'inline-flex',
    },
    menuItemIcon: {
        [theme.breakpoints.only('xs')]: {
            marginRight: 0
        }
    },
    em: {
        fontSize: "3em",
        color: theme.palette.default
    },
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

    preload = componentName => () => {

        let name;
        if (componentName in AsyncComponents) {
            name = componentName
        } else {
            name = 'main';
        };
        // console.log('preloading', name);
        AsyncComponents[name].preload();

    }



    render() {
        const { anchorEl } = this.state;
        const { classes, clientType, history } = this.props;
        const path = history.location.pathname;
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
                                classes.burgerButton
                            )
                        }
                            type="button"
                            onClick={this.clickMenu}
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>

                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.close}
                        classeName={classes.root}
                        classes={{
                            paper: classes.paper
                        }}
                    >
                        <MenuList className={classes.menuList} onMouseLeave={this.close}>

                            <MenuItem className={classes.menuItem} onMouseOver={this.preload('')} onClick={this.goTo('/')}>
                                <ListItemIcon classes={{ root: classes.menuItemIcon }} className={classes.icon}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.home')} />
                                {path === "/" && <span className={classes.em}>•</span>}
                            </MenuItem>

                            {this.props.clientType === "extension" && <MenuItem className={classes.menuItem} onMouseOver={this.preload('stats')} onClick={this.goTo('/stats')}>
                                <ListItemIcon classes={{ root: classes.menuItemIcon }} className={classes.icon}>
                                    <StatsIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.stats')} />
                                {path === "/stats" && <span className={classes.em}>•</span>}
                            </MenuItem>}

                            <MenuItem className={classes.menuItem} onMouseOver={this.preload('about')} onClick={this.goTo('/about')}>
                                <ListItemIcon classes={{ root: classes.menuItemIcon }} className={classes.icon}>
                                    <AboutIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.about')} />
                                {path === "/about" && <span className={classes.em}>•</span>}
                            </MenuItem>

                            <MenuItem className={classes.menuItem} onMouseOver={this.preload('contribute')} onClick={this.goTo('/contribute')}>
                                <ListItemIcon classes={{ root: classes.menuItemIcon }} className={classes.icon}>
                                    <ContributeIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.contribute')} />
                                {path === "/contribute" && <span className={classes.em}>•</span>}
                            </MenuItem>

                            {this.props.clientType !== "extension" && <MenuItem className={classes.menuItem} onMouseOver={this.preload('extension')} onClick={this.goTo('/extension')}>
                                <ListItemIcon classes={{ root: classes.menuItemIcon }} className={classes.icon}>
                                    <ExtensionIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.extension')} />
                                {path === "/extension" && <span className={classes.em}>•</span>}
                            </MenuItem>}

                            <MenuItem className={classes.menuItem} onMouseOver={this.preload('contact')} onClick={this.goTo('/contact')}>
                                <ListItemIcon classes={{ root: classes.menuItemIcon }} className={classes.icon}>
                                    <ContactIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.contact')} />
                                {path === "/contact" && <span className={classes.em}>•</span>}
                            </MenuItem>

                            <MenuItem className={classes.menuItem} onMouseOver={this.preload('settings')} onClick={this.goTo('/settings')}>
                                <ListItemIcon classes={{ root: classes.menuItemIcon }} className={classes.icon}>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.secondary }} inset primary={this.props.translate('home.menu.settings')} />
                                {path === "/settings" && <span className={classes.em}>•</span>}
                            </MenuItem>

                            <MenuItem className={classes.menuItem} >
                                <Share clientType={this.props.clientType} />
                            </MenuItem>

                        </MenuList>
                    </Menu>
                </div>
            </ClickAwayListener>
        );
    }
}

export default withStyles(styles)(CollapseMenu);