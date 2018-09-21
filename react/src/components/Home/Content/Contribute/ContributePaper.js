import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HomePaper from '../../Paper/HomePaper'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {

    },
    headline: {
        fontWeight: 300,
        marginBottom: 16
    },
    iframe: {
        width: '100%',
        height: '970px'
    },
    li:{
        marginBottom: 12
    },
    strong: {
        fontWeight: "bolder",
    }
});

class ContributePaper extends Component {


    render() {
        const { classes, ...noClassesProps } = this.props;
        return (
            <div><HomePaper
                {...noClassesProps}
                toggle={this.props.toggleContribute}
                content={
                    <div>
                        <h1>{this.props.translate('home.contribute.title')}</h1>
                        <Typography className={classes.headline} variant="headline" color="secondary">
                            Je veux améliorer la base de données
                        </Typography>
                        <Typography variant="body1">
                            Vous trouverez ci-après un formulaire pour proposer une modification. Elle peut être de toute sorte:
                            <ul>
                                <li className={classes.li}>
                                    Un <span className={classes.strong} >lien</span> vers wikipédia ou un site web qui ne fonctionne pas, qui est faux ou qu'il faut ajouter
                                </li>
                                <li className={classes.li}>
                                    Un <span className={classes.strong} >nom</span> à mettre à jour (iTélé devient CNews), un acronyme à expliciter (RMC = Radio Monte Carlo) 
                                </li>
                                <li className={classes.li}>
                                    Une <span className={classes.strong} >évolution dans le graphe</span> (Le Progrès change de propriétaire, les parts de feu Pierre Bergé sont rachetées par M. Pigasse et X. Niel etc.)
                                </li>
                                <li className={classes.li}>
                                    Un <span className={classes.strong} >ajout</span> (notamment de médias indépendants) ou une <span className={classes.strong} >suppression</span> (une personne ou un média disparait, une entreprise revend toutes ses participations etc.)
                                </li>
                            </ul>
                        </Typography>

                        <Typography className={classes.headline} variant="headline" color="secondary">
                            Je suis développeur
                        </Typography>
                        <Typography variant="body1">
                            L'Extension Chrome et le site metada.org sont construits à partir du même code: React + Redux en front, Flask sur Heroku en back. Les repos sont là:
                            <ul>
                                <li><a href="https://github.com/vict0rsch/metada" target="_blank">Front-End (metada)</a></li>    
                                <li><a href="https://github.com/vict0rsch/metada-back" target="_blank">Back-End (metada-back)</a></li>    
                            </ul> 
                        </Typography>
                        
                        <Typography className={classes.headline} variant="headline" color="secondary">
                            Je suis journaliste
                        </Typography>
                        <Typography className={classes.headline} variant="headline" color="secondary">
                            Je veux m'impliquer
                        </Typography>
                    </div>
                } />
                <iframe className={classes.iframe} src="https://docs.google.com/forms/d/e/1FAIpQLSf3J6dXZd3iLbyu2n9V7vJksutiZmG1GlBKq8ZhN99M4rsUhw/viewform?embedded=true" width="100%" frameBorder="0" marginHeight="0" marginWidth="0">Chargement en cours...</iframe>
            </div>
        )
    }
}

export default withStyles(styles)(ContributePaper);