import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Alert, IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useNotificationEvent } from '../pusher';

export default function NotificationSnackbar() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const browserPermission = Notification.permission !== 'denied';
  const appPermission = localStorage.getItem('notification-permissions') === 'granted';

  useNotificationEvent(data => {
    if (data) {
      setMessage(data.message);
      setOpen(true);

      data.systemNotification && showDesktopNotification(data.message);
    } else {
      console.error('Received Notification event without data.');
    }
  });

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="info"
        sx={{ width: '100%' }}
        action={
          <>
            {browserPermission && (
              <IconButton
                size="small"
                color="inherit"
                onClick={e => {
                  togglePermission();
                  handleClose(e);
                }}
              >
                {!appPermission && <NotificationsActiveIcon fontSize="inherit" />}
                {appPermission && <NotificationsOffIcon fontSize="inherit" />}
              </IconButton>
            )}
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

function togglePermission() {
  const browserPermission = Notification.permission === 'granted';
  const appPermission = localStorage.getItem('notification-permissions') === 'granted';

  if (browserPermission) {
    if (!appPermission) {
      localStorage.setItem('notification-permissions', 'granted');
    } else {
      localStorage.setItem('notification-permissions', 'denied');
    }
  } else {
    localStorage.setItem('notification-permissions', '');
    Notification.requestPermission().then(value => {
      if (value === 'granted') {
        localStorage.setItem('notification-permissions', 'granted');
        showDesktopNotification('Desktop notifications enabled!');
      } else if (value === 'denied') {
        // User should check the browser settings
      }
    });
  }
}

function showDesktopNotification(message: string) {
  const browserPermission = Notification.permission === 'granted';
  const appPermission = localStorage.getItem('notification-permissions') === 'granted';
  if (browserPermission && appPermission) {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.showNotification('Instant Estimation', {
          body: message,
          icon: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          vibrate: [100, 50, 100],
          actions: [
            {
              action: 'estimate-action',
              title: 'Estimate Now'
            }
          ]
        });
      } else {
        console.error('Service Worker Notitfications not available. Fallback to client notifications.');
        new Notification('Instant Estimation', {
          body: message,
          icon: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        });
      }
    });
  }
}
