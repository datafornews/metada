import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import is from 'is_js';

const actionsStyles = theme => ({
    root: {
        color: theme.palette.text.secondary,
        flexShrink: 0,
        marginLeft: theme.spacing(2.5)
    }
});

class TablePaginationActions extends Component {

    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {

        const { classes, count, page, rowsPerPage, theme } = this.props;


        return <div className={classes.root}>
            <IconButton
                onClick={this.handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={this.handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={this.handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={this.handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);




const styles = theme => ({
    cell: {
        padding: "4px"
    },
    root: {
        color: theme.palette.text.secondary,
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        width: '100%'
    },
    table: {
        minWidth: theme.spacing(12)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: 0,
        width: theme.spacing(25)
    }
});


function compare(a, b, attr, asc) {
    if (a[attr] < b[attr])
        return asc ? -1 : 1;
    if (a[attr] > b[attr])
        return asc ? 1 : -1;
    return 0;
}

class BasicTable extends React.Component {
    state = {
        stats: [], // displayed stats
        data: [], // full stats
        sort: 1,
        asc: false,
        page: 0,
        rowsPerPage: 5,
        search: ""
    }


    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleFirstPageButtonClick = event => {
        this.handleChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.handleChangePage(event, this.state.page - 1);
    };

    handleNextButtonClick = event => {
        this.handleChangePage(event, this.state.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.handleChangePage(
            event,
            Math.max(0, Math.ceil(this.state.stats.length / this.state.rowsPerPage) - 1),
        );
    };

    handleTextChange = name => event => {
        if (!event.target.value) {
            this.setState({
                stats: this.state.data
            })
        } else {
            this.setState({
                stats: this.state.stats.filter((stat) => {
                    return stat.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
                })
            })
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    goTo = (name) => () => {
        const entity = this.props.data.entities.names[name];
        if (entity) {
            this.props.history.push(`/graph/${entity.id}`)
        }
    }

    componentWillMount() {
        this.setState({
            stats: this.props.tableData,
            data: this.props.tableData
        });
    }

    componentDidMount() {
        this.handleHeadClick(1, false)();
        // this.handleHeadClick(1)();
    }


    handleHeadClick = (id, _asc = null) => (event) => {

        let data = [...this.state.stats];
        let asc = false;

        if (!is.null(_asc)) {
            asc = _asc;
        } else if (this.state.sort === id) {
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

        const { rowsPerPage, page } = this.state;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.stats.length - page * rowsPerPage);

        return (
            <div style={{ width: '95%' }}>
                <div className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="search"
                        label="Search"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleTextChange('search')}
                        margin="normal"
                    />
                </div>
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

                            <TableCell className={classes.cell} numeric>{this.props.translate('home.stats.proportion')}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.stats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, k) => {
                            return (
                                <TableRow key={k}>
                                    <TableCell className={classes.cell}>
                                        <span style={{ cursor: 'pointer' }} onClick={this.goTo(n.name)}>
                                            {n.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className={classes.cell} numeric>{n.week}</TableCell>
                                    <TableCell className={classes.cell} numeric>{n.month}</TableCell>
                                    <TableCell className={classes.cell} numeric>{n.total}</TableCell>
                                    <TableCell className={classes.cell} numeric>{`${n.proportion} %`}</TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={3}
                                count={this.state.stats.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                                labelRowsPerPage={this.props.translate('home.stats.labelRowsPerPage')}
                                rowsPerPageOptions={[5, 10, 20]}
                                labelDisplayedRows={({ from, to, count }) => { return `${from}-${to} ${this.props.translate('home.stats.labelDisplayedRows')} ${count}` }}
                            />
                        </TableRow>
                    </TableFooter>

                </Table>
            </div>
        );
    }
}




BasicTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BasicTable);