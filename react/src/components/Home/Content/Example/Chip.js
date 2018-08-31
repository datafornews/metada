import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import classNames from 'classnames';

import GraphButton from '../../../Graph/InfoBox/GraphButton';

import WikiButton from '../../../Graph/InfoBox/WikiButton';
import WebsiteButton from '../../../Graph/InfoBox/WebsiteButton';

import getImage from '../../../../utils/getWikiImage';

import IIcon from '@material-ui/icons/PermIdentity';
import CIcon from '@material-ui/icons/AccountBalance';
import MIcon from 'react-icons/lib/ti/news'


import { colors } from '../../../../theme/metadaTheme';

const styles = theme => ({
    card: {
        maxWidth: 275,
        minHeight: 240,
        display: "flex",
        flexFlow: "column",
        height: "100%",
        backgroundColor: '#eae9e9b8',
        "&:hover": {
            backgroundColor: 'white',
        }
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 400
    },
    subtitle: {
        marginBottom: 8,
        fontSize: 12,
    },
    pos: {
        marginTop: 12,
        fontWeight: 200
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
    },
    img: {
        maxWidth: "-webkit-fill-available",
        maxHeight: "100%",
        borderRadius: 4,
    },
    imgDiv: {
        display: "flex",
        margin: 'auto',
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        height: "100px",
        maxWidth: "90%",
    }
});

class HomeCard extends Component {

    state = {
        image: null
    }

    componentWillMount() {
        getImage(this, this.props.entity)
    }

    handleClick = () => {
        this.props.handleChipClick(this.props.entity)
    }

    getDefault = () => {
        if (this.props.entity.category === "i") {
            return <IIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 200, height: 100, opacity: 0.2 }} />
        } else if (this.props.entity.category === "c") {
            return <CIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 200, height: 100, opacity: 0.2 }} />
        } else {
            return <MIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 200, height: 100, opacity: 0.2 }} />
        }
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
                <Card className={classes.card} elevation={4}>
                    <CardContent>

                        <Typography className={classes.title}>
                            {entity.name}
                        </Typography>
                        {this.state.image ? <div className={classes.imgDiv}> <img src={this.state.image} alt={`${entity.name}-logo`} className={classes.img} /> </div> : this.getDefault()}

                        <Typography className={classes.subtitle} variant="subheading" component="h4" color="textSecondary">
                            {entity.long_name || <div style={{height:19}}></div>}
                        </Typography>
                        {/* <Typography className={classes.pos} >
                            {entity.other_groups && "Autre groupes" || ""}
                        </Typography>
                        <Typography className={classes.subtitle} variant="subheading" color="textSecondary">
                            {entity.other_groups || ""}
                        </Typography> */}
                        <GraphButton
                            // name={entity.name} 
                            handleClick={this.handleClick}
                            show={{ graphButtonBlink: false }}
                            translate={this.props.translate}
                        />
                        <Typography className={classes.pos} >
                            {((entity.website || entity.wiki_link) && "Liens externes") || ""}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <WikiButton {...this.props} />
                            <WebsiteButton {...this.props} />
                        </Typography>
                        {(!entity.website && !entity.wiki_link) && <div style={{height:52}}></div>} 
                    </CardContent>
                </Card>
            </div>
            
        )
    }
}

export default withStyles(styles)(HomeCard);
