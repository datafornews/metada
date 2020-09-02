import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


const styles = theme => ({
    container: {
        [theme.breakpoints.only('xs')]: {
            // xs -> seach bar goes down
            paddingTop: theme.spacing(3)
        },
        [theme.breakpoints.up('md')]: {
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(4)
        },
        [theme.breakpoints.up('lg')]: {
            paddingBottom: theme.spacing(4),
            paddingTop: theme.spacing(6)
        },
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2)
    },
    subtitle: {
        [theme.breakpoints.down(400)]: {
            fontSize: 22
        },
        fontWeight: "bolder"
    },
    title: {
        [theme.breakpoints.down(400)]: {
            fontSize: 26
        },
        fontWeight: "bolder"
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
        const { classes, translate } = this.props;
        return (
            <div className={classes.container}>
                <Typography color='primary' variant="h3" gutterBottom className={classes.title}>
                    {translate('home.title')}
                </Typography>
                <Typography variant="h5" gutterBottom className={classes.subtitle}>
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