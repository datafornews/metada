import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '90%',
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

function getSteps() {
    return ['Navigation', 'Légende'];
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
    state = {
        activeStep: 0,
        completed: new Set(),
    };

    totalSteps = () => {
        return getSteps().length;
    };

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

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
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

                <div>
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                        >
                            Next
                        </Button>
                    </div>
                </div>

            </div>
        );
    }
}

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);