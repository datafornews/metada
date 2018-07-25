import React, { Component } from 'react'
import OpenInNew from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';

const iconStyle = {
    height: '15px',
    width: '15px'
}

const textStyle = {
    fontSize: '0.6rem',
    padding: '8px',
    fontWeight: 'bold'
}

export default class WebsiteButton extends Component {
    render() {
        let style = textStyle;
        if (this.props.small) {
            style.padding = 4;
            style.fontSize = "0.4rem"
        }
        return this.props.entity.website && (
            <Button target='_blank' style={style} href={this.props.entity.website}>
                {this.props.translate('graph.websiteButton')} &nbsp; <OpenInNew style={iconStyle}/>
            </Button>)
    }
}





