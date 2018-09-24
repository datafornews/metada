import React, { Component } from 'react';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const iconStyle = {
    height: '15px',
    width: '15px'
}

const textStyle = {
    fontSize: '0.6rem',
    padding: '8px',
    fontWeight: 'bold'
}

class WikiButton extends Component {
    render() {

        const { small, entity } = this.props;

        let style = textStyle;
        if (small) {
            style.padding = 4;
            style.fontSize = "0.4rem"
        }
        return entity.wiki_link ?
            (<Button target='_blank' color="primary" style={style} href={entity.wiki_link}>
                Wikipedia &nbsp;<OpenInNew style={iconStyle} />
            </Button>)
            :
            ''
    }
}

WikiButton.propTypes = {
    entity: PropTypes.object.isRequired,
    small: PropTypes.bool,
};

export default WikiButton