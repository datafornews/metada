import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StatTitle from './StatTitle';
import PropTypes from 'prop-types';


const styles = theme => ({
    container: {

    }
});

const entityNameTypoStyle = {
    display: 'inline-block',
    marginRight: '10px',
    fontSize: 26
};

const entityLongNameTypoStyle = {
    display: 'inline-block',
};

class InfoTitle extends Component {
    render() {
        const { classes, infoBox, match, data, translate } = this.props;

        const entityId = infoBox.type ? infoBox.data : parseInt(match.params.entityId, 10);
        const entity = data.entities.ids[entityId];
        return (
            <div className={classes.container}>
                <Typography type="headline" style={entityNameTypoStyle}>
                    {entity.name}
                </Typography>
                <Typography type="body2" className={classes.title} style={entityLongNameTypoStyle}>
                    {entity.long_name}
                </Typography>
                <br />
                <StatTitle entity={entity} translate={translate} ></StatTitle>
            </div>
        )
    }
}

InfoTitle.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    infoBox: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
}

export default withStyles(styles)(InfoTitle);