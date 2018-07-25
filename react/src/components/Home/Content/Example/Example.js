import React, { Component } from 'react'
import Chip from './Chip';
import logGraph from '../../../../utils/logGraph'
import Grid from '@material-ui/core/Grid';


const style = {
    fontSize: '0.9rem'
}

export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        };
    }

    handleChipClick = (entity) => {
        logGraph(entity.id)
        this.props.show.searchBar && ['/', '/search'].indexOf(this.props.location.pathname) > -1 && this.props.closeAll();
        this.props.history.push('/graph/' + entity.id)
    }

    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.dataIsAvailable || nextState.content.length > 0) {
            return;
        }
        this.showChips(nextProps);
    }

    getRandomEntities = (props, nb, indexes) => {
        let index, id;
        let entities = [];
        let company = false;
        for (let i = 0; i < nb; i++) {
            index = Math.floor(Math.random() * props.data.idSet.length);
            id = props.data.idSet[index];
            while (indexes.indexOf(id) > -1 || !company) {
                index = Math.floor(Math.random() * props.data.idSet.length);
                id = props.data.idSet[index];
                if (props.data.entities.ids[id].category === "c") {
                    company = true;
                }
            }
            indexes.push(id);
            entities.push(props.data.entities.ids[props.data.idSet[index]]);
        }
        return entities
    }

    showChips = (props) => {
        let indexes = [1, 149]
        const leMonde = props.data.entities.ids[1];
        const patrickDrahi = props.data.entities.ids[149]
        const entities = [leMonde, patrickDrahi].concat(this.getRandomEntities(
            props, props.nb, indexes
        ));
        const component = this;

        const content = (
            <div style={{ textAlign: 'center', marginTop: 32, marginBottom: 100 }}>
                <Grid container spacing={32} alignItems="stretch">
                    {entities.map((v, k) => {
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
        );
        if (this.state.content.length === 0) {
            this.setState({
                content
            })
        }
    }

    render() {
        return this.props.show.chips ? (
            <div>
                <div style={style}>
                    {this.props.translate('home.example')}
                </div>
                {this.state.content}
            </div>
        )
            :
            ''
    }
}
