import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import classNames from 'classnames';

import { MediaIcon, IndividualIcon, CompanyIcon } from "../../../../theme/metadaTheme";

import WikiButton from '../../../Graph/InfoDrawer/WikiButton';
import WebsiteButton from '../../../Graph/InfoDrawer/WebsiteButton';

import getImage from '../../../../utils/getWikiImage';

import IIcon from '@material-ui/icons/PermIdentity';
import CIcon from '@material-ui/icons/AccountBalance';
import MIcon from 'react-icons/lib/ti/news'


import { colors } from '../../../../theme/metadaTheme';

const styles = theme => ({
    card: {
        maxWidth: 200,
        // minHeight: 240,
        display: "flex",
        flexFlow: "column",
        height: "100%",
        backgroundColor: 'rgb(245,245,243)',
        "&:hover": {
            backgroundColor: 'white',
        },
        position: 'relative'
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
        right: 0,
        '&:hover': {
            cursor: 'pointer'
        },
        height: '25px'
    },
    m: {
        backgroundColor: colors['m'],
        '&:hover': {
            filter: "brightness(80%)",
            backgroundColor: colors['m']
        }
    },
    c: {
        backgroundColor: colors['c'],
        '&:hover': {
            filter: "brightness(80%)",
            backgroundColor: colors['c']
        }
    },
    i: {
        backgroundColor: colors['i'],
        '&:hover': {
            filter: "brightness(80%)",
            backgroundColor: colors['i'],
        }
    },
    container: {
        display: "flex",
        justifyContent: "center"
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
    },
    root: {
        padding: '8px 0px 0px 0px !important'
    },
    pointer: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    cickDiv: {
        display: 'none',
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        '&:hover': {
            display: 'block',
            backgroundColor: 'rgba(50, 50, 50, 0.5)'
        }
    },
    chipLabel: {
        fontSize: '0.6rem'
    },
    tooltip: {
        // height: 30,
        // width: 50
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        fontSize: '0.8rem'
    }
});

class Chips extends Component {

    state = {
        image: null
    }

    componentWillMount() {
        getImage(this, this.props.entity)
    }

    handleClick = () => {
        this.props.handleChipClick(this.props.entity)
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.entity.id !== nextProps.entity.id) {
            this.setState({
                image: null
            });
            getImage(this, nextProps.entity)
        }
    }


    getPlaceholder = () => {
        if (this.props.entity.category === "i") {
            return <IIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 200, height: 100, opacity: 0.2 }} />
        } else if (this.props.entity.category === "c") {
            return <CIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 200, height: 100, opacity: 0.2 }} />
        } else {
            return <MIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 200, height: 100, opacity: 0.2 }} />
        }
    }

    getIcon = (category) => {
        if (category === "i") {
            return <IndividualIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 20, height: 20, color: 'white' }} />
        } else if (category === "c") {
            return <CompanyIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 20, height: 20, color: "white" }} />
        } else {
            return <MediaIcon style={{ maxWidth: '100%', maxHeight: '100%', width: 20, height: 20, color: "white" }} />
        }
    }

    goTo = (category) => () => {
        if (category === "c") {
            this.props.history.push('/s/3');
        } else if (category === "m") {
            this.props.history.push('/s/1');
        } else {
            this.props.history.push('/s/7');
        }
    }

    render() {

        const { classes, entity } = this.props;

        return (
            <div className={classes.container}>
                <Card className={classes.card} elevation={1} style={{ overflow: "visible" }}>
                    <Chip
                        // avatar={<Avatar>{avatarName}</Avatar>}
                        label={
                            <span className={classes.chipLabel}>
                                {this.getIcon(entity.category)}
                                {/* {this.props.translate(`home.cards.category.${entity.category}`)} */}
                            </span>
                        }
                        className={classNames(classes.chip, classes[entity.category])}
                        onClick={this.goTo(entity.category)}
                    />
                    <CardContent className={classes.root}>
                        <Tooltip placement='top' classes={{ tooltip: classes.tooltip }} title={this.props.translate('home.chipTooltip')}>
                            <div onClick={this.handleClick} className={classes.pointer}>
                                <Typography className={classes.title}>
                                    {entity.name}
                                </Typography>
                                {this.state.image ? <div className={classes.imgDiv}> <img src={this.state.image} alt={`${entity.name}-logo`} className={classes.img} /> </div> : this.getPlaceholder()}

                                <Typography className={classes.subtitle} variant="subheading" component="h4" color="textSecondary">
                                    {entity.long_name || <div style={{ height: this.props.clientType === "mobile" ? 0 : 19 }}></div>}
                                </Typography>
                            </div>
                        </Tooltip>

                        <Typography className={classes.pos} >
                            {((entity.website || entity.wiki_link) && "Liens externes") || ""}
                        </Typography>
                        <Typography variant="body1" component="p">
                            <WikiButton {...this.props} />
                            <WebsiteButton {...this.props} />
                        </Typography>
                        {(!entity.website && !entity.wiki_link) && <div style={{ height: 52 }}></div>}
                    </CardContent>
                </Card>
            </div>

        )
    }
}

export default withStyles(styles)(Chips);
