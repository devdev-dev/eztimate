import { List, ListItem, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { gql, request } from 'graphql-request';
import React from 'react';
import { useQuery } from 'react-query';
import { UserSelfQuery } from '../../../utils/mongodb/mongodb.actions';
import { UUser } from '../../../utils/types';

export default function TeamHistory() {
  const classes = useStyles();

  const user = useQuery('user', async () => {
    const {
      posts: { data }
    } = await request(
      '/api/graphql',
      gql`
        query {
          loggedInUser {
            _id
          }
        }
      `
    );
    return data;
  });
  console.log(user);

  const userSelfQuery = useQuery<UUser>('issues', UserSelfQuery);

  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" disableGutters>
            History of Teams
          </ListSubheader>
        }
        className={classes.root}
        disablePadding
      >
        {userSelfQuery.data?.teams.map((team, index) => (
          <ListItem key={index} button>
            <ListItemText primary={team.name} />
            <AccountCircleIcon />
          </ListItem>
        ))}
      </List>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  root: {
    width: '100%'
  }
}));
