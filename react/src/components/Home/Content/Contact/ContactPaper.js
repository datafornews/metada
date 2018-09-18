import React, { Component } from 'react';
import MarkdownPaper from '../../Paper/MarkdownPaper';

class ContactPaper extends Component {

    render() {
        const extra = this.props.clientType === 'extension' ? this.props.translate('home.contactNewLink') : '';
        return (
            <div><MarkdownPaper
                {...this.props}
                source={this.props.translate('home.contactPaperMd') + extra}
                toggle={this.props.toggleContact}
            />
            </div>
        )
    }
}

export default ContactPaper;