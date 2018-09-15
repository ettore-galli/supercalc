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
import ControlButtons from './components/ControlButtons';
import CustomAppBar from './components/CustomAppBar';

class App extends SuperCalcComponent {

  componentDidMount() {
    let __this = this;
    this.superCalcStatePersistence.get().then(
      (appState) => {
        // Load initial state from persistence
        __this.SuperCalcStatus.setInitialStateWithNoForceUpdate(appState);
        // Override title
        __this.SuperCalcStatus.setTitle("Super! Calculator!");
      }
    )
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: green,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <CustomAppBar autoupdate={true} variant="headline">
          </CustomAppBar>
          <ControlButtons></ControlButtons>
          <TotalsGrid autoupdate={true}></TotalsGrid>
          <InputGrid autoupdate={true}></InputGrid>
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
