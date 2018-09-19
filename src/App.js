// Framework base imports
import React from 'react';

// Framework UI Import
//import AppBar from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import green from '@material-ui/core/colors/green';

// Own component import
import SuperCalcComponent from './components/common/SuperCalcComponent';
import SuperCalcEngine from './BackEnd/SuperCalcEngine';

import InputGrid from './components/InputGrid';
import TotalsGrid from './components/TotalsGrid';
// import ControlButtons from './components/ControlButtons';
import CustomAppBar from './components/CustomAppBar';
import Rational from './BackEnd/Rational';

class App extends SuperCalcComponent {

  componentDidMount() {
    let __this = this;
    this.superCalcStatePersistence.get().then(
      (appState) => {
        // Load initial state from persistence
        __this.SuperCalcStatus.setInitialStateWithNoForceUpdate(appState);
        // Override title
        __this.SuperCalcStatus.setTitle("Super Calculator");
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
            finalDestinationTotalsField={"final_destination_1_totals"}
            title={"Totali per destinazione 1"}
            showTableFooter={true}
          ></TotalsGrid>
          <TotalsGrid
            autoupdate={true}
            finalDestinationTotalsField={"final_destination_2_totals"}
            title={"Totali per destinazione 2"}
            showTableFooter={false}
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
