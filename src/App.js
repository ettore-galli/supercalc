// Framework base imports
import React from 'react';

// Framework UI Import
//import AppBar from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import green from '@material-ui/core/colors/green';

// Own component import
import SuperCalcComponent from './components/common/SuperCalcComponent';
import InputGrid from './components/InputGrid';
import TotalsGrid from './components/TotalsGrid';
import CustomAppBar from './components/CustomAppBar';
import SuperCalcConstants from './BackEnd/SuperCalcConstants';


class App extends SuperCalcComponent {

  componentDidMount() {
    let __this = this;
    this.superCalcStatePersistence.get().then(
      (appState) => {
        // Load initial state from persistence
        __this.SuperCalcStatus.setInitialStateWithNoForceUpdate(appState);
        // Force initial update
        __this.SuperCalcStatus.setSaving(SuperCalcConstants.__SAVING_STATUS_DONE);
        __this.SuperCalcStatus.doForceUpdate();
      }
    )
  }

  render() {
    // Theme
    const theme = createMuiTheme({
      palette: {
        primary: green,
      },
    });


    // Render
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <CustomAppBar autoupdate={true} variant="headline">
          </CustomAppBar>
          <TotalsGrid
            autoupdate={true}
          ></TotalsGrid>
          <InputGrid
            autoupdate={true}
          ></InputGrid>
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
