import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Info from './Info';
import PropTypes from 'prop-types'
import {enableBodyScroll } from 'body-scroll-lock';
import classNames from 'classnames';


const _drawerWidth = Math.max(
    window.innerWidth < 800 ? parseInt(window.innerWidth * 0.4, 10) : parseInt(window.innerWidth * 0.25, 10),
    150
);

const styles = theme => (
    {
        container: {
            position: "relative",
            height: "100%"
        },
        drawerPaper: {
            position: 'relative',
            maxHeight: '100vh',
        },
        toolbar: theme.mixins.toolbar,
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        docked: {
            height: "100%"
        }
    }
);



class InfoDrawer extends Component {

    state = { drawerWidth: _drawerWidth }

    targetElement = null;

    componentWillMount() {
        if (!this.props.history.location.pathname.startsWith("/graph/")) {
            this.props.toggleDrawer(false);
        }
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const drawerWidth = this.props.clientType === "extension" ? 250 : Math.max(
            window.innerWidth < 800 ? parseInt(window.innerWidth * 0.4, 10) : parseInt(window.innerWidth * 0.25, 10),
            150
        );
        this.setState({
            drawerWidth
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.props.clientType === "extension" && this.handleResize();
        this.targetElement = document.querySelector('#drawer-metada');
        enableBodyScroll(this.targetElement);
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
        const { classes, clientType, data, infoBox, currentLanguage,
            isRehydrated, show, toggleDrawer, match, translate, dataIsAvailable } = this.props;

        return (
            <div className={classes.root} id="drawer-metada">
                <div style={{ maxHeight: '100vh', height: '100vh' }}>
                    <Drawer
                        variant="persistent"
                        classes={{
                            paper: classes.drawerPaper,
                            docked: classes.docked
                        }}
                        open={isRehydrated && show.drawer}
                        anchor="left"
                        style={{
                            width: this.state.drawerWidth
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={toggleDrawer}>
                                <ClearIcon />
                            </IconButton>
                        </div>
                        <div className={classNames(classes.container, 'joyride-drawer')}>
                            {dataIsAvailable && isRehydrated && <Info
                                clientType={clientType}
                                data={data}
                                infoBox={infoBox}
                                match={match}
                                translate={translate}
                                currentLanguage={currentLanguage}
                            />}
                        </div>
                    </Drawer>
                </div>
            </div>

        );
    }
}


InfoDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isRehydrated: PropTypes.bool.isRequired,
    infoBox: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    reRenderGraph: PropTypes.func.isRequired,
    show: PropTypes.object.isRequired,
    startHelp: PropTypes.func.isRequired,
    stopHelp: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(InfoDrawer);