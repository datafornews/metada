import React, { Component } from 'react'

import Chip from './Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FilterChips from './FilterChips';
import { AsyncComponents } from '../../../../index';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    label: { textTransform: 'capitalize' },
    containerDiv: {
        marginTop: theme.spacing.unit * 6,
        display: 'block',
        padding: theme.spacing.unit * 8,
        [theme.breakpoints.up('md')]: {
            // backgroundColor: 'red',
            marginTop: theme.spacing.unit * 8
        },
    }
});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
}

class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entities: [],
            indexes: new Set(),
            update: 0,
            categories: new Set(['m', 'i', 'c']),
            ids: {
                m: new Set(),
                c: new Set(),
                i: new Set(),
            }
        };
    }



    componentWillMount() {
        document && document.addEventListener("scroll", this.checkForNewChip, true);
    }

    componentDidMount() {
        this.showChips(this.props);
    }


    componentWillUnmount() {
        document && document.removeEventListener("scroll", this.checkForNewChip, true);
    }

    checkForNewChip = () => {
        const pageOffset = window.pageYOffset + window.innerHeight;
        const chip = document.getElementById('chips-div')
        const chipOffset = chip ? chip.getBoundingClientRect().bottom : null;

        // console.log(pageOffset, lastDivOffset, chipOffset);

        if (chipOffset && (pageOffset - chipOffset + 100 > 0)) {
            this.addChips()
            // this.checkForNewChip();
        }
    };

    handleChipClick = (entity) => {
        entity.id ? this.props.history.push('/graph/' + entity.id) : this.props.history.push('/');
    }


    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.dataIsAvailable);
        if (this.props.dataIsAvailable && this.props.history.location.pathname.startsWith('/s/')) {
            if (nextProps.history.location.pathname.startsWith('/s/') && this.props.match.params.filter !== nextProps.match.params.filter) {
                this.showChips(nextProps);
                return;
            }
        }

        if (this.state.entities.length && this.props.dataIsAvailable) {
            return;
        }

        this.showChips(nextProps);
    }

    getRandomEntities = (props, nb, indexes, ids) => {
        let id, entity;
        let entities = [];

        let allIds = new Set();
        for (const idCategory in ids) {
            if (ids.hasOwnProperty(idCategory)) {
                const idSet = ids[idCategory];
                allIds = new Set([...allIds, ...idSet]);
            }
        }
        let setArray = Array.from(allIds);
        shuffleArray(setArray);
        allIds = new Set(setArray);

        const idIterator = allIds.values()
        for (let i = 0; i < nb; i++) {
            id = idIterator.next();
            if (id.done) {
                return { entities, indexes };
            }
            id = id.value;
            entity = props.data.entities.ids[id];
            entities.push(entity);
            ids[entity.category].delete(entity.id);
        }
        return { entities, ids }
    }

    addChips = () => {
        // console.log("addingChips");
        const newValues = this.getRandomEntities(
            this.props, 6, this.state.indexes, this.state.ids
        );
        const newIndexes = []
        for (const ent of newValues.entities) {
            newIndexes.push(ent.id)
        }
        this.setState({
            entities: [
                ...this.state.entities,
                ...newValues.entities
            ],
            ids: newValues.ids
        })

    }

    getCategories = (requirements) => {
        let categories = new Set();
        if (requirements - 7 >= 0) {
            categories.add('i');
            requirements -= 7;
        }
        if (requirements - 3 >= 0) {
            categories.add('c');
            requirements -= 3;
        }
        if (requirements - 1 >= 0) {
            categories.add('m');
            requirements -= 1;
        }
        if (!categories.size) {
            categories = new Set(['i', 'c', 'm']);
            console.log('empty categories');
        }
        return categories
    }

    getIds = (props, categories) => {
        let ids = {
            m: new Set(),
            c: new Set(),
            i: new Set(),
        };
        for (const id in props.data.entities.ids) {
            if (props.data.entities.ids.hasOwnProperty(id)) {
                const entity = props.data.entities.ids[id];
                ids[entity.category].add(entity.id);
            }
        }
        ['i', 'c', 'm'].forEach(v => {
            if (!categories.has(v)) {
                ids[v] = new Set();
            }
        })
        return ids
    }

    showChips = (props) => {
        // console.log('showChips');

        let entities;

        if (!props.dataIsAvailable) {
            entities = [];
            for (let i = 0; i < props.nb + 2; i++) {
                entities.push({
                    name: ""
                })
            }
            this.setState({
                entities
            })
            console.log('setting empty entities', entities);
            return;
        }

        let requirements;
        if (props.history.location.pathname.startsWith('/s/')) {
            requirements = parseInt(props.match.params.filter, 10);
        } else {
            requirements = 11;
        }

        const categories = this.getCategories(requirements);
        const ids = this.getIds(props, categories);


        let nb, indexes;
        if (!props.history.location.pathname.startsWith('/s/')) {
            indexes = new Set([1, 149])
            const leMonde = props.data.entities.ids[1];
            const patrickDrahi = props.data.entities.ids[149]
            entities = [leMonde, patrickDrahi];
            nb = props.nb;
        } else {
            entities = [];
            nb = props.nb + 2;
            indexes = new Set();
        }
        const values = this.getRandomEntities(
            props, nb, indexes, ids
        )
        entities = [...entities, ...values.entities];

        this.setState({
            entities,
            categories,
            ids
        })
    }

    goToExtension = () => {
        this.props.history.push('/extension');
    }

    preloadGraph = () => {
        console.log('preloading graph');
        AsyncComponents.graph.preload();
    }

    render() {
        const component = this;
        const { classes, ...noClassesProps } = this.props;
        return (
            <Paper className={classes.containerDiv} style={this.props.style}>
                {this.props.clientType !== "mobile" && <FilterChips {...noClassesProps} />}
                <div id="chips-div" style={{ textAlign: 'center', marginTop: 32, marginBottom: 100 }}>
                    <Grid container spacing={32} alignItems="stretch" onMouseEnter={this.preloadGraph}>
                        {this.state.entities.map((v, k) => {
                            return <Grid key={k} item xs={12} sm={6} md={4} lg={3} >
                                <Chip
                                    handleChipClick={component.handleChipClick}
                                    entity={v}
                                    translate={component.props.translate}
                                    history={component.props.history}
                                    clientType={component.props.clientType}
                                />
                            </Grid>
                        })}
                    </Grid>
                </div>
            </Paper>
        )
    }
}
export default withStyles(styles)(Example);
