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
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import NextIcon from 'react-icons/lib/md/skip-next';
import withWidth from '@material-ui/core/withWidth';

function getSteps() {
    return ['Navigation', 'Légende'];
}

function Transition(props) {
    return <Slide direction="down" {...props}/>;
}


const styles = theme => ({
    actions: {
        marginBottom: '32px',
        marginTop: '-8px',
        paddingTop: 0,
        textAlign: "center"
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    button: {
        marginRight: theme.spacing(1)
    },
    click: {
        'color': 'green'
    },
    completed: {
        display: 'inline-block'
    },
    container: {
        position: 'relative'
    },
    divContainer: {
        maxWidth: "70%",
        pointerEvents: "none",
        position: "absolute",
        right: 32,
        top: theme.spacing(3 * 3),
        zIndex: 200
    },
    help: {
        margin: 'auto'
    },
    instructions: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    mobileDivContainer: {
        left: "50%",
        position: "absolute",
        top: theme.spacing(3 * 5),
        transform: "translate(-50%)",
        width: "85%",
        zIndex: 200
    },
    nextIcon: {
        height: 24,
        width: 24
    },
    root: {
        margin: 'auto',
        width: '90%'
    },
    title: {
        fontSize: 26,
        marginBottom: 16
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
        const { classes, isRehydrated, show, clientType, translate, width } = this.props;
        const open = isRehydrated && show.help;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div className={clientType === "mobile" ? classes.mobileDivContainer : classes.divContainer}>
                <div className={classes.container}>
                    <Dialog
                        fullScreen={width === "xs"}
                        fullWidth
                        className={classes.help}
                        open={open}
                        scroll="paper"
                        TransitionComponent={Transition}
                    >
                        <ClickAwayListener onClickAway={this.close}>
                            <div>

                                <DialogTitle style={{ padding: "12px 48px" }}>
                                    <Typography className={classes.title} color="textSecondary">
                                        {translate('graph.helpCard.title')}
                                    </Typography>
                                </DialogTitle>

                                <DialogContent style={{ padding: "12px 48px", minHeight: 250 }}>

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
                                                <Button variant='contained' color="primary" onClick={this.handleStep(1)} size="large">
                                                    <NextIcon className={classes.nextIcon} />
                                                </Button>
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

export default withWidth()(
    withStyles(styles)(
        withMobileDialog({ breakpoint: 'xs' })(
            HelpCard
        )
    )
);