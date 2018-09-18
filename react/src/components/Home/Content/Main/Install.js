import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import { colors } from '../../../../theme/metadaTheme';
import OpenInNew from '@material-ui/icons/OpenInNew';

const styles = theme => ({
    container: {

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
        justifyContent: "space-evenly"
    },

    icon: {
        height: '15px',
        width: '15px',
        marginLeft: 4
    }
});

class Share extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.container}>
                {this.props.clientType !== "extension" &&
                    <Grid item xs={12} md={5} style={{ marginBottom: 8 }}>
                        <Typography variant="subheading" component="div">
                            Metada est avant tout une extension pour navigateur qui vous rappelle qui possède les médias que vous consultez!
                        </Typography>
                    </Grid>}

                {this.props.clientType !== "extension" &&
                    <Grid item xs={12} md={7}>

                        <Grid
                            container
                            spacing={16}
                            alignItems={'center'}
                            justify={'center'}
                        >
                            <Grid item xs={7} sm={4}>
                                <div className={classes.buttonDiv}>
                                    <Button
                                        style={{ color: colors.default, maxWidth: '170px' }}
                                        classes={{ label: classes.label }}
                                        variant='contained'
                                        color="primary"
                                        target="_blank"
                                        href="https://bit.ly/metadaChrome"
                                    >
                                        Installer sur Chrome
                                        <OpenInNew className={classes.icon} />
                                    </Button>
                                </div>
                            </Grid>

                            <Grid item xs={7} sm={4}>
                                <div className={classes.buttonDiv}>
                                    <Button
                                        style={{ color: colors.default, maxWidth: '170px' }}
                                        classes={{ label: classes.label }}
                                        variant='contained'
                                        color="primary"
                                        target="_blank"
                                        href="https://bit.ly/metadaFirefox">
                                        Installer sur Firefox
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

export default withStyles(styles)(Share);