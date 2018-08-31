import React, { Component } from 'react'

import Chip from './Chip';
import logGraph from '../../../../utils/logGraph'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { colors } from '../../../../theme/metadaTheme';
import FilterChips from './FilterChips';

import { withStyles } from '@material-ui/core/styles';

const style = {
    fontSize: '0.9rem'
}


const styles = theme => ({
    label: { textTransform: 'capitalize' }
});



class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entities: [],
            indexes: new Set(),
            update: 0,
            categories: new Set(['m', 'i', 'c'])
        };
    }



    componentWillMount() {
        document.addEventListener("scroll", this.checkForNewChip, true);
    }


    componentWillUnmount() {
        console.log('remove');
        document.removeEventListener("scroll", this.checkForNewChip, true);
    }

    checkForNewChip = () => {
        var pageOffset = window.pageYOffset + window.innerHeight;
        var chipOffset = document.getElementById('chips-div').getBoundingClientRect().bottom

        // console.log(pageOffset, lastDivOffset, chipOffset);

        if (pageOffset - chipOffset + 100 > 0) {
            this.addChips()
            this.checkForNewChip();
        }
    };

    handleChipClick = (entity) => {
        logGraph(entity.id)
        this.props.history.push('/graph/' + entity.id)
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.dataIsAvailable && this.props.history.location.pathname.startsWith('/s')) {
            if (nextProps.history.location.pathname.startsWith('/s') && this.props.match.params.filter !== nextProps.match.params.filter) {
                this.showChips(nextProps);
            }
        }
        if (!nextProps.dataIsAvailable || nextState.entities.length) {
            return;
        }
        this.showChips(nextProps);
    }

    getRandomEntities = (props, nb, indexes, categories) => {
        let index, id;
        let entities = [];

        console.log('getting RE for ', Array.from(categories));

        let entity;
        for (let i = 0; i < nb; i++) {
            index = Math.floor(Math.random() * props.data.idSet.length);
            id = props.data.idSet[index];
            entity = props.data.entities.ids[id];
            if (!categories.has(entity.category)) {
                indexes.add(id)
            }
            while (indexes.has(id)) {
                index = Math.floor(Math.random() * props.data.idSet.length);
                id = props.data.idSet[index];
                entity = props.data.entities.ids[id];
                if (!categories.has(entity.category)) {
                    indexes.add(id)
                }
            }
            indexes.add(id);
            entities.push(entity);
        }
        return entities
    }

    addChips = () => {
        console.log("this.state.categories", this.state.categories);
        const newEntities = this.getRandomEntities(
            this.props, 6, this.state.indexes, this.state.categories
        );
        const newIndexes = []
        for (const ent of newEntities) {
            newIndexes.push(ent.id)
        }
        this.setState({
            entities: [
                ...this.state.entities,
                ...newEntities
            ],
            indexes: new Set([
                ...this.state.indexes,
                ...newIndexes
            ])
        })

    }

    showChips = (props) => {
        let requirements;
        if (props.history.location.pathname.startsWith('/s/')) {
            requirements = parseInt(this.props.match.params.filter, 10);
        } else {
            requirements = 11;
        }
        
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
        
        let indexes = new Set([1, 149])
        const leMonde = props.data.entities.ids[1];
        const patrickDrahi = props.data.entities.ids[149]
        let entities, nb;
        if (!this.props.history.location.pathname.startsWith('/s/')) {
            entities = [leMonde, patrickDrahi];
            nb = props.nb;
        } else {
            entities = [];
            nb = props.nb + 2;
        }
        entities = entities.concat(this.getRandomEntities(
            props, nb, indexes, categories
        ));
        this.setState({
            entities,
            categories
        })
    }

    goToExtension = () => {
        this.props.history.push('/extension');
    }

    handleScroll = (event) => {
        console.log('event :', event);
    }

    render() {
        const component = this;
        const { classes } = this.props;
        return this.props.show.chips ? (
            <div >
                <div>
                    <Typography variant="body1">
                        <Button style={{ color: colors.accent }} classes={{ label: classes.label }} variant='flat' onClick={this.goToExtension}>Installez Metada</Button>dans votre navigateur pour voir à qui appartiennent les médias que vous consultez!
                    </Typography>
                </div>
                <br />
                <div style={style}>
                    {this.props.translate('home.example')}
                </div>
                <FilterChips {...this.props} />
                <div id="chips-div" style={{ textAlign: 'center', marginTop: 32, marginBottom: 100 }}>
                    <Grid container spacing={32} alignItems="stretch">
                        {this.state.entities.map((v, k) => {
                            return <Grid key={k} item xs={12} sm={6} md={4} >
                                <Chip
                                    handleChipClick={component.handleChipClick}
                                    entity={v}
                                    translate={component.props.translate}
                                />
                            </Grid>
                        })}
                    </Grid>
                </div>
            </div>
        )
            :
            ''
    }
}
export default withStyles(styles)(Example);
