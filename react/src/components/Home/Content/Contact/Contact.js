import React, { Component } from 'react';
import ContactPaper from './ContactPaper';

class Contact extends Component {
    
    render() {

        return this.props.location.pathname.indexOf('/contact') > -1
            ?
            <ContactPaper {...this.props} />
            :
            ''

    }
}

export default Contact;