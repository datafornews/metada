import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import classNames from 'classnames';

import GraphButton from '../../../Graph/InfoBox/GraphButton';

import WikiButton from '../../../Graph/InfoBox/WikiButton';
import WebsiteButton from '../../../Graph/InfoBox/WebsiteButton';

const colors = {
    m: '#3f51b5',
    c: 'rgb(187, 45, 45)',
    i: 'rgb(1, 41, 71)'
}

const styles = theme => ({
    card: {
        maxWidth: 275,
        minHeight: 240,
        display: "flex",
        flexFlow: "column",
        height: "100%",
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    title: {
        fontSize: 22,
    },
    subtitle: {
        marginBottom: 8,
        fontSize: 12,
    },
    pos: {
        marginTop: 12,
        fontWeight: 200
    },
    actions: {
        paddingTop: 0,
        position: "absolute",
        left: "50%",
        bottom: "20px",
        transform: "translate(-50%, 30%)",
        margin: "0 auto",
    },
    actionsContainer: {
        position: "relative",
        flex: '1 1 auto',
    },
    chip: {
        position: "absolute",
        color: "white",
        top: -16,
        right: 0
    },
    m: {
        backgroundColor: colors['m']
    },
    c: {
        backgroundColor: colors['c']
    },
    i: {
        backgroundColor: colors['i']
    },
    container: {
        position: "relative"
    }
});

class HomeCard extends Component {

    handleClick = () => {
        this.props.handleChipClick(this.props.entity)
    }

    render() {

        const { classes, entity } = this.props;

        return (
            <div className={classes.container}>
                <Chip
                    // avatar={<Avatar>{avatarName}</Avatar>}
                    label={this.props.translate(`home.cards.category.${entity.category}`)}
                    className={classNames(classes.chip, classes[entity.category])}
                />
                <Card className={classes.card} elevation={12}>
                    <CardContent>
                        <Typography className={classes.title}>
                            {entity.name}
                        </Typography>
                        <Divider />
                        <Typography className={classes.subtitle} variant="subheading" component="h4" color="textSecondary">
                            {entity.long_name || ""}
                        </Typography>
                        <Typography className={classes.pos} >
                            {entity.other_groups && "Autre groupes" || ""}
                        </Typography>
                        <Typography className={classes.subtitle} variant="subheading" color="textSecondary">
                            {entity.other_groups || ""}
                        </Typography>
                        <Typography className={classes.pos} >
                            {(entity.website || entity.wiki_link) && "Liens externes" || ""}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <WikiButton {...this.props} />
                            <WebsiteButton {...this.props} />
                        </Typography>
                    </CardContent>
                    
                    <div className={classes.actionsContainer}>
                        <CardActions className={classes.actions}>
                            <GraphButton
                                // name={entity.name} 
                                handleClick={this.handleClick}
                                show={{ graphButtonBlink: false }}
                                translate={this.props.translate}
                            />
                        </CardActions>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(HomeCard);
