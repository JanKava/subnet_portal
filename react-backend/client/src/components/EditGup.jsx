import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const styles = {
    listItemStyle: { border: 'none' }
}

class EditGup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, //dialog open

            //data from parent passed via props
            id: this.props,
            region: this.props.region,
            country: this.props.country,
            bu: this.props.bu,
            gup: this.props.gup,
            site: this.props.site,
            location: this.props.location,
            contact: this.props.contact,
            bandwidth: this.props.bandwidth,
            pcs: this.props.pcs,

        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    /**
     * handling opening/closing of dialog window
     */
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };


    onChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };



    /**
     * fetch from web server, PUT method to update specified GUP entry in db
     */
    handleUpdate() {
        const UPDATEURL = `/gups/${this.state.id.value}`;

        const data = {
            region: this.state.region,
            country: this.state.country,
            bu: this.state.bu,
            gup: this.state.gup,
            site: this.state.site,
            location: this.state.location,
            contact: this.state.contact,
            bandwidth: this.state.bandwidth,
            pcs: this.state.pcs
        };

        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");


        fetch(UPDATEURL, {
            method: 'put',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: formBody
        });
        
        this.setState({ open: false });

    };


    render() {
        const actions = [
            <FlatButton
                label="Exit"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleUpdate}
            />,
        ];

        return (
            <div>
                <div>
                    <IconButton
                        iconClassName="material-icons"
                        tooltip="edit/show more info"
                        onClick={this.handleOpen}
                    >
                        edit
                </IconButton>
                </div>
                {this.state.open ?
                    <div>
                            <Dialog
                                title={this.state.gup}
                                actions={actions}
                                modal={true}
                                open={this.state.open}
                                key={this.state.id}
                                autoDetectWindowHeight={true}
                                autoScrollBodyContent={true}
                                repositionOnUpdate={true}
                            >

                                <ListGroup >
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.region}
                                            floatingLabelText="Region"
                                            fullWidth={true}
                                            name="region"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.country}
                                            floatingLabelText="Country"
                                            fullWidth={true}
                                            name="country"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.bu}
                                            floatingLabelText="Bussiness unit"
                                            fullWidth={true}
                                            name="bu"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.gup}
                                            floatingLabelText="GUP"
                                            fullWidth={true}
                                            name="gup"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.site}
                                            floatingLabelText="Site"
                                            fullWidth={true}
                                            name="site"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.location}
                                            floatingLabelText="Location"
                                            fullWidth={true}
                                            name="location"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.contact}
                                            floatingLabelText="Contact"
                                            fullWidth={true}
                                            name="contact"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.bandwidth}
                                            floatingLabelText="Bandwidth"
                                            fullWidth={true}
                                            name="bandwidth"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem
                                        style={styles.listItemStyle} >
                                        <TextField
                                            defaultValue={this.state.pcs}
                                            floatingLabelText="# of PCs"
                                            fullWidth={true}
                                            name="pcs"
                                            onChange={this.onChange}
                                        />
                                    </ListGroupItem>
                                </ListGroup>
                            </Dialog>
                    </div> : <div></div>}
            </div>
        )
    }
}

export default EditGup;
