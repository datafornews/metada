import React, { Component } from 'react';
import HowItWorks from "./HowItWorks";
import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import { connect } from 'react-redux';


const footerStyle = {
    position: 'absolute',
    bottom: '8px'
}

class Footer extends Component {
    render() {
        return (
            <div style={footerStyle}>
                <HowItWorks {...this.props} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);