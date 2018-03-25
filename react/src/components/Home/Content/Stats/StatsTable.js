import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 100,
    },
    cell: {
        padding: "4px"
    }
});

function compare(a, b) {
    if (a.total < b.total)
        return 1;
    if (a.total > b.total)
        return -1;
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
        table[entityName].proportion = Math.round(table[entityName].total / total * 100);
        tableArray.push(table[entityName]);
    }

    console.log(tableArray);
    tableArray.sort(compare);
    console.log(tableArray);

    return tableArray;
}

class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: []
        };
    }


    componentWillMount() {

        if (localStorage.stats) {
            const stats = JSON.parse(localStorage.stats);
            if (stats) {
                this.setState({
                    stats: getTableArray(stats)
                });
            }
        }
    }


    render() {
        const { classes } = this.props;

        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell}>Entity</TableCell>
                        <TableCell className={classes.cell} numeric>Last Week</TableCell>
                        <TableCell className={classes.cell} numeric>Last Month</TableCell>
                        <TableCell className={classes.cell} numeric>Total Page Views</TableCell>
                        <TableCell className={classes.cell} numeric>Total Proportion (%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.stats.map((n, k) => {
                        return (
                            <TableRow key={k}>
                                <TableCell className={classes.cell}>{n.name}</TableCell>
                                <TableCell className={classes.cell} numeric>{n.week}</TableCell>
                                <TableCell className={classes.cell} numeric>{n.month}</TableCell>
                                <TableCell className={classes.cell} numeric>{n.total}</TableCell>
                                <TableCell className={classes.cell} numeric>{n.proportion}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}


BasicTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);