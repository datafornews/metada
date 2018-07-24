import React, { Component } from 'react';

import Waiting from '../../Waiting';
import getWikiData from '../../../utils/getWikiData';
import Button from '@material-ui/core/Button';
import MoreIcon from '@material-ui/icons/More';

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
        let extractStyle;
        if (this.props.clientType === 'browser') {
            extractStyle = {
                height: '180px',
                overflowY: 'scroll'
            }
        } else {
            extractStyle = {
                position: 'inherit'
            }
        }

        let div;
        if (typeof this.state.extract === 'string' || this.state.extract instanceof String) {
            const toWrite = this.state.extract.split(' ').slice(0, this.props.maxLength).join(" ");
            if (toWrite.length < this.props.maxLength) {
                div = <div>{toWrite}</div>
            } else {
                div = <div>{toWrite}<Button>...</Button></div>
            }
        }

        return (
            <div style={extractStyle}>
                {(typeof this.state.extract === 'string' || this.state.extract instanceof String) ?
                    div
                    :
                    this.state.extract
                }

            </div>
        );
    }
}

export default WikiCard;