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
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        [theme.breakpoints.only('xs')]: { // xs -> seach bar goes down
            paddingTop: theme.spacing.unit * 3
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing.unit * 4,
            paddingBottom: theme.spacing.unit * 2
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.spacing.unit * 6,
            paddingBottom: theme.spacing.unit * 4
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
                <Typography variant={this.state.width > 800 ? "headline" : "title"} color="default" gutterBottom className={classes.subtitle}>
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