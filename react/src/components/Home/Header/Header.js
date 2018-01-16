import React, { Component } from 'react'
import HowItWorks from "./HowItWorks";

const defaultTitleStyle = {
    display: 'inline-block',
    height: 'fit-content',
}
const titleStyle = {
    "browser": {
        ...defaultTitleStyle,
    },
    "mobile": {
        ...defaultTitleStyle,
        fontSize: '0.7em',
        margin: 'auto'
    },
    "extension": {
        ...defaultTitleStyle,
    },
};

const defaultParentDivStyle = {
    marginBottom: '20px'
}

const parentDivstyle = {
    "browser": {
        ...defaultParentDivStyle,
    },
    "mobile": {
        ...defaultParentDivStyle,
    },
    "extension": {
        ...defaultParentDivStyle,
    },
};

export default class Header extends Component {

    render() {
        const title = "Metada"
        return (
            <div id='HomeHeader' style={{ ...this.props.style, ...parentDivstyle[this.props.clientType] }}>
                <div style={titleStyle[this.props.clientType]}>
                    <h1>{title}</h1>
                    <h2>{this.props.translate('home.subtitle')}</h2>
                </div>
                <HowItWorks {...this.props} />
            </div>
        )
    }
}