import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
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
    expandIcon: {
        right: "-8px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(13),
        fontWeight: theme.typography.fontWeightRegular
    },
    noPadding: {
        padding: "0px"
    },
    root: {
        width: '100%'
    },
    wiki: {
        fontSize: theme.typography.pxToRem(11),
        fontStyle: "italic"
    }
})

class WikiExtract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extract: <Waiting clientType={this.props.clientType} translate={this.props.translate} toTranslate='graph.wiki.loading' />
        }
    }


    componentDidMount() {
        const entity = this.props.data.entities.ids[this.props.infoBox.entity];

        entity && getWikiData(this, entity);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.infoBox.entity === this.props.infoBox.entity) {
            return
        }
        this.setState({
            extract: <Waiting clientType={this.props.clientType} translate={this.props.translate} toTranslate='graph.wiki.loading' />,
        });
        const entity = this.props.data.entities.ids[nextProps.infoBox.entity];

        entity && getWikiData(this, entity);
    }

    render() {

        const { classes, maxLength, translate } = this.props;

        let div, dots;
        if (typeof this.state.extract === 'string' || this.state.extract instanceof String) {
            let summary = this.state.extract.split(' ');
            if (summary.length > maxLength) {
                summary = summary.slice(0, maxLength).join(" ") + " ...";
                dots = "..."
            } else {
                summary = summary.slice(0, maxLength).join(" ");
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

                                {dots + this.state.extract.split(' ').slice(maxLength).join(" ")}
                                <br /><br />
                                <Typography color="textSecondary" className={classes.wiki}>
                                    {translate("graph.wiki.isExtract")}
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
                            {translate("graph.wiki.isExtract")}
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



WikiExtract.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    infoBox: PropTypes.object.isRequired,
    maxLength: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    
};

export default withStyles(styles)(WikiExtract);