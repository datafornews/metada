import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';


const styles = theme => ({
    container: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: theme.spacing.unit * 20,
        position: 'relative'
    },
    icon: {
        color: theme.palette.secondary.main,
        height: theme.spacing.unit * 3,
        width: theme.spacing.unit * 3
    },
    textLoader: {
        color: theme.palette.secondary.main,
        left: "50%",
        maxWidth: theme.spacing.unit * 8,
        position: 'absolute',
        textAlign: 'center',
        transform: "translate(-50%)"
    }
});

class Waiting extends Component {

    state = {
        noInternet: false,
        timeout: null
    }

    componentDidMount() {
        this.setState({
            timeout: setTimeout(() => {
                !this.isCancelled && this.setState({
                    noInternet: true
                })
            }, 20000)
        })
    }


    componentWillUnmount() {
        this.isCancelled = true;
        clearTimeout(this.state.timeout)
    }


    render() {
        const { classes, theme, translate } = this.props;
        const { noInternet } = this.state;
        return (
            <div className={classes.container}>
                <div className={classes.textLoader} style={noInternet ? { maxWidth: 200, width: 200 } : {}}>
                    {/* Data is on its way! */}
                    {noInternet ?
                        translate('home.noData')
                        :
                        translate(this.props.toTranslate)
                    }
                    {noInternet &&
                        <Button onClick={() => {
                            if (window) {
                                if (this.props.clientType === 'extension') {
                                    window.browser.runtime.reload();
                                } else {
                                    window.location.reload();
                                }
                            }
                        }}>
                            <RefreshIcon className={classes.icon} />
                        </Button>
                    }
                </div>
                {!noInternet &&
                    <Loader
                        type="Plane"
                        color={theme.palette.primary.main}
                        height="100"
                        width="100"
                    />
                }
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Waiting);