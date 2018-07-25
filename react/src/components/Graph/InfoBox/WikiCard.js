import React, { Component } from 'react';
import classNames from 'classnames'

import Waiting from '../../Waiting';
import getWikiData from '../../../utils/getWikiData';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(13),
        fontWeight: theme.typography.fontWeightRegular,
    },
    wiki: {
        fontSize: theme.typography.pxToRem(11),
        fontStyle: "italic"
    },
    noPadding: {
        padding: "0px"
    },
    expandIcon: {
        right: "-8px"
    }
})

class WikiCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extract: <Waiting translate={this.props.translate} toTranslate='graph.wiki.loading' />
        }
    }


    componentDidMount() {
        const entity = this.props.data.entities.ids[this.props.infoBox.data];
        getWikiData(this, entity);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.infoBox.data === this.props.infoBox.data) {
            return
        }
        this.setState({
            extract: <Waiting translate={this.props.translate} toTranslate='graph.wiki.loading' />,
        });
        const entity = this.props.data.entities.ids[nextProps.infoBox.data];

        getWikiData(this, entity);
    }

    render() {
        let extractStyle;
        if (this.props.clientType === 'browser') {
            extractStyle = {
                height: '180px',
                overflowY: 'scroll'
            }
        } else {
            extractStyle = {
                position: 'inherit'
            }
        }

        const { classes } = this.props;

        let div, dots;
        if (typeof this.state.extract === 'string' || this.state.extract instanceof String) {
            let summary = this.state.extract.split(' ');
            if (summary.length > this.props.maxLength) {
                summary = summary.slice(0, this.props.maxLength).join(" ") + " ...";
                dots = "..."
            } else {
                summary = summary.slice(0, this.props.maxLength).join(" ");
                dots = "";
            }

            div = dots ? (
                <div className={classes.root}>
                    <ExpansionPanel elevation={0}>

                        <ExpansionPanelSummary className={classNames(classes.noPadding)} classes={{ expandIcon: classes.expandIcon }} expandIcon={<ExpandMoreIcon />}>
                            <Typography color="textSecondary" className={classes.heading}>
                                {summary}
                            </Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails className={classes.noPadding} >
                            <Typography className={classes.heading} component="div" color="textSecondary">

                                {dots + this.state.extract.split(' ').slice(this.props.maxLength).join(" ")}
                                <br /><br />
                                <Typography color="textSecondary" className={classes.wiki}>
                                    {this.props.translate("graph.wiki.isExtract")}
                                </Typography>

                            </Typography>
                        </ExpansionPanelDetails>

                    </ExpansionPanel>
                </div>
            ) : <div className={classes.root}>

                    <Paper elevation={0} component="div">
                        <Typography color="textSecondary" className={classes.heading}>
                            {summary}
                        </Typography>
                        <br />
                        <Typography color="textSecondary" className={classes.wiki}>
                            {this.props.translate("graph.wiki.isExtract")}
                        </Typography>
                    </Paper>

                </div>;
        }

        return (typeof this.state.extract === 'string' || this.state.extract instanceof String) ?
            div
            :
            this.state.extract

    }
}

export default withStyles(styles)(WikiCard);