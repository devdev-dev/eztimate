import {
  Avatar,
  Box,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
  Tooltip,
  Typography
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorIcon from '@material-ui/icons/Error';
import FlagIcon from '@material-ui/icons/Flag';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useContext, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AppContext } from '../../pages/app';
import { CreateIssueMutation, IssueQuery, SetActiveIssuesMutation } from '../../utils/mongodb/mongodb.actions';
import { IssueState } from '../../utils/types';

const Estimate = () => {
  const classes = useStyles();
  const context = useContext(AppContext);

  const issueQuery = useQuery('issues', IssueQuery);

  const activeIssueMutation = useMutation(SetActiveIssuesMutation);
  const createIssueMutation = useMutation(CreateIssueMutation, {
    onSuccess: async () => {
      issueQuery.refetch();
    }
  });

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleAddIssue = () => {
    createIssueMutation.mutate({
      issueName: textFieldRef.current?.value
    });
  };

  const handleSetActiveIssue = (issueId: string) => {
    console.log(issueId);
    activeIssueMutation.mutate({
      issueId
    });
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Box flexGrow={0} className={classes.header}>
        <Typography component="h2" variant="h5" gutterBottom>
          {`Timeline ${context.team?.name ? 'of ' + context.team?.name : ''}`}
        </Typography>
      </Box>
      <Box flexGrow={0} className={classes.buttons}>
        <TextField
          className={classes.createIssue}
          size="small"
          id="outlined-basic"
          variant="outlined"
          placeholder="Create a new issue"
          fullWidth={true}
          inputRef={textFieldRef}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => handleAddIssue()}>
                <PlaylistAddIcon />
              </IconButton>
            )
          }}
        />
      </Box>
      <Box flexGrow={1} flexBasis={0} overflow={'auto'}>
        <List component="nav">
          {issueQuery.data?.map((issue, issueIndex) => (
            <>
              <ListItem key={issueIndex} button disableGutters>
                <ListItemAvatar>
                  <Tooltip title={issue.state}>
                    <Avatar className={classes.issueDot}>
                      <>
                        {issue.state === IssueState.OPEN && <RadioButtonUncheckedIcon />}
                        {issue.state === IssueState.ESTIMATED && <CheckIcon />}
                        {issue.state === IssueState.UNFINISHED && <ErrorIcon />}
                      </>
                    </Avatar>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText primary={issue.name} secondary={issue._id} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <div className={classes.vertical}></div>
            </>
          ))}

          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar>
                <FlagIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="This is the beginning of your estimation history! Create a new story to start estimating." />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
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
      paddingBottom: theme.spacing(2)
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
    }
  })
);

export default Estimate;
