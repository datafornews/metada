import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import { colors } from '../../../../theme/metadaTheme';
import OpenInNew from '@material-ui/icons/OpenInNew';
import is from 'is_js';
import ChromeIcon from "react-icons/lib/io/social-chrome";
import FirefoxIcon from "react-icons/lib/fa/firefox";

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
        minWidth: 150
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

        return (
            <Grid container spacing={16} className={classes.container}>
                {this.props.clientType !== "extension" &&
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography variant="subheading" component="div">
                            {this.props.translate('home.install.disclaimer')}
                        </Typography>
                    </Grid>}

                {this.props.clientType !== "extension" &&
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>

                        <Grid
                            container
                            spacing={16}
                            alignItems={'center'}
                            justify={'center'}
                        >
                            <Grid item xs={7} sm={4} >
                                <div className={classes.buttonDiv}>
                                    <Button
                                        style={{ color: colors.default, maxWidth: '170px' }}
                                        classes={{ label: classes.label }}
                                        variant='contained'
                                        color="primary"
                                        target="_blank"
                                        href={`https://bit.ly/metada${val}`}
                                    >
                                        {this.props.translate(`home.install.install${val}`)}
                                        {is.firefox() ? <FirefoxIcon className={classes.icon} /> : <ChromeIcon className={classes.icon} />}
                                        <OpenInNew className={classes.icon} />
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>}
            </Grid>
        )
    }
}

export default withStyles(styles)(Install);