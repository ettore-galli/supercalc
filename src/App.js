// Framework base imports
import React, { Component } from 'react';

// Framework UI Import
import AppBar from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import red from '@material-ui/core/colors/red';
import Paper from '@material-ui/core/Paper';

// Own component import
import SuperCalcComponent from './components/common/SuperCalcComponent';
import ChangeTitleButton from './components/common/ChangeTitleButton'
import InputGrid from './components/InputGrid';
import TotalsGrid from './components/TotalsGrid';
class App extends SuperCalcComponent {

  componentDidMount() {
    this.SuperCalcStatus.addForceUpdateComponent(this);
    this.SuperCalcStatus.setTitle("Super! Calculator");
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: red,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar variant="headline">
            {/* <Typography variant="subheading">{this.SuperCalcStatus.getTitle()}</Typography> */}
            {this.SuperCalcStatus.getTitle()}
          </AppBar>
          {/*           <Button variant="raised" color="secondary" onClick={() => {
            this.SuperCalcStatus.setTitle("La lalla")
          }
          }>Ciao</Button>
          <ChangeTitleButton newTitle="Ciccio Pasticcio"></ChangeTitleButton> */}
          <TotalsGrid></TotalsGrid>
          <InputGrid></InputGrid>



        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
