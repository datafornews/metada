import React, { Component } from 'react'
import Grid from 'material-ui/Grid';
import { Control } from 'react-redux-form';
import Button from 'material-ui/Button';
import Form from '../../../../Utils/Form'
import TextInput from '../../../../Utils/TextInput'
import EntitySelect from '../../../../Utils/EntitySelectMaterial'
import { isInRange, isPositiveNumber } from "../../../../../utils/formValidators";


const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '100%'
};


class EditEdgeForm extends Component {

    state = {
        clearParent: 0,
        clearChild: 0
    }

    reset = () => {
        this.props.rrfReset('editEdgeForm.edge.parent')
        this.props.rrfReset('editEdgeForm.edge.child')
        this.props.rrfReset('editEdgeForm.edge.value')
        this.props.rrfReset('editEdgeForm.edge.special')
        this.props.rrfReset('editEdgeForm.edge.source')
        this.setState({
            clearParent: this.state.clearParent + 1,
            clearChild: this.state.clearChild + 1
        });
    }

    componentWillUnmount() {
        this.reset();
    }


    handleSubmit = (component, form) => {
        form && console.log('Edge submitted: ', form.edge);
        setTimeout(() => { component && component.makeNotPending() }, 1000)
    }

    handleChange = (values) => {
        // console.log(values)
    }

    render() {

        const _tr = this.props.translate;

        const parentEntity = <Control.text
            model=".parent"
            validators={{
                required: (val) => { return val && val.label },
            }}
            validateOn="change"
            component={EntitySelect}
            controlProps={{
                placeholder: _tr("contribute.editEntity.label.choice.select"),
                autofocus: true,
                ...this.props,
                clear: this.state.clearParent,
                style: { width: '95%', display: 'inline-block' },
                initialValue: this.props.editEdgeForm.edge.parent ? this.props.editEdgeForm.edge.parent.id : '',
                data: this.props.data
            }}
            onChange={this.handleEntityChange}
        />

        const childEntity = <Control.text
            model=".child"
            validators={{
                required: (val) => { return val && val.label },
            }}
            validateOn="change"
            component={EntitySelect}
            controlProps={{
                placeholder: _tr("contribute.editEntity.label.choice.select"),
                autofocus: true,
                ...this.props,
                clear: this.state.clearChild,
                style: { width: '95%', display: 'inline-block' },
                initialValue: this.props.editEdgeForm.edge.child ? this.props.editEdgeForm.edge.parent.id : '',
                data: this.props.data
            }}
            onChange={this.handleEntityChange}
        />


        const value = <Control.text
            model=".value"
            validators={{
                required: (val) => { return val !== null && val !== undefined },
                isPositiveNumber,
                isInRange
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEdgeForm.edge,
                label: "Value",
                id: 'value',
                style: { width: '95%' }
            }} />;

        const special = <Control.text
            model=".special"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEdgeForm.edge,
                label: "Special",
                id: 'special',
                style: { width: '95%' }
            }} />;


        const source = <Control.text
            model=".source"
            validators={{
                required: (val) => { return val && val.length },
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEdgeForm.edge,
                label: "Source",
                id: 'source',
                multiline: true,
                rowsMax: 3,
                style: { width: '100%' }
            }} />;


        const grid = (
            <div style={gridStyle}>
                <Grid container spacing={16}>
                    <Grid item xs={12} md={6} > {parentEntity} </Grid>
                    <Grid item xs={12} md={6} > {childEntity} </Grid>
                    <Grid item xs={12} md={6} lg={4}> {value} </Grid>
                    <Grid item xs={12} md={6} lg={4}> {special} </Grid>
                    <br />
                    <Grid item xs={12}> {source} </Grid>
                </Grid>
            </div >
        )


        return <Form
            {...this.props}
            form={this.props.editEdgeForm.forms}
            buttonText={'Edge Submit Text'}
            model={'editEdgeForm.edge'}
            errorsLocation={'errors'}
            onSubmit={this.handleSubmit}
            fields={grid}
            reset={<Button onClick={this.reset}>Reset Form</Button>}
            onChange={this.handleChange}
        />;
    }
}

export default EditEdgeForm;
