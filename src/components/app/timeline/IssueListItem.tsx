import {
  Avatar,
  createStyles,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Tooltip
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useRef, useState } from 'react';
import { GetActiveTeamQuery, useIssueDeleteMutation, useIssueEstimateMutation } from '../../../apollo/types.grapqhl';
import { IssueState } from '../../../utils/types';

const ITEM_HEIGHT = 48;

export type IssueListItemProps = {
  issue: GetActiveTeamQuery['activeTeam']['issues'][0];
  selected: boolean;
};

export default function IssueListItem({ issue, selected }: IssueListItemProps) {
  const classes = useStyles();

  const [issueDelete] = useIssueDeleteMutation();
  const handleDeleteIssue = () => {
    setOpen(false);
    issueDelete({
      variables: { id: issue._id },
      update: (cache, { data }) => {
        if (data) {
          cache.evict({
            id: cache.identify({
              __typename: 'Issue',
              id: issue._id
            })
          });
        } else {
          console.log('Something went wrong!');
        }
      }
    });
  };

  const [issueEstimate] = useIssueEstimateMutation();
  const handleIssueEstimate = () => {
    setOpen(false);
    issueEstimate({ variables: { id: issue._id } });
  };

  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem button disableGutters selected={selected}>
        <ListItemAvatar>
          <Tooltip title={issue.state}>
            <Avatar className={classes.issueAvatar}>
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
          <IconButton edge="end" onClick={() => setOpen(true)} ref={moreButtonRef}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={moreButtonRef.current}
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch'
              }
            }}
            keepMounted
          >
            <MenuItem onClick={handleIssueEstimate}>Estimate</MenuItem>
            <MenuItem onClick={handleDeleteIssue}>Delete</MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
      <div className={classes.vertical}></div>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    vertical: {
      borderLeft: '1px solid lightgrey',
      height: theme.spacing(4),
      marginLeft: theme.spacing(2.5),
      marginTop: '-' + theme.spacing(2) + 'px',
      marginBottom: '-' + theme.spacing(2) + 'px'
    },
    issueAvatar: {
      background: 'transparent',
      color: 'grey'
    }
  })
);
