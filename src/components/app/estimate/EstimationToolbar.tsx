import { usePresenceChannel } from '@harelpls/use-pusher';
import { Avatar, createStyles, Grid, IconButton, makeStyles, Menu, MenuItem, Snackbar, Theme, Typography } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Alert, Skeleton } from '@material-ui/lab';
import Cookies from 'js-cookie';
import React, { useRef } from 'react';
import { useGetUsersQuery } from '../../../apollo/types.grapqhl';
import { CookieName } from '../../../utils';
import { useUserJoinTeam, useUserUpdate } from '../../../utils/hooks';
import UserAvatar, { UserAvatarSkeleton } from '../../shared/UserAvatar';

export default function UserPanel() {
  const classes = useStyles();
  const [copyAlertOpen, setCopyAlertOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const teamButtonRef = useRef<HTMLButtonElement>(null);

  const { data: usersData, loading: usersDataLoading, refetch } = useGetUsersQuery();

  const { channel } = usePresenceChannel(`presence-${Cookies.get(CookieName.TEAM_ID)}`);
  useUserJoinTeam(refetch);
  useUserUpdate(refetch);

  const handleManageTeam = () => {};

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
        <Grid item className={classes.team}>
          {usersDataLoading ? (
            <Skeleton animation="wave" width="20%" height="50px" />
          ) : (
            <>
              <IconButton ref={teamButtonRef} onClick={() => setMenuOpen(true)}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={teamButtonRef.current}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
              >
                <MenuItem onClick={handleManageTeam}>Manage</MenuItem>
              </Menu>
              <Typography component="h2" variant="h5">
                {usersData.activeTeam.name}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item className={classes.avatars}>
          {usersDataLoading ? (
            <>
              <UserAvatarSkeleton shift />
              <UserAvatarSkeleton shift />
              <UserAvatarSkeleton shift />
            </>
          ) : (
            usersData?.activeTeam.users?.map((user, userIndex) => <UserAvatar key={userIndex} user={user} online={channel?.members?.get(user._id)} shift />)
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
    team: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center'
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
