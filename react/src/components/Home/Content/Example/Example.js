import React, { Component } from 'react'
import Chip from './Chip';
import logGraph from '../../../../utils/logGraph'


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
        for (let i = 0; i < nb; i++) {
            index = Math.floor(Math.random() * props.data.idSet.length);
            id = props.data.idSet[index];
            while (indexes.indexOf(id) > -1) {
                index = Math.floor(Math.random() * props.data.idSet.length);
                id = props.data.idSet[index];
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
            props, 2, indexes
        ));
        const component = this;

        const content = (
            <div style={{ textAlign: 'center' }}>
                {entities.map((v, k) => {
                    return <Chip
                        key={k}
                        handleChipClick={component.handleChipClick}
                        entity={v}
                    />
                })}
            </div>
        );
        if (this.state.content.length === 0) {
            this.setState({
                content
            })
        }
    }


    render() {       
        return (
            <div>
                {this.props.translate('home.example')} <br />
                {this.state.content}
            </div>
        )
    }
}
