import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

const styles = theme => ({
    container: {

    }
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class CultureTable extends Component {
    state = {
        page: 0,
        count: 100,
        data: [],
        columns: [],
        title: '',
        rowsPerPage: 10,
        q: ""
    };

    componentDidMount() {
        this.getData();
    }

    setRemoteData = (data) => {
        if (!data.records || !data.records.length) {
            this.setState({
                data: []
            });
            return
        }
        const fields = [...Object.keys(data.records[0].fields)].sort();
        const tableData = data.records.map((v, k) => {
            let d = [];
            for (const o of fields) {
                d.push(v.fields[o] || "");
            }
            return d
        })

        console.log({ tableData });

        this.setState({ data: tableData });
    };

    // get data
    getData = () => {
        this.xhrRequest().then(data => {
            this.setRemoteData(data);
            const title = capitalize(data.parameters.dataset[0].split('-').join(' '));
            const fields = [...Object.keys(data.records[0].fields)].sort();
            const columns = fields.map((v, k) => capitalize(v.split('_').join(' ')));
            this.setState({ title, columns });
        }
        )
    }

    // mock async function
    xhrRequest = () => {
        const { q, page } = this.state;
        return fetch(
            `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=aides-a-la-presse-classement-des-titres-de-presse-aides&q=${q}&start=${page * this.state.rowsPerPage}&facet=annee`
        ).then(response => response.json())

    }

    changePage = (page) => {
        this.setState({
            page
        })
        this.xhrRequest().then(data => {
            this.setRemoteData(data);
        });
    };

    onChangeRowsPerPage = (nb) => {
        this.setState({
            rowsPerPage: nb
        })
    }

    onSearchChange = (q) => {
        console.log("aaaaaa", { q })
        this.setState({
            q
        });
        this.xhrRequest().then(data => {
            this.setRemoteData(data);
        });
    }
    sort = (data, colIndex, order) => {
        console.log({ order });
        this.setState({
            data: [...data].sort()
        })
    }

    render() {

        const { data, page, count, columns, title } = this.state;

        const options = {
            selectableRows: false,
            filter: true,
            filterType: 'dropdown',
            responsive: 'scroll',
            serverSide: true,
            count: count,
            page: page,
            onSearchChange: this.onSearchChange,
            onChangeRowsPerPage: this.onChangeRowsPerPage,
            onChangePage: this.onCHangePage,
            customSort: this.sort,
            // onTableChange: (action, tableState) => {

            //     console.log(action, tableState);
            //     // a developer could react to change on an action basis or
            //     // examine the state as a whole and do whatever they want

            //     switch (action) {
            //         case 'changePage':
            //             this.changePage(tableState.page);
            //             break;
            //     }
            // },
            textLabels: {
                body: {
                    noMatch: "Sorry, no matching records found",
                    toolTip: "Sort",
                },
                pagination: {
                    next: "Next Page",
                    previous: "Previous Page",
                    rowsPerPage: "Rows per page:",
                    displayRows: "of",
                },
                toolbar: {
                    search: "Search",
                    downloadCsv: "Download CSV",
                    print: "Print",
                    viewColumns: "View Columns",
                    filterTable: "Filter Table",
                },
                filter: {
                    all: "All",
                    title: "FILTERS",
                    reset: "RESET",
                },
                viewColumns: {
                    title: "Show Columns",
                    titleAria: "Show/Hide Table Columns",
                },
                selectedRows: {
                    text: "rows(s) selected",
                    delete: "Delete",
                    deleteAria: "Delete Selected Rows",
                },
            }
        };

        return (
            <MUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
            />
        );

    }
}

CultureTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CultureTable);