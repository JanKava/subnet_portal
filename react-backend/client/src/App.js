import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import MainTable from './components/Table.jsx';
import TitleAppBar from './components/TitleAppBar';

class App extends Component {



  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
          <TitleAppBar />
          <MainTable 
          />
          </div>
        </MuiThemeProvider>
      </div>
        );
  }
}

export default App;
