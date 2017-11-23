import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class CreateGup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: true, //checks if the form is ready to submit = all fields are filled in
            open: false, //dialog opened/closed

            //keeping input values in state
            region: '',
            country: '',
            bu: '',
            gup: '',
            site: '',
            location: '',
            contact: '',
            bandwidth: '',
            pcs: ''
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDataSubmit = this.handleDataSubmit.bind(this);
        this.isFormFilled = this.isFormFilled.bind(this);
    }


    /**
     * handling opening/closing of dialog
     */
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }


    /**
     * on input's change save data into state
     * callback = checks if the form is ready to submit
     */
    onChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => { this.isFormFilled() });
    }



    /**
     * bind the inputs saved in state into URL params
     * request HTTP post method to save data into DB
     */
    handleDataSubmit() {
        const POSTURL = `/gups/create?region=${this.state.region}&country=${this.state.country}&bu=${this.state.bu}
        &gup=${this.state.gup}&site=${this.state.site}&location=${this.state.location}&contact=${this.state.contact}
        &bandwidth=${this.state.bandwidth}&pcs=${this.state.pcs}`;
        fetch(POSTURL, {
            method: 'post'
        });
        this.setState({
            open: false
        });
    }


    /**
     * check if the form is filled
     * TBD - regexp
     */
    isFormFilled() {
        if (this.state.region !== '' &&
            this.state.country !== '' &&
            this.state.bu !== '' &&
            this.state.gup !== '' &&
            this.state.site !== '' &&
            this.state.location !== '' &&
            this.state.contact !== '' &&
            this.state.bandwidth !== '' &&
            this.state.pcs !== '') { this.setState({ submit: false }) }
        else { this.setState({ submit: true }) }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Save"
                onClick={this.handleDataSubmit}
                disabled={this.state.submit}
            />
        ]
        return (
            <div>
                <IconButton
                    iconClassName='material-icons'
                    iconStyle={{
                        color: '#ffffff'
                    }}
                    tooltip="Add new GUP"
                    onClick={this.handleOpen}
                >
                    add
                </IconButton>
                <Dialog
                    title="Add new GUP"
                    actions={actions}
                    open={this.state.open}
                    modal={false}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={true}
                >
                    <ListGroup

                    >
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="AMIS, APIS, EEMEA, EMEA"
                                floatingLabelText="Region"
                                fullWidth={true}
                                onChange={this.onChange}
                                value={this.state.region}
                                name="region"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specify country"
                                floatingLabelText="Country"
                                fullWidth={true}
                                value={this.state.country}
                                onChange={this.onChange}
                                name="country"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specify bussiness unit"
                                floatingLabelText="Bussiness unit"
                                fullWidth={true}
                                value={this.state.bu}
                                onChange={this.onChange}
                                name="bu"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specif GUP's name"
                                floatingLabelText="GUP"
                                fullWidth={true}
                                value={this.state.gup}
                                onChange={this.onChange}
                                name="gup"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specify GUP's site"
                                floatingLabelText="Site"
                                fullWidth={true}
                                value={this.state.site}
                                onChange={this.onChange}
                                name="site"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specify GUP's location"
                                floatingLabelText="Location"
                                fullWidth={true}
                                value={this.state.location}
                                onChange={this.onChange}
                                name="location"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specify responsible's person email"
                                floatingLabelText="Contact"
                                fullWidth={true}
                                value={this.state.contact}
                                onChange={this.onChange}
                                name="contact"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specify bandwidth"
                                floatingLabelText="Bandwidth"
                                fullWidth={true}
                                value={this.state.bandwidth}
                                onChange={this.onChange}
                                name="bandwidth"
                            />
                        </ListGroupItem>
                        <ListGroupItem
                            style={{ border: 'none' }}>
                            <TextField
                                hintText="Please specify number of computer reporting to GUP in given site"
                                floatingLabelText="# of PCS"
                                fullWidth={true}
                                value={this.state.pcs}
                                onChange={this.onChange}
                                name="pcs"
                            />
                        </ListGroupItem>
                    </ListGroup>
                </Dialog>
            </div>
        )
    }
}

export default CreateGup;