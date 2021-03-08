import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// https://material.io/resources/color/#!/?view.left=0&view.right=0&secondary.color=00796B&primary.color=00ACC1&primary.text.color=FAFAFA
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#AAAAAA',
        contrastText: '#fafafa'
      },
      secondary: {
        main: '#666666'
      },
      error: {
        main: red.A400
      },
      background: {
        default: 'white'
      }
    }
  })
);

export default theme;
