import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {

    }
});

class ShareSources extends Component {
    render() {
        const { classes, share } = this.props;
        return (
            <div className={classes.container}>
                {share.sources.map((v, k) => {
                    const loc = document.createElement('a');
                    loc.href = v;
                    console.log({loc});
                    return <div key={k}>
                        <a href={v}>{loc.hostname.split('.').slice(1).join('.') + '/...'}</a>
                    </div>
                })}
            </div>
        )
    }
}

ShareSources.propTypes = {
    classes: PropTypes.object.isRequired,
    share: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShareSources);