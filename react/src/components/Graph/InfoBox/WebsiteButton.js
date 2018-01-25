import React, { Component } from 'react'
import OpenInNew from 'material-ui-icons/OpenInNew';
import Button from 'material-ui/Button';

const iconStyle = {
    height: '15px',
    width: '15px'
}

const textStyle = {
    fontSize: '0.6rem'
}

export default class WebsiteButton extends Component {
    render() {
        const { classes } = this.props;
        return this.props.entity.website && (
            <Button target='_blank' style={textStyle} href={this.props.entity.website}>
                {this.props.translate('graph.websiteButton')} &nbsp; <OpenInNew style={iconStyle}/>
            </Button>)
    }
}





