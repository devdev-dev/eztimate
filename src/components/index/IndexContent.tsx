import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Container from '@mui/material/Container';

const tiers = [
  {
    title: 'Free',
    subheader: 'Available after release',
    description: ['Unlimited estimations', 'Unlimited members', '5 different card stacks'],
    buttonVariant: 'disabled'
  },
  {
    title: 'Open Beta',
    subheader: 'Available now',
    description: ['Full Feature Set', 'No limitations', '100 parallel users limit'],
    buttonText: 'Start estimating',
    buttonVariant: 'contained'
  },
  {
    title: 'Teams',
    subheader: 'Available after release',
    description: ['Consistent Teams', 'Custom Card Stacks', 'User Rights'],
    buttonVariant: 'disabled'
  }
];

export default function IndexContent() {
  return (
    <React.Fragment>
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Next level estimation
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Eztimate.app is now available as open beta providing the full feature set for free until release. To reduce server load we currently limit the app to
          100 parallel users. We appreciate any kind of feedback to further improve this app:
          <br />
          Learn more here: <Link href="https://github.com/devdev-dev/eztimate/issues">GitHub</Link>
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center'
                  }}
                  sx={{
                    backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700])
                  }}
                />
                <CardContent>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                {tier.buttonText && (
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant as 'outlined' | 'contained'}>
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
