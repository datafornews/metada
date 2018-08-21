import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const styles = theme => (
    {
        container: {
            // backgroundColor: 'white',
            display: 'flex',
            position: 'absolute',
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: 10000
        },
        buttons: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        },
        desc: {
            fontSize: '0.7rem',
        },
        graph: {
            marginLeft: 16,
            fontSize: '0.7rem'
        },
        entity: {
            minWidth: 200,
            textAlign: "center",
            marginBottom: 4
        },
        wrapper: {
            display: 'inline-block',
            margin: 'auto'
        }
    }
);

const colors = {
    m: '#3f51b5',
    c: 'rgb(187, 45, 45)',
    i: 'rgb(1, 41, 71)'
}

class Controls extends Component {
    render() {
        const selectedIsRepresented = parseInt(this.props.infoBox.data, 10) === parseInt(this.props.match.params.entityId, 10);
        const entity = this.props.data.entities.ids[this.props.infoBox.data];
        const { classes } = this.props
        return (
            <div className={classes.container} style={{ marginTop: this.props.clientType === 'mobile' ? 56 : 8 }}>
                <div className={classes.wrapper}>

                    <div className={classes.entity} style={{
                        color: selectedIsRepresented ? colors[entity.category] : 'green'
                    }}>
                        {entity && entity.name}
                    </div>
                    <div className={classes.buttons}>
                        <Button color="primary" className={classes.desc} size="large" variant="outlined" onClick={this.props.toggleDrawer}>Description</Button>
                        {selectedIsRepresented ? '' : <Button color="primary" className={classes.graph} size="large" variant="outlined">Voir le Graph</Button>}
                    </div>
                </div>
            </div >
        )
    }
}

export default withStyles(styles)(Controls);