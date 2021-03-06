import { AppBar, createStyles, fade, IconButton, makeStyles, Menu, MenuItem, Theme, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/client';
import router from 'next/router';
import React, { useRef, useState } from 'react';
import { CookieName } from '../utils';
import ProfileDialog from './ProfileDialog';

export default function BottomAppBar() {
  const classes = useStyles();
  const [session] = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogOut = () => {
    Cookies.remove(CookieName.TEAM_ID);
    signOut();
    setMenuOpen(false);
  };

  const handleSwitchTeam = () => {
    Cookies.remove(CookieName.TEAM_ID);
    router.push('/');
    setMenuOpen(false);
  };
  const handleEditProfile = () => {
    setMenuOpen(false);
    setProfileDialogOpen(true);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Eztimate | Easy Estimation
          </Typography>
          <div className={classes.grow} />
          {session && (
            <div>
              <IconButton onClick={() => setMenuOpen(true)} ref={profileButtonRef} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={profileButtonRef.current}
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
                <MenuItem onClick={handleEditProfile}>Profile</MenuItem>
                <MenuItem onClick={handleSwitchTeam}>Switch Team</MenuItem>
                <MenuItem onClick={handleLogOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {profileDialogOpen && <ProfileDialog onDialogClose={() => setProfileDialogOpen(false)} />}
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
