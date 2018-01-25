import React, { Component } from 'react';
import OpenInNew from 'material-ui-icons/OpenInNew';
import Button from 'material-ui/Button';

const iconStyle = {
    height: '15px',
    width: '15px'
}

const textStyle = {
    fontSize: '0.6rem',
    padding: '8px'
}

export default class WikiButton extends Component {
    render() {
        return this.props.entity.wiki_link ?
            (<Button target='_blank' color="primary" style={textStyle} href={this.props.entity.wiki_link}>
                Wikipedia &nbsp;<OpenInNew style={iconStyle}/>
            </Button>)
            :
            ''
    }
}
