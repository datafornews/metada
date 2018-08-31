import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import classNames from 'classnames';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';

import NavigationHelp from './NavigationHelp';
import LegendHelp from './LegendHelp';

function getSteps() {
    return ['Navigation', 'Légende'];
}


const styles = theme => ({
    card: {
        maxWidth: 375,
        pointerEvents: "all",
        marginBottom: 16,
        zIndex: 201
    },
    noClick: {
        pointerEvents: "none"
    },
    actions: {
        paddingTop: 0,
        textAlign: "center"
    },
    title: {
        marginBottom: 16,
        fontSize: 18,
    },
    root: {
        width: '90%',
        margin: 'auto'
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

class HelpCard extends Component {

    state = {
        activeStep: 0,
        completed: new Set(),
    };

    totalSteps = () => {
        return getSteps().length;
    };

    componentDidMount() {
        // const height = this.divElement.clientHeight;
        // this.setState({ height });
    }


    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    skippedSteps() {
        return 0;
    }

    isStepSkipped(step) {
        return false;
    }

    isStepComplete(step) {
        return this.state.completed.has(step);
    }

    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }


    close = () => {

        this.props.stopHelp();

        this.props.clientType !== "mobile" && setTimeout(this.props.reRenderGraph, 300);

    }


    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.show.help && this.props.show.help) {
            this.setState({
                activeStep: 0
            })
        }
    }


    render() {
        const { classes } = this.props;
        const grow = this.props.isRehydrated && this.props.show.help;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <Slide direction="down" in={grow} mountOnEnter unmountOnExit>
                <Card
                    className={classNames(classes.card, !grow && classes.noClick)}
                    elevation={24}
                >
                    <CardContent style={{ paddingBottom: 0, minHeight: 320 }}>

                        <Typography className={classes.title} color="textSecondary">
                            {this.props.translate('graph.helpCard.title')}
                        </Typography>

                        {activeStep === 0 ?
                            < NavigationHelp translate={this.props.translate} />
                            :
                            <LegendHelp translate={this.props.translate} />
                        }


                    </CardContent>
                    <CardActions className={classes.actions}>
                        <div className={classes.root}>
                            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label} >
                                            <StepButton
                                                onClick={this.handleStep(index)}
                                                completed={this.isStepComplete(index)}
                                            >
                                                {label}
                                            </StepButton>
                                        </Step>
                                    );
                                })}
                            </Stepper>

                            <div style={{ minHeight: 40 }}>
                                {activeStep === 1 && <Button onClick={this.close} size="large">OK</Button>}
                            </div>


                        </div>
                    </CardActions>
                </Card>
            </Slide >
        );
    }
}


HelpCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpCard);