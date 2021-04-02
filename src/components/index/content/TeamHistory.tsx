import { List, ListItem, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Cookies from 'js-cookie';
import router from 'next/router';
import React from 'react';
import { useLoggedInUserQuery } from '../../../apollo/types.grapqhl';
import { CookieName } from '../../../utils/types';
import UserAvatar from '../../shared/UserAvatar';

export default function TeamHistory() {
  const classes = useStyles();

  const { data, loading } = useLoggedInUserQuery();
  const handleTeamSelect = teamId => {
    Cookies.set(CookieName.TEAM_ID, teamId);
    router.push('/app');
  };

  return (
    <>
      {data && !loading ? (
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
      ) : (
        <HistorySkeleton />
      )}
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
  },
  listitemskeleton: {
    marginLeft: 15
  }
}));

const HistorySkeleton = () => {
  const classes = useSkeletonStyles();
  return (
    <>
      <Skeleton animation="wave" width="250px" />
      <Skeleton className={classes.listitemskeleton} animation="wave" height="70px" />
      <Skeleton className={classes.listitemskeleton} animation="wave" height="70px" />
      <Skeleton className={classes.listitemskeleton} animation="wave" height="70px" />
    </>
  );
};

const useSkeletonStyles = makeStyles(() => ({
  listitemskeleton: {
    marginLeft: 15
  }
}));
