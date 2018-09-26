import React, { Component } from 'react';

import MarkdownPaper from '../../Paper/MarkdownPaper';

class Intent extends Component {
    render() {
        const link = <a href="https://www.monde-diplomatique.fr/cartes/ppa" rel="noopener noreferrer" target="_blank">*Le Monde Diplomatique</a>;
        return (
            <div>
                <MarkdownPaper
                    {...this.props}
                    source={this.props.translate('home.intentPaperMd')}
                    extra={link}
                    toggle={this.props.toggleIntent}
                />
            </div>
        );
    }
}

export default Intent;