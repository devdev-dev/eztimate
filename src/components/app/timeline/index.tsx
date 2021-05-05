import { Box, createStyles, IconButton, List, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Skeleton } from '@material-ui/lab';
import React, { useRef, useState } from 'react';
import { useGetActiveTeamQuery, useIssueCreateMutation } from '../../../apollo/types.grapqhl';
import { useIssueCreateEvent, useIssueDeleteEvent, useIssueUpdateEvent, useTeamUpdateEvent } from '../../../utils/hooks';
import IssueListItem, { IssueListItemBeginning, IssueListItemSkeleton } from './IssueListItem';

const Timeline = () => {
  const classes = useStyles();

  const { data, loading } = useGetActiveTeamQuery();
  const [value, setValue] = useState('');

  const [issueCreate] = useIssueCreateMutation();
  useIssueCreateEvent(data?.activeTeam);
  useIssueUpdateEvent();
  useIssueDeleteEvent();
  useTeamUpdateEvent();

  const textFieldRef = useRef<HTMLInputElement>(null);
  const [helperText, setHelperText] = useState('');
  const handleAddIssue = () => {
    const value = textFieldRef.current?.value;
    if (value && value.length > 0) {
      setHelperText('');
      issueCreate({
        variables: { name: textFieldRef.current.value }
      }).then(() => {
        setValue('');
      });
    } else {
      setHelperText('The issue name is empty');
    }
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Box flexGrow={0} className={classes.header}>
        {loading ? (
          <Skeleton animation="wave" width="100%" height="50px" />
        ) : (
          <Typography component="h2" variant="h5">
            {`Timeline of ${data?.activeTeam?.name}`}
          </Typography>
        )}
      </Box>
      <Box flexGrow={0} className={classes.buttons}>
        <TextField
          className={classes.createIssue}
          disabled={loading}
          variant="outlined"
          placeholder="Create a new issue"
          fullWidth={true}
          inputRef={textFieldRef}
          helperText={helperText}
          error={helperText.length > 0}
          autoComplete="off"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddIssue()}
          InputProps={{
            endAdornment: (
              <IconButton disabled={loading} onClick={() => handleAddIssue()}>
                <PlaylistAddIcon />
              </IconButton>
            )
          }}
        />
      </Box>
      <Box flexGrow={1} flexBasis={0} overflow={'auto'}>
        <List component="nav">
          {loading ? (
            <>
              <IssueListItemSkeleton sizePrimary="70%" sizeSecondary="50%" />
              <IssueListItemSkeleton sizePrimary="40%" sizeSecondary="60%" />
              <IssueListItemSkeleton sizePrimary="60%" sizeSecondary="60%" />
              <IssueListItemSkeleton sizePrimary="90%" sizeSecondary="70%" />
            </>
          ) : (
            data?.activeTeam?.issues.map((issue, issueIndex) => (
              <IssueListItem issue={issue} selected={issue?._id === data?.activeTeam?.estimatedIssue?._id} key={issueIndex} />
            ))
          )}
          <IssueListItemBeginning />
        </List>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2)
    },
    vertical: {
      borderLeft: '1px solid lightgrey',
      height: theme.spacing(4),
      marginLeft: theme.spacing(2.5),
      marginTop: '-' + theme.spacing(2) + 'px',
      marginBottom: '-' + theme.spacing(2) + 'px'
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    header: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      height: 128,
      display: 'flex',
      alignItems: 'center'
    },
    buttons: {
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(2)
    },
    issueDot: {
      background: 'transparent',
      color: 'grey'
    },
    createIssue: {
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: 0
      }
    },
    typography: {
      padding: theme.spacing(2)
    }
  })
);

export default Timeline;
