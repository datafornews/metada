import React, { Component } from 'react';
import OpenInNew from 'material-ui-icons/OpenInNew';
import Button from 'material-ui/Button';

export default class WikiButton extends Component {
    render() {
        const { classes } = this.props;
        return this.props.entity.wiki_link ?
            (<Button target='_blank' color="primary" className={classes.button} href={this.props.entity.wiki_link}>
                Wikipedia &nbsp;<OpenInNew />
            </Button>)
            :
            ''
    }
}
