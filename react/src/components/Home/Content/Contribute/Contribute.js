import React, { Component } from 'react';
import ContributePaper from './ContributePaper';
import Home from '../../Home'
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Contribute extends Component {
    render() {

        return <Home isMain={false} {...this.props}>
            <ContributePaper {...this.props} />
        </Home>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contribute);