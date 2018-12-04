import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HomePaper from '../../Paper/HomePaper'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {

    },
    headline: {
        fontWeight: 300,
        marginBottom: theme.spacing.unit * 2
    },
    iframe: {
        width: '100%',
        height: '970px'
    },
    li: {
        marginBottom: theme.spacing.unit * 1.5
    },
    strong: {
        fontWeight: "bolder",
    },
    iframeContainer: {
        maxWidth: 750,
        margin: 'auto'
    },
    sep:{
        width: "85%",
        margin: "20px auto",
        borderBottom: "1px solid grey"
    },
    italic:{
        fontStyle: 'italic'
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
                        <Typography variant="body1" component='div'>
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
                        <Typography variant="body1" component='div'>
                            L'Extension Chrome et le site metada.org sont construits à partir du même code: React + Redux en front, Flask sur Heroku en back. Les repos sont là:
                            <ul>
                                <li><a href="https://github.com/datafornews/metada" rel="noopener noreferrer" target="_blank">Front-End (metada)</a></li>
                                <li><a href="https://github.com/datafornews/metada-back" rel="noopener noreferrer" target="_blank">Back-End (metada-back)</a></li>
                            </ul>
                        </Typography>

                        <div className={classes.sep}></div>

                        <Typography className={classes.headline} variant="body1" color="secondary">
                            Metada est un projet <a href="https://datafor.news"><strong className={classes.strong}>Data For News</strong></a>, la communauté tech et médias au service de projets ouverts pour produire plus d'infos sur l'infos.
                            <br/>
                            <br/>
                            Plus d'info sur comment contribuer <a href="https://github.com/datafornews/metada/contribute.md"> à cette adresse</a>
                            <br/>
                            <br/>
                            <span className={classes.italic}>[translation on the way]</span>
                        </Typography>

                        {/* <Typography className={classes.headline} variant="headline" color="secondary">
                            Je suis journaliste
                        </Typography>
                        <Typography className={classes.headline} variant="headline" color="secondary">
                            Je veux m'impliquer
                        </Typography> */}
                    </div>
                } />
                <div className={classes.iframeContainer}>
                    <iframe className={classes.iframe}
                        src="https://docs.google.com/forms/d/e/1FAIpQLSf3J6dXZd3iLbyu2n9V7vJksutiZmG1GlBKq8ZhN99M4rsUhw/viewform?embedded=true"
                        title="google-form"
                        width="100%"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        scrolling="yes"
                    >
                        Chargement en cours...
                    </iframe>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ContributePaper);