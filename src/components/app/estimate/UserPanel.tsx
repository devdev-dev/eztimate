import { usePresenceChannel } from '@harelpls/use-pusher';
import { Avatar, Box, createStyles, Grid, IconButton, makeStyles, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Cookies from 'js-cookie';
import React, { useRef, useState } from 'react';
import { useGetUsersQuery } from '../../../apollo/types.grapqhl';
import { CookieName } from '../../../utils/types';
import UserAvatar from '../../shared/UserAvatar';

const ITEM_HEIGHT = 48;

export default function UserPanel() {
  const classes = useStyles();

  const { data } = useGetUsersQuery();

  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const { channel } = usePresenceChannel(`presence-${Cookies.get(CookieName.TEAM_ID)}`);

  const handleCopy = () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const el = document.createElement('textarea');
    el.value = `${origin}/?join=${Cookies.get(CookieName.TEAM_ID)}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setOpen(false);
  };
  const handleEMail = () => {};
  const handleShare = () => {};

  return (
    <Grid container spacing={2} direction="row" justify="space-between" alignItems="flex-start" component="section" className={classes.root}>
      <Grid item xs>
        <Typography component="h2" variant="h5" gutterBottom>
          Estimate with your Team
        </Typography>
      </Grid>
      <Grid item xs className={classes.avatars}>
        {channel && data?.activeTeam.users?.map((user, userIndex) => <UserAvatar key={userIndex} user={user} online={channel.members.get(user._id)} />)}
        <Box className={classes.inviteButton}>
          <IconButton onClick={() => setOpen(true)} ref={moreButtonRef}>
            <Avatar>
              <PersonAddIcon />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={moreButtonRef.current}
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch'
              }
            }}
            keepMounted
          >
            <MenuItem onClick={handleCopy}>Copy Link</MenuItem>
            <MenuItem onClick={handleEMail}>Send Email</MenuItem>
            <MenuItem onClick={handleShare}>Share with ...</MenuItem>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2)
    },
    avatars: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    inviteButton: {
      '& .MuiIconButton-root': {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3)
      }
    }
  })
);
