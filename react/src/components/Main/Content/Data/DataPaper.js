import React, { Component } from 'react';
import HomePaper from '../../Paper/HomePaper'
// import StatsTable from './StatsTable';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReactResizeDetector from 'react-resize-detector';
import CultureTable from './CultureTable'


const styles = theme => ({
    heading: {
        color: theme.palette.secondary.main,
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular
    },
    root: {
        width: '100%'
    },
    summary: {
        margin: '8px 0px 0px 0px!important',
        minHeight: '0 !important'
    }
});

class DataPaper extends Component {

    state = {
        entityData: [],
        ownerData: []
    }


    componentWillMount() {

    }


    render() {
        return (
            <HomePaper
                {...this.props}
                noPadding={true}
                toggle={this.props.toggleStats}
                content={<WrappedDataPapers
                    translate={this.props.translate}
                    ownerData={this.state.ownerData}
                    entityData={this.state.entityData}
                    data={this.props.data}
                    history={this.props.history}
                />
                } />
        );
    }
}

export default DataPaper;



class WrappedDataPapers extends Component {

    state = {
        pannel: -1,
    }

    showPannel = id => () => {
        this.setState({
            pannel: id === this.state.pannel ? -1 : id
        })
    }

    resize = (w, h) => {
        console.log({ w, h });
        this.update(w);
    }

    update = width => {
        this.setState({
            height: parseInt(width * 2, 10),
            width: parseInt(width * 1, 10),
        })
    }

    componentDidMount() {
        this.update(this.divElement.clientWidth)
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}
                ref={(divElement) => { this.divElement = divElement }}
            >
                <ReactResizeDetector refreshMode='debounce' refreshRate={500} skipOnMount handleWidth handleHeight onResize={this.resize} />

                <Typography variant="h1" color="primary">
                    {this.props.translate('home.data.dataTitle')}
                </Typography>
                <ExpansionPanel
                    className={classes.expansionPannel}
                    expanded={this.state.pannel === 0}
                    onChange={this.showPannel(0)}
                    elevation={0}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={
                        {
                            content: classes.summary,
                            expanded: classes.summary,
                            root: classes.summary
                        }
                    }>
                        <Typography className={classes.heading}>
                            {this.props.translate('home.data.pressPublications')}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ justifyContent: "center", padding: 0 }}>
                        <iframe
                            src="https://data.culture.gouv.fr/explore/embed/dataset/liste-des-publications-de-presse/table/?&static=false&datasetcard=false"
                            width={this.state.width + ""}
                            height={this.state.width + ""}
                            frameBorder="0"
                            title="press publications french ministry for the culture"
                            >
                        </iframe>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel
                    expanded={this.state.pannel === 1}
                    onChange={this.showPannel(1)}
                    elevation={0}
                    className={classes.expansionPannel}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={
                        {
                            content: classes.summary,
                            expanded: classes.summary,
                            root: classes.summary
                        }
                    }>
                        <Typography className={classes.heading}>
                            {/* {this.props.translate('home.stats.ownersTitle')} */}
                            Culture Table
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ justifyContent: "center", padding: 0 }}>
                        <CultureTable />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div >
        );
    }
}


WrappedDataPapers.propTypes = {
    classes: PropTypes.object.isRequired,
};

WrappedDataPapers = withStyles(styles)(WrappedDataPapers);