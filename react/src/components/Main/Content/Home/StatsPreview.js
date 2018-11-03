import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StatsIcon from 'react-icons/lib/io/stats-bars';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {

    },
    card: {
        backgroundColor: 'rgba(250,250,250, 0.8)',
        maxWidth: 200
    },
    root: {
        padding: theme.spacing.unit * 3
    },
    icon: {
        height: 40,
        width: 40,
        color: theme.palette.secondary.main,
    },
    statsButton: {
        fontSize: "0.6rem"
    },
    actions: {
        justifyContent: "center",
        fontSize: "0.7rem"
    },
    content: {
        paddingBottom: 0
    },
    iconGridItem: {
        display: "flex",
        "justify-content": "center",
        "align-items": "center"
    }
});

class StatsPreview extends Component {
    render() {
        const { classes, history } = this.props;
        return (
            <div className={classes.container}>
                <Card className={classes.card}>

                    <CardContent className={classes.content}>
                        <Grid container>
                            <Grid xs={8}>
                                <Typography variant="subtitle" color="textSecondary">
                                    Quels médias lisez-vous?
                                </Typography>
                                {/* <br />
                                <Typography variant="subtitle" color="textSecondary">
                                    Qui contrôle les médias que vous lisez?
                                </Typography> */}
                            </Grid>
                            <Grid xs={4} className={classes.iconGridItem}>
                                <StatsIcon className={classes.icon} />
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions className={classes.actions}>
                        <Button
                            variant='outlined'
                            color="secondary"
                            className={classes.statsButton}
                            size='small'
                            onClick={() => { history.push('/stats') }}
                        >
                            Voir vos statistiques
                        </Button>
                    </CardActions>

                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(StatsPreview);