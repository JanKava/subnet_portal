import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

class OnDeleteGup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false, //dialog open 
            id: this.props,
            gup: this.props.value1,
            site: this.props.value2
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    /**
     * handling opening/closing of dialog
     */
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };


    /**
     * handling GUP deletion
     * sending http DELETE request to server with params bound to URL
     * setState open:false to closed the dialog after deletion
     */
    handleDelete() {
        const DELETEURL = `/gups/delete/${this.state.id.value}`;
        fetch(DELETEURL, {
            method: 'delete'
        });
        this.setState({
            open: false
        });
    }


    render() {
        const actions = [
            <FlatButton
                label="No"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onClick={() => this.handleDelete()}
            />,
        ];
        const title = "Delete " + this.state.gup + "?"

        return (
            <div>
                <IconButton
                    iconClassName="material-icons"
                    tooltip="delete"
                    onClick={this.handleOpen}
                >
                    delete
                </IconButton>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    Are you sure to delete {this.state.gup} in site {this.state.site} ?
                </Dialog>
            </div>
        )
    }
}

export default OnDeleteGup;
