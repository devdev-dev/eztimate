import { Avatar, Box, Chip, Divider, IconButton, TextField, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UndoIcon from '@material-ui/icons/Undo';
import React, { useRef, useState } from 'react';
import { useGetActiveTeamQuery, useTeamUpdateMutation } from '../../../apollo/types.grapqhl';

export interface TeamDialogProps {
  onDialogClose: () => void;
}

export default function TeamDialog({ onDialogClose }: TeamDialogProps) {
  const classes = useStyles();

  const { data, loading } = useGetActiveTeamQuery();
  const [teamUpdate] = useTeamUpdateMutation({ ignoreResults: true });

  const nameFieldRef = useRef<HTMLInputElement>(null);

  const [usersToDelete, setUsersToDelete] = useState([]);

  const handleClose = () => {
    onDialogClose();
  };

  const handleSave = async () => {
    const name = nameFieldRef.current?.value ?? null;

    teamUpdate({ variables: { id: data?.activeTeam?._id, name } }).then(() => handleClose());
  };

  return (
    <div>
      <Dialog onClose={onDialogClose} open={true} fullWidth={true} maxWidth="sm">
        <DialogTitle disableTypography className={classes.title}>
          <Typography variant="h6" className={classes.titleText}>
            Team Settings
          </Typography>
          <Tooltip title="Delete this team">
            <IconButton disabled={loading}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Team Information</Typography>
          <TextField disabled={loading} margin="dense" fullWidth label="Name" inputRef={nameFieldRef} defaultValue={data?.activeTeam?.name} variant="outlined" />
          <Divider />
          <Typography variant="h6">Team Members</Typography>

          <Box className={classes.members}>
            {data?.activeTeam?.users.map((user, index) => (
              <Chip
                disabled={loading}
                key={index}
                avatar={<Avatar alt={user.username} src={user.avatar}></Avatar>}
                label={`${user.email} (${user.username})`}
                onDelete={() => {
                  usersToDelete.includes(user._id)
                    ? setUsersToDelete(usersToDelete.filter(_id => _id !== user._id))
                    : setUsersToDelete(usersToDelete.concat([user._id]));
                }}
                variant={usersToDelete.includes(user._id) ? 'outlined' : 'default'}
                className={usersToDelete.includes(user._id) && classes.userToDelete}
                deleteIcon={usersToDelete.includes(user._id) && <UndoIcon />}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" autoFocus onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      display: 'flex',
      alignItems: 'center'
    },
    titleText: { flexGrow: 1 },
    members: {},
    userToDelete: {
      textDecoration: 'line-through'
    }
  })
);
