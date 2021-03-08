import { Avatar, Card, CardContent, Container, createStyles, Grid, Link, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';

const Estimate = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2} direction="row" justify="space-between" alignItems="flex-start" component="section" className={classes.header}>
        <Grid item xs={8}>
          <Typography component="h2" variant="h6" gutterBottom>
            Estimate with your Team
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.avatar}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar>
            <PersonAddIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Paper elevation={3} className={classes.story}>
        <Grid container>
          <Grid item md={10} className={classes.storyContent}>
            <Typography variant="h5" color="inherit" gutterBottom>
              Name of the story
            </Typography>
            <Typography variant="body2" color="inherit" gutterBottom>
              Description of the story
            </Typography>
            <Link variant="subtitle1" href="#">
              Link to Jira
            </Link>
          </Grid>
          <Grid item md={2} className={classes.storyContent}>
            Some Controls here
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={0} className={classes.cards}>
        <Grid direction="row" justify="center" alignItems="stretch" container>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  2
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  3
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  8
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  13
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  20
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  40
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  100
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} md={2} className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h4" color="textSecondary">
                  ?
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    header: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2)
    },
    avatar: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& > *': {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(-2),
        border: '3px solid white'
      }
    },
    story: {
      marginBottom: theme.spacing(2)
    },
    storyContent: {
      padding: theme.spacing(1)
    },
    cards: {
      backgroundColor: theme.palette.grey[100],
      marginBottom: theme.spacing(2)
    },
    cardsContent: {
      padding: theme.spacing(1)
    },
    card: {
      aspectRatio: '4 / 5'
    },
    cardContent: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }
  })
);

export default Estimate;
