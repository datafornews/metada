import React, { Component } from 'react';
import HomePaper from '../../Paper/HomePaper'
import StatsTable from './StatsTable';

class ContactPaper extends Component {

    render() {
        const extra = this.props.clientType === 'extension' ? this.props.translate('home.contactNewLink') : '';
        return (
            <HomePaper
                {...this.props}
                toggle={this.props.toggleStats}
                content={
                    <StatsTable {...this.props} />
                } />
        );
    }
}

export default ContactPaper;