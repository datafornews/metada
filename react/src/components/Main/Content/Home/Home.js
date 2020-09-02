import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { connect } from 'react-redux';

import Example from './Example';
import Install from './Install';
import Title from './Title';

import SearchBar from '../../../Search/SearchBar';
import Waiting from '../../../Waiting';
import { check_website } from '../../../../utils/backgroundUtils';
import updateData from '../../../../utils/updateData';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';
import Container from '../../../Container';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';



const styles = theme => ({
    container: {
        margin: 'auto',
        maxWidth: '90%'
    },
    searchBarGridDiv: {
        alignItems: "center",
        display: 'flex',
        width: "100%"
    },
    searchBarGridItem: {
        alignItems: "center",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        position: "relative"
    },
    shareGridItem: {
        display: 'flex' // height: '100%'

    },
    statsGridDiv: {
        maxWidth: "70%"
    },
    textLoader: {
        color: theme.palette.secondary.main,
        left: "50%",
        maxWidth: theme.spacing(7),
        position: 'absolute',
        textAlign: 'center',
        transform: "translate(-50%)"
    }
});

class Home extends Component {

    state = {
        searchIsVisible: true
    }

    componentDidMount() {
        const component = this;
        if (this.props.clientType === 'extension') {
            window.browser.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
                if (tabs.length === 0) {
                    console.log('tabs.length is 0')
                    return;
                }
                var url = tabs[0].url;
                if (component.props.dataIsAvailable) {
                    const entity = check_website(component.props.data, url);
                    if (entity && !sessionStorage['default_' + entity.id]) {
                        // an entity was found and it is the first time
                        // the Extension sees this entity for this session
                        // (It is assumed that if the user re-clicks on the Extension
                        // during the session they intend to access the whole Extension)
                        component.props.history.push('/graph/' + entity.id);
                        sessionStorage['default_' + entity.id] = 'true';
                        component.props.updateEntityInfoBox(entity.id);
                        component.props.displayEntity(entity.id);
                    }
                }
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        updateData(this);
    }

    onSearchBarVisibilityChange = (isVisible) => {
        this.props.toggleMainSearchBar(isVisible);
    }

    render() {
        const { classes, theme, ...noClassesProps } = this.props;
        return (
            !noClassesProps.isRehydrated ? '' :
                <Container isMain={true} {...noClassesProps}>
                    <div className={classes.container}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Grid item xs={12} >
                                    <Title clientType={this.props.clientType} translate={this.props.translate} />
                                </Grid>

                                {this.props.dataIsAvailable ? <Grid item xs={12} className={classes.searchBarGridItem}>
                                    {/* {this.props.clientType === "extension" && <div className={classes.statsGridDiv}>
                                        <StatsPreview history={this.props.history} />
                                    </div>} */}
                                    <VisibilitySensor
                                        onChange={this.onSearchBarVisibilityChange}
                                    >
                                        <div className={classes.searchBarGridDiv}>
                                            <SearchBar
                                                arrowRenderer={<Search />}
                                                data={this.props.data}
                                                toggleAbout={this.props.toggleAbout}
                                                show={this.props.show}
                                                history={this.props.history}
                                                translate={this.props.translate}
                                                preventAutofocus={false}
                                                updateEntityInfoBox={this.props.updateEntityInfoBox}
                                                controlStyle={{
                                                    minHeight: 60,
                                                    margin: 'auto',
                                                    fontSize: 25,
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
                                                isMain
                                            />
                                        </div>
                                    </VisibilitySensor>
                                </Grid>

                                    :
                                    <Grid item xs={12} className={classes.searchBarGridItem}>
                                        <Waiting
                                            clientType={this.props.clientType}
                                            translate={this.props.translate}
                                            toTranslate="home.loadingData"
                                        />
                                    </Grid>

                                }
                            </Grid>
                            {this.props.clientType !== "extension" && (
                                <Grid item xs={12} md={4} className={classes.shareGridItem} >
                                    <Install clientType={this.props.clientType} translate={this.props.translate} />
                                </Grid>
                            )}
                        </Grid>
                        <Example {...noClassesProps} nb={12} />
                    </div>
                </Container>
        )
    }
}

Home = withStyles(styles, { withTheme: true })(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);