import React, { Component } from 'react';
import SearchButton from './SearchButton';
import HomeButton from './HomeButton';
import RefreshButton from './RefreshButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import HideSideButton from './HideSideButton';
import Legend from './Legend';
import SearchBar from '../../Search/SearchBar';


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
            const left = this.props.clientType === 'browser' ? 0.15 * window.innerWidth - 20 + 8 + 'px' : '6%';
            sideButtonDivStyle.top = '70px';
            sideButtonDivStyle.left = left
            sideButtonDivStyle.position = 'absolute'
        }

        let legendDivStyle = { ...sideButtonDivStyle };
        if (this.props.clientType !== 'mobile') {
            legendDivStyle.right = legendDivStyle.left;
        } else {
            legendDivStyle.marginTop = this.props.show.sideButtons ? '50%' : '0%';
            legendDivStyle.width = '100%';
            legendDivStyle.position = 'inherit';
        }


        delete legendDivStyle.left;

        let metaDivStyle = defaultMetaDivStyle[this.props.clientType];

        if (window.innerWidth <= 2870) {
            metaDivStyle = defaultMetaDivStyle['mobile'];
        }

        return (
            <div style={(this.props.show.sideButtons && this.props.show.legend) ? metaDivStyle : {}}>
                <div style={{ position: 'absolute', width: '100%', top: 0 }}>
                    <div style={{ maxWidth: '300px', margin: '16px auto' }}>
                        {
                            this.props.show.sideButtons && this.props.dataIsAvailable && <SearchBar
                                {...this.props} />
                        }

                    </div>
                </div>

                <div style={sideButtonDivStyle}>
                    <HideSideButton {...this.props} />
                    {this.props.show.sideButtons && <HomeButton {...this.props} />}
                    {this.props.show.sideButtons && <SearchButton {...this.props} />}
                    {this.props.show.sideButtons && <RefreshButton {...this.props} />}
                    {this.props.clientType !== 'mobile' && !this.props.show.sideButtons && <PreviousButton {...this.props} />}
                    {this.props.clientType !== 'mobile' && !this.props.show.sideButtons && <NextButton {...this.props} />}
                </div>
                <div style={legendDivStyle}>
                    {this.props.show.sideButtons && this.props.show.legend && <Legend {...this.props} />}
                </div>
            </div>
        );
    }
}


export default SideButtons;