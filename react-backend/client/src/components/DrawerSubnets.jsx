import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { green500, grey500 } from 'material-ui/styles/colors';

const styles = {
    appBarStyle: { backgroundColor: '#444444' },
    positioner: { marginLeft: '15px' },
    inputWidth: { width: '195px' },
    subnetStyle: {
        from: {
            float: 'left',
            marginLeft: '15px'
        },
        to: { marginLeft: '205px' }
    }

}

class DrawerSubnets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitDisabled: true, //check if the input is ready for submit
            open: false, //toggle drawer with subnets
            add: false, //toggle textfields for new subnet
            shouldRender: false,

            //save props given from parents into state
            id: this.props,
            gup: this.props.value1,
            site: this.props.value2,

            //keep data from input in state
            range_from: '',
            range_to: '',

            subnets: [], //keeping fetched data in state
        }

        /**
         * binding class methods into contructor
         */
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /**
     * handleToggle
     * anonymous function to handle drawer toggling
     */
    handleToggle = () => this.setState({
        open: !this.state.open,
        shouldRender: !this.state.shouldRender
    });


    /**
     * handleAdd
     * anonymous function to handle showing input fields for adding new subnet
     */
    handleAdd = () => this.setState({ add: !this.state.add });


    /**
     * handleSubmit()
     * handling posting data to db with HTTP POST request
     * binding data into url params
     * calling setState to clear and close the form
     */
    handleSubmit() {
        const POSTURL = `/subnets/create?range_from=${this.state.range_from}&range_to=${this.state.range_to}&for_gup_id=${this.state.id.value}`;
        fetch(POSTURL, {
            method: 'post'
        })
        this.setState({
            add: false,
            range_from: '',
            range_to: ''
        });
        this.componentDidMount();

    }


    handleDelete(id) {
        const DELETEURL = `subnets/delete/${id}`;
        fetch(DELETEURL, {
            method: 'delete'
        });
        this.componentDidMount();

    }


    /**
     * onChange(e)
     * anonymous function, on input's change save data into state
     * callback checks if the form is ready to submit
     */
    onChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => this.validateInput());
    }


    /**
     * validateInput()
     * check input against regexp if it is a valid IPv4 address
     */
    validateInput() {
        const pattern = new RegExp('^([0-9]{1,3}.){3}[0-9]{1,3}(/([0-9]|[1-2][0-9]|3[0-2]))?$', 'i');
        if (pattern.test(this.state.range_from) && pattern.test(this.state.range_to)) {
            this.setState({ submitDisabled: false });
        }
        else this.setState({ submitDisabled: true });
    }


    /**
     * GET request to fetch data from db right before component mounting
     * this is called before render() method
     */
    componentDidMount() {
        const FETCHURL = `subnets/${this.state.id.value}`;
        fetch(FETCHURL)
            .then(res => res.json())
            .then(subnets => this.setState({ subnets }));
    }


    render() {
        const title = this.state.gup + ' ' + this.state.site;
        return (
            <div>
                <div>
                    <IconButton
                        iconClassName="material-icons"
                        tooltip="subnets"
                        onClick={this.handleToggle}
                    >
                        list
                </IconButton>
                </div>
                <Drawer
                    width={460}
                    openSecondary={true}
                    open={this.state.open}
                >
                    {this.state.shouldRender ?
                        <div>
                            <AppBar
                                style={styles.appBarStyle}
                                title={title}
                                iconElementLeft={<IconButton
                                    iconClassName="material-icons"
                                    onClick={this.handleToggle}
                                >
                                    keyboard_arrow_right
                            </IconButton>}
                                iconElementRight={<IconButton
                                    iconClassName="material-icons"
                                    onClick={this.handleAdd}
                                >
                                    add
                            </IconButton>}
                            />
                            {this.state.add ?
                                <div
                                    style={styles.positioner}>
                                    <TextField
                                        hintText="IPv4"
                                        floatingLabelText="Range from"
                                        floatingLabelFixed={true}
                                        style={styles.inputWidth}
                                        onChange={this.onChange}
                                        value={this.state.range_from}
                                        name="range_from"
                                    />
                                    <TextField
                                        hintText="IPv4"
                                        floatingLabelText="Range to"
                                        floatingLabelFixed={true}
                                        style={styles.inputWidth}
                                        onChange={this.onChange}
                                        value={this.state.range_to}
                                        name="range_to"
                                    />
                                    <IconButton
                                        iconClassName="material-icons"
                                        onClick={this.handleSubmit}
                                        disabled={this.state.submitDisabled}
                                        iconStyle={this.state.submitDisabled ? { color: grey500 } : { color: green500 }}
                                    >
                                        check_circle
                            </IconButton>
                                </div> : <div></div>}
                            {this.state.subnets.map(subnet =>
                                <List key={subnet.sub_id}>
                                    <ListItem
                                        rightIconButton={
                                            <IconButton
                                                iconClassName='material-icons'
                                                onClick={() => this.handleDelete(subnet.sub_id)}>
                                                delete
                                    </IconButton>
                                        }
                                    >

                                        <div style={styles.subnetStyle.from}><b>from:</b> {subnet.range_from}</div>
                                        <div style={styles.subnetStyle.to}><b>to:</b> {subnet.range_to}</div>

                                    </ListItem>

                                </List>
                            )}
                        </div> : <div></div>}
                </Drawer>
            </div>
        );
    }
}

export default DrawerSubnets;
