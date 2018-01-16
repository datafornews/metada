import React, { Component } from 'react'
import OpenInNew from 'material-ui-icons/OpenInNew';
import Button from 'material-ui/Button';

export default class WebsiteButton extends Component {
    render() {
        const { classes } = this.props;
        return this.props.entity.website && (
            <Button target='_blank' className={classes.button} href={this.props.entity.website}>
                {this.props.translate('graph.websiteButton')} &nbsp; <OpenInNew />
            </Button>)
    }
}





