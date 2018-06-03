import React, { Component } from 'react';
import MarkdownPaper from '../../Paper/MarkdownPaper';

class ExtensionPaper extends Component {

    

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <MarkdownPaper
                    {...this.props}
                    source={this.props.translate('home.extensionPaperMd')}
                    toggle={this.props.toggleContact}
                />
            </div>
        );
    }
}

export default ExtensionPaper;