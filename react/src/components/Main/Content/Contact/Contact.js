import React, { Component } from 'react';
import ContactPaper from './ContactPaper';
import Container from '../../../Container';
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Contact extends Component {
    
    render() {

        return <Container isMain={false} {...this.props}>
        <ContactPaper {...this.props} />
    </Container>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);