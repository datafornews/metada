import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';


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

class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            sort: 3,
            asc: false
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

    handleHeadClick = (id) => (event) => {
        let data = [...this.state.stats];
        let asc = false;
        if (this.state.sort === id) {
            asc = !this.state.asc
        }
        switch (id) {
            case 0:
                data.sort((a, b) => {
                    return compare(a, b, 'name', asc)
                });
                break;

            case 1:
                data.sort((a, b) => {
                    return compare(a, b, 'week', asc)
                });
                break;

            case 2:
                data.sort((a, b) => {
                    return compare(a, b, 'month', asc)
                });
                break;

            case 3:
                data.sort((a, b) => {
                    return compare(a, b, 'total', asc)
                });
                break;

            default:
                break;
        }

        this.setState({
            stats: data,
            sort: id,
            asc
        });
    }


    render() {
        const { classes } = this.props;

        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell}>
                            <TableSortLabel
                                active={this.state.sort === 0}
                                direction={this.state.asc ? 'asc' : 'desc'}
                                onClick={this.handleHeadClick(0)}
                            >
                                {this.props.translate('home.stats.entity')}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell className={classes.cell}>
                            <TableSortLabel
                                active={this.state.sort === 1}
                                direction={this.state.asc ? 'asc' : 'desc'}
                                onClick={this.handleHeadClick(1)}
                            >
                                {this.props.translate('home.stats.week')}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell className={classes.cell}>
                            <TableSortLabel
                                active={this.state.sort === 2}
                                direction={this.state.asc ? 'asc' : 'desc'}
                                onClick={this.handleHeadClick(2)}
                            >
                                {this.props.translate('home.stats.month')}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell className={classes.cell}>
                            <TableSortLabel
                                active={this.state.sort === 3}
                                direction={this.state.asc ? 'asc' : 'desc'}
                                onClick={this.handleHeadClick(3)}
                            >
                                {this.props.translate('home.stats.total')}
                            </TableSortLabel>
                        </TableCell>
                        {/* <TableCell onClick={this.handleHeadClick(1)} className={classes.cell} numeric>{this.state.sort == 1 ? this.state.asc ? asc : desc : empty}{this.props.translate('home.stats.week')}</TableCell>
                        <TableCell onClick={this.handleHeadClick(2)} className={classes.cell} numeric>{this.state.sort == 2 ? this.state.asc ? asc : desc : empty}{this.props.translate('home.stats.month')}</TableCell>
                        <TableCell onClick={this.handleHeadClick(3)} className={classes.cell} numeric>{this.state.sort == 3 ? this.state.asc ? asc : desc : empty}{this.props.translate('home.stats.total')}</TableCell> */}
                        <TableCell className={classes.cell} numeric>{this.props.translate('home.stats.proportion')}</TableCell>
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
                                <TableCell className={classes.cell} numeric>{`${n.proportion} %`}</TableCell>
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