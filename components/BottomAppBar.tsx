import { Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import React from 'react';
import CreateSessionDialog from './CreateSessionDialog';
import JoinSessionDialog from './JoinSessionDialog';

export default function BottomAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isCreateDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [isJoinDialogOpen, setJoinDialogOpen] = React.useState(false);

  const handleCreate = () => {
    setCreateDialogOpen(true);
  };

  const handleJoin = () => {
    setJoinDialogOpen(true);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CreateSessionDialog open={isCreateDialogOpen} onDialogClose={() => setCreateDialogOpen(false)} />
      <JoinSessionDialog open={isJoinDialogOpen} onDialogClose={() => setJoinDialogOpen(false)} />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Esteem | Easy Estimations
          </Typography>
          <div className={classes.grow} />
          <Button variant="text" color="inherit" className={classes.button} startIcon={<AddCircleIcon />} onClick={handleCreate}>
            Create
          </Button>
          <Button variant="text" color="inherit" className={classes.button} startIcon={<PlayForWorkIcon />} onClick={handleJoin}>
            Join
          </Button>
          &nbsp;|&nbsp;
          <div>
            <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    text: {
      padding: theme.spacing(2, 2, 0)
    },
    paper: {
      paddingBottom: 50
    },
    list: {
      marginBottom: theme.spacing(2)
    },
    subheader: {
      backgroundColor: theme.palette.background.paper
    },
    appBar: {
      top: 'auto',
      bottom: 0
    },
    grow: {
      flexGrow: 1
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto'
    },
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 'auto'
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '20ch'
        }
      }
    }
  })
);
