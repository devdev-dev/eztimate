import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// https://material.io/resources/color/#!/?view.left=0&view.right=0&secondary.color=00796B&primary.color=00ACC1&primary.text.color=FAFAFA
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#00acc1',
        contrastText: '#fafafa'
      },
      secondary: {
        main: '#00838f'
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
