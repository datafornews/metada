import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {

    }
});

class ShareComment extends Component {
    render() {
        const { classes, share } = this.props;
        return (
            <div className={classes.container}>
                {share.comment}
            </div>
        )
    }
}

ShareComment.propTypes = {
    classes: PropTypes.object.isRequired,
    share: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShareComment);