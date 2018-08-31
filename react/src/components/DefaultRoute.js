import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bolder',
        position: 'absolute',
        top: '45%',
        width: '100%'
    }
});

class DefaultRoute extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                404
            </div>
        )
    }
}

export default withStyles(styles)(DefaultRoute);