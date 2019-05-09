import React, { Component } from 'react';
import HomePaper from '../../Paper/HomePaper'
import StatsTable from './StatsTable';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
    expansionPannel: {
        '&:before': {}
    },
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


function compare(a, b, attr, asc) {
    if (a[attr] < b[attr])
        return asc ? -1 : 1;
    if (a[attr] > b[attr])
        return asc ? 1 : -1;
    return 0;
}

function getTableArray(stats) {
    let table = {};
    let total = 0;
    for (const entityName of Object.keys(stats.counts.total)) {
        let n = {
            name: entityName,
            total: stats.counts.total[entityName],
            month: 0,
            week: 0,
            proportion: 0
        };
        total += n.total;

        if (stats.counts.month[entityName]) {
            n.month = stats.counts.month[entityName];
            if (stats.counts.week[entityName]) {
                n.week = stats.counts.week[entityName];
            }
        }
        table[entityName] = n;
    }
    let tableArray = [];
    for (const entityName of Object.keys(table)) {
        table[entityName].proportion = Math.round(table[entityName].total / total * 1000) / 10;
        tableArray.push(table[entityName]);
    }

    tableArray.sort((a, b) => {
        return compare(a, b, 'total', false);

    });

    return tableArray;
}

function getOwnerStats(data, stats) {
    const ownerObject = {};
    let total = 0;
    for (const stat of stats) {
        const entity = data.entities.names[stat.name];
        if (entity) {
            const owners = getOwners(data, entity);
            for (const owner of owners) {
                if (Object.keys(ownerObject).indexOf(owner.name) < 0) {
                    ownerObject[owner.name] = {
                        name: owner.name,
                        total: stat.total,
                        month: stat.month,
                        week: stat.week,
                        proportion: 0
                    }
                } else {
                    ownerObject[owner.name]["total"] += stat.total;
                    ownerObject[owner.name]["month"] += stat.month;
                    ownerObject[owner.name]["week"] += stat.week;
                }
                total += stat.total;
            }
        }
    }
    let tableArray = [];
    for (const entityName of Object.keys(ownerObject)) {
        ownerObject[entityName].proportion = Math.round(ownerObject[entityName].total / total * 1000) / 10;
        tableArray.push(ownerObject[entityName]);
    }
    tableArray.sort((a, b) => {
        return compare(a, b, 'total', false);
    });

    return tableArray;
}

function getParents(data, entity, res) {
    var parentShares = data.shares.children[entity.id];
    if (!parentShares) {
        return []
    }

    res.push(parentShares);
    for (var s of parentShares) {
        getParents(data, data.entities.ids[s.parent_id], res)
    }
    return res
}

function getOwners(data, entity) {
    const parents = getParents(data, entity, []);
    let owners = [];
    for (const parentShares of parents) {
        for (const parentShare of parentShares) {
            if (!data.shares.children[parentShare.parent_id]) {
                owners.push(data.entities.ids[parentShare.parent_id]);
            }
        }
    }
    return owners
}

class StatsPaper extends Component {

    state = {
        entityData: [],
        ownerData: []
    }


    componentWillMount() {

        if (localStorage.stats) {
            const stats = JSON.parse(localStorage.stats);
            if (stats) {
                if (!stats.counts) { // legacy stats don't have a count attribute
                    localStorage.removeItem('stats');
                } else {
                    const entityData = getTableArray(stats);
                    const ownerData = getOwnerStats(this.props.data, entityData);
                    this.setState({
                        entityData,
                        ownerData
                    });
                }
            }
        }
    }


    render() {
        return (
            <HomePaper
                {...this.props}
                noPadding={true}
                toggle={this.props.toggleStats}
                content={<WrappedStatsPaper
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

export default StatsPaper;



class WrappedStatsPaper extends Component {

    state = {
        entitiesExpanded: false,
        ownersExpanded: false
    }

    toggleEntities = () => {
        this.setState({
            entitiesExpanded: !this.state.entitiesExpanded
        })
    }
    toggleOwners = () => {
        this.setState({
            ownersExpanded: !this.state.ownersExpanded
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="display1" color="primary">
                    {this.props.translate('home.stats.statsTitle')}
                </Typography>
                <ExpansionPanel
                    className={classes.expansionPannel}
                    expanded={this.state.entitiesExpanded}
                    onChange={this.toggleEntities}
                    elevation={0}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={
                        {
                            content: classes.summary,
                            expanded: classes.summary,
                            root: classes.summary
                        }
                    }>
                        <Typography className={classes.heading}>{this.props.translate('home.stats.entitesTitle')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ justifyContent: "center", padding: 0 }}>
                        <StatsTable
                            data={this.props.data}
                            history={this.props.history}
                            tableData={this.props.entityData}
                            translate={this.props.translate}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel
                    expanded={this.state.ownersExpanded}
                    onChange={this.toggleOwners}
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
                        <Typography className={classes.heading}>{this.props.translate('home.stats.ownersTitle')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ justifyContent: "center", padding: 0 }}>
                        <StatsTable
                            data={this.props.data}
                            history={this.props.history}
                            tableData={this.props.ownerData}
                            translate={this.props.translate}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div >
        );
    }
}


StatsPaper.propTypes = {
    classes: PropTypes.object.isRequired,
};

WrappedStatsPaper = withStyles(styles)(StatsPaper);