import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';

import NavigationHelp from './NavigationHelp';
import LegendHelp from './LegendHelp';

import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';


function getSteps() {
    return ['Navigation', 'Légende'];
}

function Transition(props) {
    return <Slide direction="down" {...props} />;
}


const styles = theme => ({
    help: {
        maxWidth: 400,
        margin: 'auto'
    },
    actions: {
        paddingTop: 0,
        textAlign: "center",
        marginTop: '-8px',
        marginBottom: '32px',
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
    container: {
        position: 'relative'
    },
    click: {
        'color': 'green'
    },

    divContainer: {
        position: "absolute",
        top: theme.spacing.unit * 3 * 3,
        right: 32,
        pointerEvents: "none",
        maxWidth: "70%",
        zIndex: 200
    },
    mobileDivContainer: {
        position: "absolute",
        top: theme.spacing.unit * 3 * 5,
        left: "50%",
        transform: "translate(-50%)",
        width: "85%",
        zIndex: 200
    }
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

    }


    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.show.help && this.props.show.help) {
            this.setState({
                activeStep: 0
            })
        }
    }

    render() {
        const { classes, isRehydrated, show, clientType, translate } = this.props;
        const open = isRehydrated && show.help;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div className={clientType === "mobile" ? classes.mobileDivContainer : classes.divContainer}>
                <div className={classes.container}>
                    <Dialog
                        className={classes.help}
                        open={open}
                        TransitionComponent={Transition}
                        fullScreen={window.innerWidth < 650}
                    >
                        <ClickAwayListener classeName={classes.click} onClickAway={this.close}>
                            <div>
                                <DialogContent style={{ paddingBottom: 8 }}>

                                    <Typography className={classes.title} color="textSecondary">
                                        {translate('graph.helpCard.title')}
                                    </Typography>

                                    {activeStep === 0 ?
                                        < NavigationHelp translate={translate} />
                                        :
                                        <LegendHelp translate={translate} />
                                    }

                                </DialogContent>
                                <DialogActions className={classes.actions}>
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
                                            {activeStep === 1 ?
                                                <Button variant='contained' color="primary" onClick={this.close} size="large">OK</Button>
                                                :
                                                <Button variant='contained' color="primary" onClick={this.handleStep(1)} size="large">></Button>
                                            }
                                        </div>


                                    </div>
                                </DialogActions>
                            </div>
                        </ClickAwayListener>
                    </Dialog>
                </div>
            </div>
        );
    }
}

HelpCard.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    isRehydrated: PropTypes.bool.isRequired,
    show: PropTypes.object.isRequired,
    stopHelp: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(withMobileDialog()(HelpCard));