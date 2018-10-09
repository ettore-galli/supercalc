// Framework base imports
import React from 'react';

// Framework UI Import
//import AppBar from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import green from '@material-ui/core/colors/green';

// Own component import
import superCalcStateManager from './BackEnd/SuperCalcStateManager';
import superCalcStatePersistence from './BackEnd/SuperCalcStatePersistence';

import TotalsGrid from './components/TotalsGrid';
import ItemsGrid from './components/ItemsGrid';

import CustomAppBar from './components/CustomAppBar';
import SuperCalcConstants from './BackEnd/SuperCalcConstants';

class App extends React.Component {

  componentDidMount() {
    superCalcStatePersistence.get().then(
      (appState) => {
        // Load initial state from persistence
        superCalcStateManager.setInitialStateWithNoForceUpdate(appState);
        // Force initial update
        superCalcStateManager.setSaving(SuperCalcConstants.__SAVING_STATUS_DONE);
        superCalcStateManager.doForceUpdate();
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
          <CustomAppBar
            autoupdate={true}
            variant="headline">
          </CustomAppBar>
          <TotalsGrid
            autoupdate={true}
          ></TotalsGrid>
          <ItemsGrid
            autoupdate={true}
          ></ItemsGrid>
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
