import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import CreateGup from './CreateGup';


class TitleAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <AppBar
                title="CID Portal"
                style={{
                    backgroundColor: '#444444',
                }}
                iconStyleLeft={{ display: 'none' }}
                iconElementRight={
                    <div >
                        <CreateGup />
                    </div>}
            />
        )
    }

}

export default TitleAppBar;