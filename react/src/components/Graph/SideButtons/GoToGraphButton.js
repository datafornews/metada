// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CenterFocusStrongIcon from 'react-icons/lib/fa/sitemap';
import sideButtonStyle from './sideButtonStyle';
import SideElement from './SideElement';




const styles = theme => (sideButtonStyle);

class GoToGraphButton extends React.Component {


    handleClick = (id) => () => {
        this.props.history.push(`/graph/${id}`)
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.infoBox.data !== this.props.infoBox.data) {
            this.timeout && clearTimeout(this.timeout)
            this.setState(
                {
                    in: false
                }
            )
            this.timeout = setTimeout(() => {
                this.setState({
                    in: true
                })
                this.timeout = setTimeout(() => {
                    this.setState({
                        in: false
                    })
                    this.timeout = setTimeout(() => {
                        this.setState({
                            in: true
                        })
                    }, 200)
                }, 200)
            }, 200)


        }
    }

    state = {
        in: true
    }


    render() {

        const entity = this.props.data.entities.ids[
            this.props.infoBox.data
        ];
        if (entity && entity.category !== 's' && entity.id !== parseInt(this.props.match.params.entityId, 10)) {
            return <SideElement
                id="tooltip-ResetButton"
                title={this.props.translate('graph.sideButtons.nextTooltip')}
                placement="right"
                content={<CenterFocusStrongIcon style={{ color: "green" }} className={this.props.classes.icon} />}
                onClick={this.handleClick(entity.id)}
                // disabled={disabled}
                {...this.props}
                button />
        }
        return "";

    }
}

GoToGraphButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoToGraphButton);