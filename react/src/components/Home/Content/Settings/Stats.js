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
        return -1;
    if (a.total > b.total)
        return -1;
    return 0;
}

function sum(arr, prop, max) {
    if (max <= 0 || max >= arr.length) {
        max = arr.length
    }
    var total = 0
    for (var i = 0; i < max; i++) {
        total += arr[i][prop]
    }
    return total
}


class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: []
        }
    }


    componentWillMount() {

        if (localStorage.stats) {
            const stats = JSON.parse(localStorage.stats);
            if (stats) {
                let tableStats = [];
                var fullTotal = 0;
                var weekTotal = 0;
                var monthTotal = 0;
                Object.keys(stats).map((v, k) => {
                    console.log(v)
                    const s = {
                        name: v,
                        total: stats[v].total,
                        month: sum(stats[v].month, "count", -1),
                        week: sum(stats[v].month, "count", 7)
                    }
                    tableStats.push(s)
                    fullTotal += stats[v].total;
                    monthTotal += s.month;
                    weekTotal += s.week
                    return null;
                });
                tableStats.map((v, k) => {
                    v['proportion'] = Math.round(v.total / fullTotal * 100);
                    return null;
                });
                tableStats.sort(compare);
                tableStats.push({
                    name: 'Total',
                    total: fullTotal,
                    month: monthTotal,
                    week: weekTotal
                })
                this.setState({
                    stats: tableStats
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
                        <TableCell className={classes.cell} numeric>Total Page Views</TableCell>
                        <TableCell className={classes.cell} numeric>Last Month</TableCell>
                        <TableCell className={classes.cell} numeric>Last Week</TableCell>
                        <TableCell className={classes.cell} numeric>Total Proportion (%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.stats.map((n, k) => {
                        return (
                            <TableRow key={k}>
                                <TableCell className={classes.cell}>{n.name}</TableCell>
                                <TableCell className={classes.cell} numeric>{n.total}</TableCell>
                                <TableCell className={classes.cell} numeric>{n.month}</TableCell>
                                <TableCell className={classes.cell} numeric>{n.week}</TableCell>
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