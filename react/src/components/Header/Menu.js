import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'



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
    }
        
    render() {
        const { anchorEl } = this.state;

        return (
            <div>
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
                    <MenuItem onClick={this.goTo('/')}>Home</MenuItem>
                    <MenuItem onClick={this.goTo('/about')}>About</MenuItem>
                    <MenuItem onClick={this.goTo('/contact')}>Contact</MenuItem>
                    <MenuItem onClick={this.goTo('/extension')}>Extension</MenuItem>
                    <MenuItem onClick={this.goTo('/settings')}>Settings</MenuItem>

                </Menu>
            </div>
        );
    }
}

export default FadeMenu;