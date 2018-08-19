import React, { Component } from 'react';

import RefreshButton from './RefreshButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import GoToGraphButton from './GoToGraphButton';
import InfoDrawerButton from './InfoDrawerButton';



const defaultMetaDivStyle = {
    browser: {},
    mobile: {
        background: "linear-gradient(to left, rgba(236, 233, 230, 0.95), rgba(255, 255, 255, 1))",
        zIndex: "100",
        position: "fixed",
        width: "100%",
        left: "0",
        top: "0px",
        height: "100%",
        touchAction: 'none',
        overflow: 'hidden'
    },
    extension: {}
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'unset';
}


class SideButtons extends Component {

    componentWillUnmount() {
        enableScroll();
    }

    componentWillReceiveProps(nextProps) {

        if (window.innerWidth <= 870) {
            if (nextProps.show.sideButtons || nextProps.show.sideButtons === undefined) {
                disableScroll();
            } else {
                enableScroll();
            }
        }
    }



    render() {

        if (!sessionStorage.graphHistory || !sessionStorage.location) {
            const location = this.props.match.params.entityId
            sessionStorage.graphHistory = '["' + location + '"]';
            sessionStorage.location = '0';
        }

        let sideButtonDivStyle = {
            position: 'unset'
        }

        if (this.props.clientType === 'mobile') {
            sideButtonDivStyle.top = '30px';
            sideButtonDivStyle.width = '70px';
            sideButtonDivStyle.left = '3px';
            sideButtonDivStyle.top = '40px';
            sideButtonDivStyle.position = 'fixed';
        }
        else {
            const left = '4%';
            sideButtonDivStyle.top = '100px';
            sideButtonDivStyle.left = left
            sideButtonDivStyle.position = 'absolute'
        }

        const showNext = !JSON.parse(sessionStorage.graphHistory).length - 1 === JSON.parse(sessionStorage.location);
        const showPrevious = !JSON.parse(sessionStorage.location) <= 0;

        return (
            <div >
                <div style={sideButtonDivStyle}>
                    {this.props.clientType !== 'mobile' && !this.props.show.sideButtons && <RefreshButton {...this.props} />}
                    <InfoDrawerButton {...this.props} />
                    <GoToGraphButton {...this.props} />
                    {this.props.clientType !== 'mobile' && showNext && <PreviousButton {...this.props} />}
                    {this.props.clientType !== 'mobile' && showPrevious && <NextButton {...this.props} />}
                </div>
            </div>
        );
    }
}


export default SideButtons;