import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Radio from 'material-ui/Radio';
import { Control } from 'react-redux-form';
import { isURL } from 'validator';
import Grid from 'material-ui/Grid';
import Form from '../../../../Utils/Form'
import TextInput from '../../../../Utils/TextInput'
import SelectInput from '../../../../Utils/SelectInput'
import EntitySelect from '../../../../Utils/EntitySelectMaterial'
import Help from '../../../../Utils/HelpIcon';


const selectStyle = {
    borderWidth: '1px',
    borderRadius: '0px',
    zIndex: 999,
    margin: 'auto',
    width: '95%',
    textAlign: 'center'
};

const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    overflow: 'visible'
};

class EditEntityForm extends Component {

    state = {
        clearParent: 0,
        clearChild: 0,
        radio: "modify",
        showForm: false
    }

    resetCreate = () => {
        this.props.rrfReset('editEntityForm.entity')
        this.setState({
            clearParent: this.state.clearParent + 1,
            clearChild: this.state.clearChild + 1,
            showForm: true
        });
    }

    resetModify = () => {
        this.props.rrfReset('editEntityForm.entity')
        this.setState({
            clearParent: this.state.clearParent + 1,
            clearChild: this.state.clearChild + 1,
            showForm: false
        });
    }

    reset = () => {
        this.state.radio === 'create' ? this.resetCreate() : this.resetModify()
    }

    componentWillUnmount() {
        this.reset();
    }


    componentWillMount() {
        if (this.props.entityId) {
            const values = { id: this.props.entityId };
            this.handleEntityChange(values)
        }
    }


    handleSubmit = (component, form) => {
        form && console.log('Entity submitted: ', form.entity);
        setTimeout(() => { component && component.makeNotPending() }, 1000)
    }

    handleChange = (values) => {
        // console.log(values)
    }

    handleRadioChange = (event) => {
        this.setState({
            radio: event.target.value,
            showForm: this.props.editEntityForm.forms.entity.selectedEntity.value || event.target.value === "create"
        })
        event.target.value === "create" && this.resetCreate();
    }

    handleEntityChange = (values, form) => {
        if (values && values.id) {
            const entity = this.props.data.entities.ids[values.id];
            console.log(entity)
            if (entity) {
                this.props.rrfChange('editEntityForm.entity.name', entity.name);
                this.props.rrfChange('editEntityForm.entity.long_name', entity.long_name);
                this.props.rrfChange('editEntityForm.entity.other_groups', entity.other_groups);
                this.props.rrfChange('editEntityForm.entity.wiki_link', entity.wiki_link);
                this.props.rrfChange('editEntityForm.entity.website', entity.website);
                this.props.rrfChange('editEntityForm.entity.category', entity.category);
                this.props.rrfChange('editEntityForm.entity.selectedEntity', entity.category);
            }
            this.setState({
                showForm: true
            })
        }
    }

