import { red,purple,yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: yellow[700],
    },
    error: {
      main: red.A200,
    },
  },
});

export default theme;