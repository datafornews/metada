import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from 'react-icons/lib/ti/home-outline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from 'react-icons/lib/go/settings';
import ContactIcon from 'react-icons/lib/go/mail';
import AboutIcon from 'react-icons/lib/go/organization';
import ExtensionIcon from 'react-icons/lib/go/package';
import StatsIcon from 'react-icons/lib/fa/bar-chart';

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {
        height: 30,
        width: 30
    },
});


class FadeMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    goTo = to => () => {
        console.log(to);
        this.props.history.push(to)
        this.handleClose()
    }

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <span>
                <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    aria-owns={anchorEl ? 'fade-menu' : null}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuList>
                        <MenuItem onClick={this.goTo('/')}>
                            <ListItemIcon className={classes.icon}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
                        </MenuItem>
                        <MenuItem onClick={this.goTo('/about')}>
                            <ListItemIcon className={classes.icon}>
                                <AboutIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="About" />
                        </MenuItem>
                        <MenuItem onClick={this.goTo('/contact')}>
                            <ListItemIcon className={classes.icon}>
                                <ContactIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Contact" />
                        </MenuItem>
                        <MenuItem onClick={this.goTo('/extension')}>
                            <ListItemIcon className={classes.icon}>
                                <ExtensionIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Extension" />
                        </MenuItem>
                        <MenuItem onClick={this.goTo('/settings')}>
                            <ListItemIcon className={classes.icon}>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.primary }} inset primary="Settings" />
                        </MenuItem>
                    </MenuList>
                </Menu>
            </span>
        );
    }
}

export default withStyles(styles)(FadeMenu);