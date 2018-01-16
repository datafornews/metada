import React, { Component } from 'react';
import ContactPaper from './ContactPaper';

class Contact extends Component {
    
    render() {

        return this.props.show.contact
            ?
            <ContactPaper {...this.props} />
            :
            ''

    }
}

export default Contact;