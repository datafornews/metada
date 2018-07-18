import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip';

const defaultIntroStyle = {
    textAlign: 'justify',
    lineHeight: '1.6rem'
}

const introStyles = {
    'mobile': {
        ...defaultIntroStyle,
        fontWeight: 400
    },
    'browser': {
        ...defaultIntroStyle
    },
    'extension': {
        ...defaultIntroStyle,
        fontSize: '1.15rem'
    }
}

const tooltipDivStyle = {
    fontSize: '1.3rem',
    textAlign: 'center',
    padding: '5px',
};

const tooltipImageStyle = {
    height: '20px',
    width: '20px'
};

export default class HowItWorksText extends Component {
    render() {

        const tooltipTitle = (
            <div style={tooltipDivStyle}>
                {this.props.translate('home.intro.e')}<br />
                <img alt='Extension Icon' src='/icon.png' style={tooltipImageStyle} />
            </div>
        );

        let content;
        if (this.props.clientType === "extension") {

            content = (
                <span style={introStyles[this.props.clientType]}>
                    {this.props.translate('home.intro.a')}
                    <br /><br />
                    {this.props.translate('home.intro.b')}
                    <Tooltip placement="bottom" title={tooltipTitle}>
                    {/* Double span necessary for spaces not to be underlined */}
                        <span> <span style={{ borderBottom: '1px dashed #999' }}>
                            {this.props.translate('home.intro.c')}
                        </span> </span>
                    </Tooltip>
                    {this.props.translate('home.intro.d')}
                    <br /><br />
                    {this.props.translate('home.intro.f')}
                    <br /><br />
                    {this.props.translate('home.intro.g')}
                </span>
            );
        } else {
            content = (
                <span style={introStyles[this.props.clientType]}>
                    {this.props.clientType === "mobile" && this.props.translate('home.intro.am')}
                    {this.props.clientType === "browser" && this.props.translate('home.intro.aw')}
                    <br /><br />
                    {this.props.translate('home.intro.f')}
                    <br /><br />
                    {this.props.translate('home.intro.g')}
                </span>
            );
        }
        return content;
    }
}
