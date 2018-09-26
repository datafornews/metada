import React, { Component } from 'react';
import ExtensionPaper from './ExtensionPaper';
import Home from '../../Home'
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Extension extends Component {
    render() {

        return <Home isMain={false} {...this.props}>
            <ExtensionPaper {...this.props} />
        </Home>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extension);