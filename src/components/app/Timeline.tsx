import { gql, useQuery as useApolloQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import React, { useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { CreateIssueMutation, IssueQuery } from '../../utils/mongodb/mongodb.actions';
import IssueListItem from './IssueListItem';

const Timeline = () => {
  const classes = useStyles();

  const { data } = useApolloQuery(gql`
    query {
      activeTeam {
        name
        estimatedIssue
      }
    }
  `);

  const issueQuery = useQuery('issues', IssueQuery);

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

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Box flexGrow={0} className={classes.header}>
        <Typography component="h2" variant="h5" gutterBottom>
          {`Timeline ${data?.activeTeam?.name ? 'of ' + data?.activeTeam?.name : ''}`}
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
            <IssueListItem issue={issue} selected={issue._id === data?.activeTeam.estimatedIssue} key={issueIndex} />
          ))}

          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar>
                <FlagIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="This is the beginning of your estimation history! Create a new story to start estimating." />
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
    },
    typography: {
      padding: theme.spacing(2)
    }
  })
);

export default Timeline;