    render() {
        const _tr = this.props.translate;
        const m = _tr("contribute.editEntity.options.m");
        const i = _tr("contribute.editEntity.options.i");
        const c = _tr("contribute.editEntity.options.c");
        let options = {};
        options[m] = "m";
        options[i] = "i";
        options[c] = "c";

        let selectEntityInivialValue;
        if (this.props.editEntityForm.entity.name) {
            selectEntityInivialValue = this.props.editEntityForm.entity.name;
        } else if (this.props.entityId) {
            selectEntityInivialValue = this.props.data.entities.ids[this.props.entityId].name;
        } else {
            selectEntityInivialValue = ''
        }

        const choice = (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {_tr("contribute.editEntity.label.choice.select")}
            <Radio
                checked={this.state.radio === "modify"}
                onChange={this.handleRadioChange}
                value="modify"
            />
            <Radio
                checked={this.state.radio === "create"}
                onChange={this.handleRadioChange}
                value="create"
            />{_tr("contribute.editEntity.label.choice.create")}
        </div>)

        const selectEntity = <Control.text
            model=".selectedEntity"
            validators={{
                required: (entity) => { return (entity && entity.name) || this.state.radio === "create" },
            }}
            validateOn="change"
            component={EntitySelect}
            controlProps={{
                placeholder: _tr("contribute.editEntity.label.choice.select"),
                autofocus: true,
                ...this.props,
                clear: this.state.clearParent,
                style: selectStyle,
                initialValue: selectEntityInivialValue,
                data: this.props.data
            }}
            onChange={this.handleEntityChange}
        />

        const name = <Control.text
            model=".name"
            validators={{
                required: (val) => { return val && val.length },
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: _tr("contribute.editEntity.label.name"),
                id: 'name',
                style: { width: '95%' },
                endAdornment: <Help content={_tr('contribute.editEntity.help.name')} id="name" forceOpen />
            }} />;

        const longName = <Control.text
            model=".long_name"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: _tr("contribute.editEntity.label.long_name"),
                id: 'long_name',
                style: { width: '95%' },
                endAdornment: <Help content={_tr('contribute.editEntity.help.long_name')} id="long_name" forceOpen />
            }} />;

        const category = <Control.text
            model=".category"
            validateOn="change"
            component={SelectInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: _tr("contribute.editEntity.label.category"),
                id: 'category',
                style: { width: '95%' },
                options: options,
                endAdornment: <Help
                    tooltipStyle={{ marginBottom: '-2px' }}
                    iconProps={{ style: { verticalAlign: 'super' } }}
                    content={_tr('contribute.editEntity.help.category')}
                    id="category"
                    forceOpen
                />
            }} />;

        const otherGroups = <Control.text
            model=".other_groups"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: _tr("contribute.editEntity.label.other_groups"),
                id: 'other_groups',
                style: { width: '95%' },
                endAdornment: <Help content={_tr('contribute.editEntity.help.other_groups')} id="other_groups" forceOpen />
            }} />;

        const website = <Control.text
            validators={{
                emptyOrUrl: (val) => {
                    return val ? isURL(val) : true
                }
            }}
            model=".website"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: _tr("contribute.editEntity.label.website"),
                id: 'website',
                style: { width: '95%' },
                endAdornment: <Help content={_tr('contribute.editEntity.help.website')} id="website" forceOpen />
            }} />;

        const wikiLink = <Control.text
            validators={{
                emptyOrUrl: (val) => {
                    return val ? isURL(val) && val.indexOf('wikipedia.org') > -1 : true
                }
            }}
            model=".wiki_link"
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: _tr("contribute.editEntity.label.wiki_link"),
                id: 'wiki_link',
                style: { width: '95%' },
                endAdornment: <Help content={_tr('contribute.editEntity.help.wiki_link')} id="wiki_link" forceOpen />
            }} />;


        const source = <Control.text
            model=".source"
            validators={{
                required: (val) => { return val && val.length },
                long: (val) => { return val && val.length && val.length > 50 }
            }}
            validateOn="change"
            component={TextInput}
            controlProps={{
                model: this.props.editEntityForm.entity,
                label: _tr("contribute.editEntity.label.source"),
                id: 'source',
                multiline: true,
                rowsMax: 6,
                style: { width: '95%' },
                endAdornment: <Help content={_tr('contribute.editEntity.help.source')} id="source" forceOpen />
            }}
        />;

        const grid = (
            <div style={gridStyle} >
                <Grid container spacing={16}>
                    <Grid item xs={12}> {choice} </Grid>
                    {this.state.radio === "modify" && <Grid container spacing={16}>
                        <Grid item xs={12} sm={1} md={3} />
                        <Grid item xs={12} sm={10} md={6} style={{ marginBottom: '8px' }}> {selectEntity} </Grid>
                        <Grid item xs={12} sm={1} md={3} />
                    </Grid>}
                    {this.state.showForm && <Grid item xs={12} sm={6} lg={4}> {name} </Grid>}
                    {this.state.showForm && <Grid item xs={12} sm={6} lg={4}> {category} </Grid>}
                    {this.state.showForm && <Grid item xs={12} sm={6} lg={4}> {longName} </Grid>}
                    {this.state.showForm && <Grid item xs={12} sm={6} lg={4}> {website} </Grid>}
                    {this.state.showForm && <Grid item xs={12} sm={6} lg={4}> {otherGroups} </Grid>}
                    {this.state.showForm && <Grid item xs={12} sm={6} lg={4}> {wikiLink} </Grid>}
                    <br />
                    {this.state.showForm && <Grid item xs={12}> {source} </Grid>}
                </Grid>
            </div >
        )

        return <Form
            {...this.props}
            form={this.props.editEntityForm.forms}
            buttonText={'Entity Submit Text'}
            model={'editEntityForm.entity'}
            errorsLocation={'errors'}
            onSubmit={this.handleSubmit}
            fields={grid}
            reset={<Button onClick={this.reset}>Reset Form</Button>}
            onChange={this.handleChange}
        />;
    }
}

export default EditEntityForm;
