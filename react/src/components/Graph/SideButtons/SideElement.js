// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import sideButtonStyle from './sideButtonStyle';

const styles = theme => (sideButtonStyle);

const titleStyle = {
    minWidth: '50px',
    textAlign: 'center'
}

export class SideElement extends React.Component {

    state = { open: false }

    componentWillReceiveProps(nextProps) {
        const nextLocation = parseInt(nextProps.match.params.entityId, 10);
        const location = parseInt(this.props.match.params.entityId, 10);
        if (location && nextLocation !== location) {
            this.setState({
                open: false
            });
        }
    }

    componentDidMount() {
        this._mounted = true;
        if (JSON.parse(localStorage['reduxPersist:show']).help) {
            this.setState({
                open: true
            });
            setTimeout(() => {
                if (this._mounted && this.state.open) {
                    this.setState({
                        open: false
                    })
                }
            }, 10000)
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }


    handleClick = () => {
        this.props.onClick();
    }

    render() {

        let content = this.props.content;
        let title = <div style={titleStyle}>
            {this.props.title}
        </div>

        if (this.props.disabled) {
            if (!this.props.button) {
                return <div
                    onMouseEnter={() => { this.setState({ open: true }) }}
                    onMouseLeave={() => { this.setState({ open: false }) }}
                >
                    {content}
                </div>
            }
            return <IconButton disabled className={this.props.classes.button}
                onClick={this.handleClick}
                onMouseEnter={() => { this.setState({ open: true }) }}
                onMouseLeave={() => { this.setState({ open: false }) }}
            >
                {content}
            </IconButton>
        }

        let tooltipContent = this.props.button ? <IconButton className={this.props.classes.button}
            onClick={this.handleClick}
            onMouseEnter={() => { this.setState({ open: true }) }}
            onMouseLeave={() => { this.setState({ open: false }) }}
        >
            {content}
        </IconButton> : content;

        return (
            <Tooltip
                id={this.props.id}
                title={title}
                placement={this.props.placement}
                open={this.props.clientType === 'mobile' ? false : this.state.open}
            >
                <div
                    onMouseEnter={() => { this.setState({ open: true }) }}
                    onMouseLeave={() => { this.setState({ open: false }) }}
                >
                    {tooltipContent}
                </div>
            </Tooltip>
        );
    }
}

SideElement.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    placement: PropTypes.string,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};


export default withStyles(styles)(SideElement);