import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


const styles = theme => ({
    title: {
        fontWeight: "bolder",
        [theme.breakpoints.down(400)]: {
            fontSize: 26
        }
    },
    subtitle: {
        fontWeight: "bolder",
        [theme.breakpoints.down(400)]: {
            fontSize: 22
        }
    },
    container: {
        paddingTop: 16,
        paddingBottom: 16,
        [theme.breakpoints.only('xs')]: { // xs -> seach bar goes down
            // backgroundColor: 'red',
            paddingTop: 24
        },
        [theme.breakpoints.up('md')]: {
            // backgroundColor: 'red',
            paddingTop: 32,
            paddingBottom: 16
        },
        [theme.breakpoints.up('lg')]: {
            // backgroundColor: 'red',
            paddingTop: 48,
            paddingBottom: 32
        },
    }
});

class Title extends Component {

    state = { width: 0, height: 0 };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const { classes, width, translate } = this.props;
        console.log('width :', width);
        return (
            <div className={classes.container}>
                <Typography color='primary' variant={this.state.width > 800 ? "display2" : "display1"} gutterBottom className={classes.title}>
                    {translate('home.title')}
                </Typography>
                <Typography variant={this.state.width > 800 ? "headline" : "title1"} color="default" gutterBottom className={classes.subtitle}>
                    {translate('home.subtitle')}
                </Typography>
            </div>
        )
    }
}

Title.propTypes = {
    width: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(Title));