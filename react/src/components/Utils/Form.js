import React, { Component } from 'react'
import { Form } from 'react-redux-form';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';


const buttonDivStyle = {
    textAlign: 'right'
}

export default class EditEntityForm extends Component {

    state = {
        submitError: '',
        pending: false
    }

    makePending = () => {
        this.setState({
            pending: true
        })
    }

    makeNotPending = () => {
        this.setState({
            pending: false
        })
    }

    handleClick = (event) => {
        this.makePending();
        // this.props.rrfSubmit(this.props.model)
        if (this.props.form.$form.valid) {
            this.props.onSubmit(this, this.props.form)
            event.preventDefault();
        }
    }

    handleChange = (model) => {
        if (this.state.pending) {
            this.makeNotPending();
        }
        this.props.onChange(model)
    }

    render() {
        const { form, buttonText, model, errorsLocation, onSubmit, formProps, style } = this.props;

        return (
            <Form
                style={style}
                model={model}
                onSubmit={onSubmit}
                onChange={this.handleChange}
                {...formProps}
            >

                {this.props.fields}

                <br /><br />
                <div style={buttonDivStyle}>
                    {this.state.pending ?
                        <CircularProgress />
                        :
                        (<div>
                            {this.props.reset}
                            < Button type="submit" color="primary" disabled={!form.$form.valid} onClick={this.handleClick}>
                                {buttonText}
                            </Button>
                        </div>)
                    }
                    <br /><br />
                </div>

                {this.state.submitError && this.props.translate(errorsLocation + '.' + this.state.submitError)}
            </Form >
        );
    }
}
