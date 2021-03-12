import { Avatar, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/Email';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React from 'react';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <EmailIcon />, name: 'EMail' }
];

export default function UserPanel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2} direction="row" justify="space-between" alignItems="flex-start" component="section" className={classes.root}>
      <Grid item xs>
        <Typography component="h2" variant="h5" gutterBottom>
          Estimate with your Team
        </Typography>
      </Grid>
      <Grid item xs className={classes.avatars}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <div className={classes.invite}>
          <SpeedDial
            ariaLabel="ShareSpeedDial"
            FabProps={{ size: 'small' }}
            className={classes.speedDial}
            icon={<SpeedDialIcon icon={<PersonAddIcon />} openIcon={<CloseIcon />} />}
            onClick={handleOpenClose}
            open={open}
            direction="down"
          >
            {actions.map(action => (
              <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
            ))}
          </SpeedDial>
        </div>
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
