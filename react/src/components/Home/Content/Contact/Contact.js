import React, { Component } from 'react';
import ContactPaper from './ContactPaper';
import Home from '../../Home'
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Contact extends Component {
    
    render() {

        return <Home isMain={false} {...this.props}>
        <ContactPaper {...this.props} />
    </Home>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);