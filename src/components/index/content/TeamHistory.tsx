import { gql, useQuery } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import Cookies from 'js-cookie';
import router from 'next/router';
import React from 'react';
import { CookieName } from '../../../utils/types';
import UserAvatar from '../../shared/UserAvatar';

export default function TeamHistory() {
  const classes = useStyles();

  const GET_LOGGED_IN_USER = gql`
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
  `;

  const { data } = useQuery(GET_LOGGED_IN_USER);

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
            Recently visited Teams
          </ListSubheader>
        }
        className={classes.root}
        disablePadding
      >
        {data?.loggedInUser?.teams?.map((team, index) => (
          <ListItem key={index} onClick={() => handleTeamSelect(team._id)} button>
            <ListItemText primary={team.name} />
            {team.users?.map((user, userIndex) => (
              <UserAvatar key={userIndex} user={user} />
            ))}
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
