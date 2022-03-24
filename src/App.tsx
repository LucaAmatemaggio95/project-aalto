import React from 'react';
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';

const theme = createTheme({
  palette: {
    primary: {
      main: '#644C79'
    },
    secondary: {
      main: '#003479'
    }
  },
  typography: {
    fontFamily: "'karbon-regular', sans-serif",
    body1: {
      fontFamily: "'karbon-semibold', sans-serif",
      textTransform: 'uppercase'
    },
    h5: {
      fontFamily: "'karbon-semibold', sans-serif"
    },
    h6: {
      fontFamily: "'karbon-semibold', sans-serif"
    }
  },
   components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: '#f4f4f4'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 30
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: '1px solid #644C79',
          borderRadius: 0,
          backgroundColor: '#fff'
        }
      }
    }
  }
});

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
      
        <CssBaseline />

        <NavBar />

        <Content />

        <Footer />

      </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
