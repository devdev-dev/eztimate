import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { AppContext } from '../../pages/app';
import { CookieName } from '../../utils/types';
import UserAvatar from '../shared/UserAvatar';

export default function UserPanel() {
  const classes = useStyles();
  const context = useContext(AppContext);

  const [open, setOpen] = React.useState(false);

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
        {context.users?.map((user, userIndex) => (
          <UserAvatar key={userIndex} user={user} />
        ))}
        <div className={classes.invite}>
          <SpeedDial
            ariaLabel="ShareSpeedDial"
            FabProps={{ size: 'small' }}
            className={classes.speedDial}
            icon={<SpeedDialIcon icon={<PersonAddIcon />} openIcon={<CloseIcon />} />}
            onClick={() => setOpen(!open)}
            onClose={() => setOpen(false)}
            open={open}
            direction="down"
          >
            <SpeedDialAction key="Copy" icon={<FileCopyIcon />} tooltipTitle="Copy" onClick={handleCopy} />
            <SpeedDialAction key="EMail" icon={<EmailIcon />} tooltipTitle="EMail" onClick={handleEMail} />
            <SpeedDialAction key="Share" icon={<ShareIcon />} tooltipTitle="Share" onClick={handleShare} />
          </SpeedDial>
        </div>
      </Grid>
    </Grid>
  );
}

function handleCopy() {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const el = document.createElement('textarea');
  el.value = `${origin}/?join=${Cookies.get(CookieName.TEAM_ID)}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
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
    avatar: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(-2),
      border: '3px solid white'
    },
    invite: {
      height: 40,
      width: 40,
      position: 'relative'
    },
    speedDial: {
      position: 'absolute',
      '& button': {
        zIndex: 1052
      },
      '& .MuiSpeedDial-actions': {
        position: 'absolute',
        margin: 0,
        zIndex: 1051,
        '&.MuiSpeedDial-actionsClosed': {}
      }
    }
  })
);
