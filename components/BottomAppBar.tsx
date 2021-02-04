import { Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle } from '@material-ui/icons';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import React from 'react';

export default function BottomAppBar() {
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Esteem | Easy Estimations
          </Typography>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <RadioButtonUncheckedIcon onClick={() => router.push('/app/teams')} />
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
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
    title: {
      flexGrow: 1
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
    }
  })
);
