import { Avatar, Box, IconButton, makeStyles, TextField } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useUserJoinTeamMutation } from '../../../apollo/types.grapqhl';
import { CookieName } from '../../../utils/types';

export interface JoinSessionProps {
  teamId: string;
}

export default function JoinNewTeam(props: JoinSessionProps) {
  const classes = useStyles();
  const router = useRouter();

  const [userJoinTeam] = useUserJoinTeamMutation();

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleJoinTeam = () => {
    userJoinTeam({ variables: { teamId: textFieldRef.current?.value } }).then(result => {
      Cookies.set(CookieName.TEAM_ID, result.data.userJoinTeam._id);
      router.push('/app');
    });
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.avatar}>
          <GroupAddIcon />
        </Avatar>
        <TextField
          className={classes.textField}
          id="joinTeam"
          variant="outlined"
          placeholder="Team ID"
          label="Join a team"
          fullWidth={true}
          inputRef={textFieldRef}
          autoComplete="off"
          defaultValue={props.teamId}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleJoinTeam}>
                <ArrowForwardIosIcon />
              </IconButton>
            )
          }}
        />
      </Box>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  textField: {
    margin: theme.spacing(2),
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  }
}));
