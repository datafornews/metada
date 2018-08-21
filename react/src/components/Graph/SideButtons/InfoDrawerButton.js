// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DescriptionIcon from 'react-icons/lib/fa/file-text';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';

const styles = theme => (sideButtonStyle);
const colors = {
    m: '#3f51b5',
    c: 'rgb(187, 45, 45)',
    i: 'rgb(1, 41, 71)'
}

class InfoDrawerButton extends React.Component {


    handleClick = () => {
        this.props.toggleDrawer();
    }

    render() {
        const entity = this.props.data.entities.ids[
            this.props.infoBox.data
        ];
        if (entity && entity.category !== 's') {

            const selectedIsRepresented = parseInt(this.props.infoBox.data, 10) === parseInt(this.props.match.params.entityId, 10);
            // console.log(this.props.match.entityId);

            let title = this.props.translate('graph.sideButtons.openDescription').split("@@");
            title = title[0] + entity.name + title[1];
            return <SideElement
                id="tooltip-ResetButton"
                title={title}
                placement="right"
                content={<DescriptionIcon style={{ color: selectedIsRepresented ? colors[entity.category] : "green" }} className={this.props.classes.icon} />}
                onClick={this.handleClick}
                // disabled={disabled}
                {...this.props}
                button
            />
        }
        return "";

    }
}

InfoDrawerButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoDrawerButton);