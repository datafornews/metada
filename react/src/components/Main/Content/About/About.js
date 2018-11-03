import React, { Component } from 'react';
import Intent from './Intent';
import Container from '../../../Container';
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class About extends Component {
    render() {

        // return !this.props.isRehydrated ? '' : <C isMain={false} {...this.props}>
        return !this.props.isRehydrated ? '' : <Container isMain={false} {...this.props}>
            <Intent {...this.props} />
        </Container>

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(About);