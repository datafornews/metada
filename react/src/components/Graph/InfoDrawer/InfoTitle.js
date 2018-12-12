import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StatTitle from './StatTitle';
import PropTypes from 'prop-types';
import getImage from '../../../utils/getWikiImage';


const styles = theme => ({
    img: {
        borderRadius: theme.spacing.unit / 2,
        maxHeight: "100%",
        maxWidth: "-webkit-fill-available"
    },
    imgDiv: {
        alignItems: "center",
        display: "flex",
        height: "100px",
        justifyContent: "center",
        margin: 'auto',
        maxWidth: "90%",
        width: "200px"
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

    state = {
        image: null
    }

    componentWillMount() {
        const { infoBox, match, data } = this.props;
        const entityId = !infoBox.share ? parseInt(infoBox.entity, 10) : parseInt(match.params.entityId, 10);
        const entity = data.entities.ids[entityId];
        getImage(this, entity)
    }

    componentWillReceiveProps(nextProps) {
        const entityId = !this.props.infoBox.share ? parseInt(this.props.infoBox.entity, 10) : parseInt(this.props.match.params.entityId, 10);
        const nextEntityId = !nextProps.infoBox.share ? parseInt(nextProps.infoBox.entity, 10) : parseInt(nextProps.match.params.entityId, 10);
        if (entityId !== nextEntityId) {
            this.setState({
                image: null
            });
            getImage(this, nextProps.data.entities.ids[nextEntityId])
        }
    }

    render() {
        const { classes, infoBox, match, data, translate, clientType } = this.props;
        let entityId = !infoBox.share ? parseInt(infoBox.entity, 10) : parseInt(match.params.entityId, 10);
        if (!entityId || isNaN(entityId)) {
            entityId = parseInt(match.params.entityId, 10)
        }
        const entity = data.entities.ids[entityId];

        return (
            <div className={classes.container}>
                <Grid container alignItems='center'>

                    <Grid item xs={12} md={this.state.image ? 6 : 12} >

                        <Typography type="headline" style={entityNameTypoStyle}>
                            {entity.name}
                        </Typography>
                        <Typography type="body2" className={classes.title} style={entityLongNameTypoStyle}>
                            {entity.long_name}
                        </Typography>
                        {clientType === "extension" && (
                            <div>
                                <StatTitle entity={entity} translate={translate} />
                            </div>
                        )}

                    </Grid>

                    <Grid item xs={12} md={6}>

                        {this.state.image && (
                            <div className={classes.imgDiv}>
                                <img src={this.state.image} alt={`${entity.name}-logo`} className={classes.img} />
                            </div>
                        )}

                    </Grid>
                </Grid>

            </div >
        )
    }
}

InfoTitle.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    infoBox: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
}

export default withStyles(styles)(InfoTitle);