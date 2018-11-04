import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import mapStateToProps from '../store/defaultMapStateToProps';
import mapDispatchToProps from '../store/defaultMapDispatchToProps';

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

    componentWillMount() {
        if (this.props.clientType === 'extension') {
            document && document.getElementsByTagName('html')[0].style.height = '600px';
            console.log('this.props.history.location :', this.props.history.location);
            if (this.props.history.location.pathname.indexOf('index.html') !== -1) {
                this.props.history.push('/');
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                404
            </div>
        )
    }
}

DefaultRoute = connect(mapStateToProps, mapDispatchToProps)(DefaultRoute);

export default withStyles(styles)(DefaultRoute);