import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#4d9d9a',
      main: '#218581',
      dark: '#175d5a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#337a77',
      main: '#005955',
      dark: '#003e3b',
      contrastText: '#000',
    },
    custom:{
      blue600: '#117cb9',
      green600: '#47c869',
      brown600: '#5f5c4c',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#e3e3e3',
      main: '#3e5954',
      dark: '#add4d3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    custom:{
      blue600: '#117cb9',
      green600: '#47c869',
      brown600: '#5f5c4c',
    },
  },
});

export {
    lightTheme,
    darkTheme
}