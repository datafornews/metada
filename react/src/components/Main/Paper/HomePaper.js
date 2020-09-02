import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        [theme.breakpoints.up('lg')]: {
            maxWidth: '900px',
            padding: theme.spacing(8)
        },
        [theme.breakpoints.only('xs')]: {
            maxWidth: '85%' // padding: theme.spacing(8),

        },
        margin: "auto",
        marginBottom: '30px',
        marginTop: theme.spacing(4),
        maxWidth: '75%'
    },
    typography: {
        [theme.breakpoints.only('md')]: {
            padding: theme.spacing(8)
        },
        [theme.breakpoints.up('lg')]: {
            paddingBottom: theme.spacing(8),
            paddingLeft: theme.spacing(12),
            paddingRight: theme.spacing(12),
            paddingTop: theme.spacing(8)
        },
        padding: theme.spacing(4)
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