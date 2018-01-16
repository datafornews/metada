import React, { Component } from 'react';

import Waiting from '../../Waiting';
import getWikiData from '../../../utils/getWikiData';

class WikiCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extract: <Waiting translate={this.props.translate} toTranslate='graph.wiki.loading' />
        }
    }

    
    componentDidMount() {
        const entity = this.props.data.entities.ids[this.props.infoBox.data];
        getWikiData(this, entity);
    }
    

    componentWillReceiveProps(nextProps) {
        if (nextProps.infoBox.data === this.props.infoBox.data) {
            return
        }
        this.setState({
            extract: <Waiting translate={this.props.translate} toTranslate='graph.wiki.loading' />,
        });
        const entity = this.props.data.entities.ids[nextProps.infoBox.data];

        getWikiData(this, entity);
    }

    render() {
        return (
            <span>
                {this.state.extract}
            </span>
        );
    }
}

export default WikiCard;