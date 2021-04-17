import { usePresenceChannel } from '@harelpls/use-pusher';
import { Avatar, createStyles, Grid, IconButton, makeStyles, Snackbar, Theme, Typography } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Alert } from '@material-ui/lab';
import Cookies from 'js-cookie';
import React from 'react';
import { useGetUsersQuery } from '../../../apollo/types.grapqhl';
import { useUserJoinTeam, useUserUpdate } from '../../../utils/hooks';
import { CookieName } from '../../../utils/types';
import UserAvatar, { UserAvatarSkeleton } from '../../shared/UserAvatar';

export default function UserPanel() {
  const classes = useStyles();
  const [copyAlertOpen, setCopyAlertOpen] = React.useState(false);

  const { data: usersDataQuery, loading: usersDataLoading, refetch } = useGetUsersQuery();

  const { channel } = usePresenceChannel(`presence-${Cookies.get(CookieName.TEAM_ID)}`);
  useUserJoinTeam(refetch);
  useUserUpdate(refetch);

  const handleCopyID = () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const el = document.createElement('textarea');
    el.value = `${origin}/?join=${Cookies.get(CookieName.TEAM_ID)}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setCopyAlertOpen(true);
  };

  return (
    <>
      {' '}
      <Grid container direction="row" justify="space-between" alignItems="flex-start" component="section" className={classes.root}>
        <Grid item>
          <Typography component="h2" variant="h5" gutterBottom>
            Estimate with your Team
          </Typography>
        </Grid>
        <Grid item className={classes.avatars}>
          {usersDataLoading ? (
            <>
              <UserAvatarSkeleton />
              <UserAvatarSkeleton />
              <UserAvatarSkeleton />
            </>
          ) : (
            usersDataQuery?.activeTeam.users?.map((user, userIndex) => <UserAvatar key={userIndex} user={user} online={channel?.members?.get(user._id)} />)
          )}
          <IconButton disabled={usersDataLoading} onClick={() => handleCopyID()} className={classes.inviteButton}>
            <Avatar>
              <PersonAddIcon />
            </Avatar>
          </IconButton>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={copyAlertOpen}
        message="Invitation link copied."
        autoHideDuration={6000}
        onClose={() => setCopyAlertOpen(false)}
      >
        <Alert onClose={() => setCopyAlertOpen(false)} severity="info" variant="filled" icon={<CopyIcon />}>
          Invitation link copied. Share it with your team!
        </Alert>
      </Snackbar>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 128,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    avatars: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    inviteButton: {
      marginLeft: theme.spacing(2)
    }
  })
);
