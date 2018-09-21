import React, { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Example from './Example';
import Install from './Install';
import Title from './Title';
import StatsPreview from './StatsPreview';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../../../Search/SearchBar';
import Search from '@material-ui/icons/Search';
import Waiting from '../../../Waiting';


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
        justifyContent: 'center',
        alignItems: "center",
        width: "100%",
    },
    shareGridItem: {
        marginTop: 32
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
            <div className={classes.container}>
                <Grid container>
                    <Grid item sm={5} xs={12} >
                        <Title clientType={this.props.clientType} translate={this.props.translate} />
                    </Grid>

                    {this.props.dataIsAvailable ? <Grid item sm={7} xs={12} className={classes.searchBarGridItem}>
                        {this.props.clientType === "extension" && <div className={classes.statsGridDiv}>
                            <StatsPreview history={this.props.history} />
                        </div>}
                        <div className={classes.searchBarGridDiv}>
                            <SearchBar
                                arrowRenderer={<Search />}
                                data={this.props.data}
                                toggleAbout={this.props.toggleAbout}
                                show={this.props.show}
                                toggleSideButtons={this.props.toggleSideButtons}
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
                            />
                        </div>
                    </Grid>

                        :
                        <Grid item sm={7} xs={12} className={classes.searchBarGridItem}>
                            <Waiting 
                            clientType={this.props.clientType} 
                            translate={this.props.translate}
                            toTranslate="home.loadingData"
                            />
                        </Grid>

                    }
                    {this.props.clientType !== "extension" && <Grid item xs={12} className={classes.shareGridItem} >
                        <Install clientType={this.props.clientType} translate={this.props.translate} />
                    </Grid>}
                </Grid>
                {this.props.dataIsAvailable && <Example {...noClassesProps} nb={this.state.height > 1000 ? 12 : 6} />}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Main);