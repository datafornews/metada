import React, { Component } from 'react';
import ContributePaper from './ContributePaper';
import Container from '../../../Container';
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Contribute extends Component {
    render() {

        return <Container isMain={false} {...this.props}>
            <ContributePaper {...this.props} />
        </Container>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contribute);