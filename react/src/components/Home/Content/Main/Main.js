import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Example from './Example';
import Install from './Install';
import Title from './Title';
import StatsPreview from './StatsPreview';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../../Search/SearchBar';
import Search from '@material-ui/icons/Search';
import Waiting from '../../../Waiting';
import Home from '../../Home'
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

const styles = theme => ({
    container: {
        maxWidth: '90%',
        margin: 'auto'
    },
    searchBarGridItem: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: "center",
        flexDirection: 'column',
        position: "relative"
    },
    searchBarGridDiv: {
        display: 'flex',
        alignItems: "center",
        width: "100%",
    },
    shareGridItem: {
        // height: '100%'
    },
    statsGridDiv: {
        maxWidth: "70%"
    },
    textLoader: {
        maxWidth: 60,
        position: 'absolute',
        left: "50%",
        transform: "translate(-50%)",
        textAlign: 'center',
        color: theme.palette.secondary.main
    }
});

class Main extends Component {

    state = {
        height: null
    }

    componentDidMount() {
        this.setState({
            height: window.innerHeight
        })
    }


    render() {
        const { classes, theme, ...noClassesProps } = this.props;
        return (
            !noClassesProps.isRehydrated ? '' :
                <Home isMain={true} {...noClassesProps}>
                    <div className={classes.container}>
                        <Grid container spacing={16}>
                            <Grid item xs={12} md={8}>
                                <Grid item xs={12} >
                                    <Title clientType={this.props.clientType} translate={this.props.translate} />
                                </Grid>

                                {this.props.dataIsAvailable ? <Grid item xs={12} className={classes.searchBarGridItem}>
                                    {this.props.clientType === "extension" && <div className={classes.statsGridDiv}>
                                        <StatsPreview history={this.props.history} />
                                    </div>}
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
                                            force={true}
                                            controlStyle={{
                                                minHeight: 60,
                                                margin: 'auto',
                                                fontSize: 25,
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        />
                                    </div>
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
                        {this.props.dataIsAvailable && <Example {...noClassesProps} nb={this.state.height > 1000 ? 12 : 6} />}
                    </div>
                </Home>
        )
    }
}

Main = withStyles(styles, { withTheme: true })(Main);
export default connect(mapStateToProps, mapDispatchToProps)(Main);