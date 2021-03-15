import { List, ListItem, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { gql, request } from 'graphql-request';
import Cookies from 'js-cookie';
import router from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { CookieName } from '../../../utils/types';

export default function TeamHistory() {
  const classes = useStyles();

  const { data } = useQuery('user', async () => {
    const data = await request(
      '/api/graphql',
      gql`
        query {
          loggedInUser {
            _id
            teams {
              _id
              name
              users {
                email
              }
            }
          }
        }
      `
    );
    return data;
  });

  const handleTeamSelect = teamId => {
    Cookies.set(CookieName.TEAM_ID, teamId);
    router.push('/app');
  };

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
        {data?.loggedInUser?.teams?.map((team, index) => (
          <ListItem key={index} onClick={() => handleTeamSelect(team._id)} button>
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
