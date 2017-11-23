import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import OnDeleteGup from './OnDeleteGup';
import EditGup from './EditGup';
import DrawerSubnets from './DrawerSubnets';

const styles = {
    tableStyle: { tableLayout: 'auto' },
    headerStyle: {
        header: { width: 70 },
        hint: { fontSize: 14 }
    },
    rowStyle: {
        dataStyle: { height: '100px' },
        actionStyle: { overflow: 'visible' }
    }


}


class MainTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false, //material-ui table properties
            gups: [], //keeping fetched data in state
            //shouldUpdate: true,

            /**
             * values to keep from filter inputs
             */
            region: '',
            country: '',
            bu: '',
            gup: '',
            site: '',

        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
    };



    /**
     * load data before render method is called
     * keeping the data in state
     */
    componentDidMount() {
        const FILTERURL = `/gups/filtered?region=${this.state.region}&country=${this.state.country}&bu=${this.state.bu}&gup=${this.state.gup}&site=${this.state.site}`;
        fetch(FILTERURL, { method: 'post' })
            .then(res => res.json())
            .then(gups => this.setState({ gups }));

    };


    /**
     * on tableHeader input change, change state
     */
    onChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => this.componentDidMount()
        );

    };



    render() {
        return (
            <Table fixedHeader={false} style={styles.tableStyle}>
                <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                >
                    <TableRow>
                        <TableHeaderColumn>
                            <TextField
                                hintText="Region"
                                style={styles.headerStyle.header}
                                hintStyle={styles.headerStyle.hint}
                                name="region"
                                value={this.state.region}
                                onChange={this.onChange}
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <TextField
                                hintText="Country"
                                style={styles.headerStyle.header}
                                hintStyle={styles.headerStyle.hint}
                                name="country"
                                value={this.state.country}
                                onChange={this.onChange}
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <TextField
                                hintText="BU"
                                style={styles.headerStyle.header}
                                hintStyle={styles.headerStyle.hint}
                                name="bu"
                                value={this.state.bu}
                                onChange={this.onChange}
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <TextField
                                hintText="GUP"
                                style={styles.headerStyle.header}
                                hintStyle={styles.headerStyle.hint}
                                name="gup"
                                value={this.state.gup}
                                onChange={this.onChange}
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <TextField
                                hintText="Site"
                                style={styles.headerStyle.header}
                                hintStyle={styles.headerStyle.hint}
                                name="site"
                                value={this.state.site}
                                onChange={this.onChange}
                            />
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            Actions
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                >
                    {this.state.gups.map(gup =>
                        <TableRow key={gup.gup_id}
                            style={styles.rowStyle.dataStyle}
                        >
                            <TableRowColumn>
                                {gup.region}
                            </TableRowColumn>
                            <TableRowColumn>
                                {gup.country}
                            </TableRowColumn>
                            <TableRowColumn>
                                {gup.bu}
                            </TableRowColumn>
                            <TableRowColumn>
                                {gup.gup.toUpperCase()}
                            </TableRowColumn>
                            <TableRowColumn>
                                {gup.site}
                            </TableRowColumn>
                            <TableRowColumn style={styles.rowStyle.actionStyle}>
                                <div className="inline-buttons">
                                    <EditGup value={gup.gup_id}
                                        region={gup.region}
                                        country={gup.country}
                                        bu={gup.bu}
                                        gup={gup.gup}
                                        site={gup.site}
                                        location={gup.location}
                                        contact={gup.contact}
                                        bandwidth={gup.bandwidth}
                                        pcs={gup.pcs} />
                                    <DrawerSubnets value={gup.gup_id} value1={gup.gup} value2={gup.site} />
                                    <OnDeleteGup value={gup.gup_id} value1={gup.gup} value2={gup.site} />
                                </div>
                            </TableRowColumn>
                            )}
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        );
    }
}

export default MainTable;