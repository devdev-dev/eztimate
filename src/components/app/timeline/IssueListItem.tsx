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
import { Check, Flag, MoreVert, QuestionAnswer, RadioButtonUnchecked, Repeat } from '@material-ui/icons/';
import { Skeleton } from '@material-ui/lab';
import React, { useRef, useState } from 'react';
import { GetActiveTeamQuery, IssueState, useIssueDeleteMutation, useIssueResetMutation, useTeamSetActiveIssueMutation } from '../../../apollo/types.grapqhl';

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

  const [issueReset] = useIssueResetMutation({ ignoreResults: true });
  const handleResetIssue = () => {
    setOpen(false);
    issueReset({
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
                {issue.state === IssueState.Open && <RadioButtonUnchecked />}
                {issue.state === IssueState.Reestimate && <Repeat />}
                {issue.state === IssueState.Discussed && <QuestionAnswer />}
                {issue.state === IssueState.Estimated && <Check />}
              </>
            </Avatar>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText primary={issue.name} secondary={issue.estimate && `Estimated Value: ${issue.estimate}`} />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => setOpen(true)} ref={moreButtonRef}>
            <MoreVert />
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
            <MenuItem onClick={handleResetIssue}>Reset</MenuItem>
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

export type IssueListItemSkeletonProps = {
  sizePrimary: string;
  sizeSecondary: string;
};

export function IssueListItemSkeleton({ sizePrimary, sizeSecondary }: IssueListItemSkeletonProps) {
  const classes = useStyles();
  return (
    <>
      <ListItem button disableGutters>
        <ListItemAvatar>
          <Skeleton variant="circle">
            <Avatar />
          </Skeleton>
        </ListItemAvatar>
        <ListItemText primary={<Skeleton width={sizePrimary} />} secondary={<Skeleton width={sizeSecondary} />} />
      </ListItem>
      <div className={classes.vertical}></div>
    </>
  );
}

export function IssueListItemBeginning() {
  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Avatar>
          <Flag />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="This is the beginning of your estimation history! Create a new story to start estimating." />
    </ListItem>
  );
}
