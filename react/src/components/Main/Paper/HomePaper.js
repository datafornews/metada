import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        margin: "auto",
        marginTop: theme.spacing.unit * 4,
        marginBottom: '30px',
        maxWidth: '75%',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '900px',
            padding: theme.spacing.unit * 8,
        },
        [theme.breakpoints.only('xs')]: {
            maxWidth: '85%',
            // padding: theme.spacing.unit * 8,
        },
    },
    typography: {
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.only('md')]: {
            padding: theme.spacing.unit * 8,
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.spacing.unit * 8,
            paddingBottom: theme.spacing.unit * 8,
            paddingLeft: theme.spacing.unit * 12,
            paddingRight: theme.spacing.unit * 12,
        },
    }
});


class HomePaper extends Component {

    render() {

        const { classes } = this.props;

        return (
            <Paper classes={{ root: classes.root }} elevation={1}>
                <Typography type="body1" className={classes.typography} component="div" >
                    {this.props.content}
                </Typography>
            </Paper>
        );

    }
}



HomePaper.propTypes = {
    classes: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePaper);