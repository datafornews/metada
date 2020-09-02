import React, { Component } from 'react'
import PropTypes from 'prop-types';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';

const iconStyle = {
    height: '15px',
    width: '15px'
}

const textStyle = {
    fontSize: '0.8rem',
    padding: '8px',
    margin: "4px"
}

class WebsiteButton extends Component {
    render() {

        const { small, entity, translate } = this.props;

        let style = textStyle;
        if (small) {
            style.padding = 4;
            style.fontSize = "0.4rem"
        }
        return entity.website ? (
            <Button target='_blank' style={style} href={entity.website}>
                {translate('graph.websiteButton')} &nbsp; <OpenInNew style={iconStyle} />
            </Button>) : ""
    }
}


WebsiteButton.propTypes = {
    entity: PropTypes.object.isRequired,
    small: PropTypes.bool,
    translate: PropTypes.func.isRequired,
};

export default WebsiteButton;





