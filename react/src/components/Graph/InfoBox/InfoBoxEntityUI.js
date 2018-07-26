import React, { Component } from 'react'
import InfoBoxEntity from './InfoBoxEntity';

const defaultStyle = {
    margin: 'auto',
    width: '90%'
};

const styles = {
    'browser': {
        ...defaultStyle,
    },
    'extension': {
        ...defaultStyle,
    },
    'mobile': {
        ...defaultStyle,
    }
}

export default class InfoBoxEntityUI extends Component {
    render() {

        return this.props.infoBox.type === 'entity'
            &&
            (
                <div style={styles[this.props.clientType]}>
                    <InfoBoxEntity {...this.props} idToDisplay={this.props.infoBox.data} changeWiki={this.props.changeWiki} />
                </div>
            )
    }
}
