
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import WikiExtract from './WikiExtract';
import WikiButton from "./WikiButton";
import WebsiteButton from "./WebsiteButton";
import DrawerTitle from './InfoTitle';
import PropTypes from 'prop-types';

const maxLengths = {
    extension: 10000,
    mobile: 10000,
    browser: 10000
}

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
        display: "inline-block"
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    container: {
        padding: theme.spacing.unit * 2
    }
});

const wikiCardDivStyle = {
    textAlign: 'justify',
    textJustify: 'auto'
};




class Info extends Component {

    state = {
        paddingRight: 'unset',
        windowWidth: window.innerWidth
    };

    updateWidth = () => {

        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth

        if (width < 950 || this.props.clientType === "extension") {
            this.setState({
                paddingRight: '55px',
            })
        } else {
            this.setState({
                paddingRight: 'unset',
            })
        }
    }

    componentWillMount() {
        const location = parseInt(this.props.match.params.entityId, 10);
        const persistedInfoBox = JSON.parse(localStorage.getItem('reduxPersist:infoBox'))

        if (persistedInfoBox && persistedInfoBox.data !== location) {
            localStorage.setItem('reduxPersist:infoBox', JSON.stringify({
                ...persistedInfoBox,
                data: location
            }))
        }

        this.updateWidth();
    }

    componentWillMount = () => {
        this.updateWidth();
    }


    componentDidMount() {
        window.addEventListener("resize", this.updateWidth);
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth);
    }


    render() {

        const { classes, infoBox, data, translate, clientType, match } = this.props;
        const entityId = infoBox.type ? infoBox.data : parseInt(match.params.entityId, 10);
        const entity = data.entities.ids[entityId];


        const style = {
            marginTop: clientType === 'mobile' ? '0px' : '8px',
            position: clientType === 'mobile' ? 'relative' : 'inherit'
        };

        return (
            <div style={style} className={classes.container}>


                <div style={{ paddingRight: this.state.paddingRight }}>
                    <DrawerTitle
                        infoBox={infoBox}
                        match={match}
                        data={data}
                        translate={translate}
                    />
                </div>

                <WikiButton
                    entity={entity}
                />
                <WebsiteButton
                    entity={entity}
                    translate={translate}
                />

                <div style={wikiCardDivStyle}>
                    <WikiExtract
                        maxLength={maxLengths[clientType]}
                        infoBox={infoBox}
                        data={data}
                        translate={translate}
                        clientType={clientType}
                    />
                </div>
            </div>
        );

    }
}



Info.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    infoBox: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(Info);