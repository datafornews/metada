import React, { Component } from 'react';
import Intent from './Intent';
import Home from '../../Home'
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class About extends Component {
    render() {

        // return !this.props.isRehydrated ? '' : <Home isMain={false} {...this.props}>
        return !this.props.isRehydrated ? '' : <Home isMain={false} {...this.props}>
            <Intent {...this.props} />
        </Home>

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(About);