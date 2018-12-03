import React, { Component } from 'react';
import is from 'is_js';
import ChromeIcon from "react-icons/lib/io/social-chrome";
import FirefoxIcon from "react-icons/lib/fa/firefox";

import { colors } from '../../../../theme/metadaTheme';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import OpenInNew from '@material-ui/icons/OpenInNew';
import { Link } from 'react-router-dom'

const styles = theme => ({
    container: {
        height: '100%'
    },
    shareContainer: {
        marginTop: 4,
        maxWidth: 30,
        margin: 'auto',
        position: 'fixed',
        top: 100,
        right: 16
    },
    shareButton: {
        display: 'inline-block',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    spread: {
        fontSize: '0.8rem',
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: "space-evenly",
        minWidth: 200,
        margin: 'auto',
    },

    icon: {
        height: '15px',
        width: '15px',
        marginLeft: 4
    }
});

class Install extends Component {
    render() {
        const { classes } = this.props;

        const val = is.firefox() ? 'Firefox' : 'Chrome';

        return (<div>
            <Grid container spacing={16} className={classes.container}>
                {this.props.clientType !== "extension" &&
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography variant="subheading" component="div">
                            {this.props.translate('home.install.disclaimer')}
                        </Typography>
                    </Grid>}

                {this.props.clientType !== "extension" &&
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>

                        <div className={classes.buttonDiv}>
                            <Button
                                style={{ color: colors.default, padding: '16px 24px' }}
                                classes={{ label: classes.label }}
                                variant='contained'
                                color="primary"
                                target="_blank"
                                href={`https://bit.ly/metada${val}`}
                                size="large"
                            >
                                {this.props.translate(`home.install.install${val}`)}
                                &nbsp;
                                {is.firefox() ? <FirefoxIcon className={classes.icon} /> : <ChromeIcon className={classes.icon} />}
                                &nbsp;
                                <OpenInNew className={classes.icon} />
                            </Button>
                        </div>
                        <br />

                    </Grid>}
            </Grid>
            <br/>
            {this.props.translate('home.install.comeHelp')} <Link to="/contribute">{this.props.translate('home.install.comeHelpLink')}</Link>
        </div>
        )
    }
}

export default withStyles(styles)(Install);