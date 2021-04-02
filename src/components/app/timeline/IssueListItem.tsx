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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useRef, useState } from 'react';
import { GetActiveTeamQuery, IssueState, useIssueDeleteMutation, useTeamSetActiveIssueMutation } from '../../../apollo/types.grapqhl';

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
      variables: { id: issue._id }
    });
  };

  const [teamSetActiveIssue] = useTeamSetActiveIssueMutation({ ignoreResults: true });
  const handleTeamSetActiveIssue = () => {
    setOpen(false);
    teamSetActiveIssue({
      variables: { id: issue._id }
    });
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
                {issue.state === IssueState.Open && <RadioButtonUncheckedIcon />}
                {issue.state === IssueState.Discussed && <QuestionAnswerIcon />}
                {issue.state === IssueState.Estimated && <CheckIcon />}
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
            <MenuItem onClick={handleTeamSetActiveIssue}>Estimate</MenuItem>
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
