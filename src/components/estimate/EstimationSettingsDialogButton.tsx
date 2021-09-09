import { Container, DialogContent, DialogTitle, Paper, Slide, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { useEffect } from 'react';
import { useActiveIssueQuery, useUpdateActiveIssueMutation } from '../../generated/graphql';
import { StyledToolbar } from '../../pages/instant';

const CUSTOM_STACK_ID = 'customstack';

export default function EstimationSettingsDialogButton() {
  const [open, setOpen] = React.useState(false);

  const { data, loading, error } = useActiveIssueQuery();
  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  const [selectedId, setSelectedId] = React.useState('');
  const [customStack, setCustomStack] = React.useState<string[]>([]);

  useEffect(() => {
    const storedStack = data?.getActiveIssue?.stack ?? [];
    const defaultStack = DEFAULT_CARD_STACKS.find(s => {
      return s.values.length === storedStack.length && s.values.every((val, index) => val === storedStack[index]);
    });
    if (defaultStack) {
      handleStackSelect(defaultStack.id, defaultStack.values);
    } else {
      handleStackSelect(CUSTOM_STACK_ID, storedStack);
    }
  }, [data]);

  const handleSave = () => {
    const selectedStack = DEFAULT_CARD_STACKS.find(s => s.id === selectedId);
    if (selectedStack) {
      updateActiveIssue({ variables: { stack: selectedStack.values } });
    } else {
      updateActiveIssue({ variables: { stack: customStack } });
    }
    setOpen(false);
  };

  const handleStackSelect = (id: string, values: string[]) => {
    setSelectedId(id);
    setCustomStack(values);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <AppBar position="sticky" color="transparent" variant="outlined" sx={{ bgcolor: 'white' }}>
          <StyledToolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle sx={{ ml: 2, flex: 1 }}>Estimation Settings</DialogTitle>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </StyledToolbar>
        </AppBar>

        <DialogContent sx={{ mb: 4 }} dividers>
          <Container component={Paper} maxWidth="md" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h2" variant="h5">
              Card Stack
            </Typography>
            <List>
              {DEFAULT_CARD_STACKS.map(stack => (
                <ListItem key={stack.id} button selected={selectedId === stack.id} onClick={() => handleStackSelect(stack.id, stack.values)}>
                  <ListItemText primary={stack.name} secondary={stack.values.join(', ')} />
                </ListItem>
              ))}
              <Divider />
              <ListItem button selected={selectedId === CUSTOM_STACK_ID} onClick={() => handleStackSelect(CUSTOM_STACK_ID, customStack)}>
                <ListItemText primary="Custom Card Stack" secondary="Create your own card stack" />
                <TextField
                  autoComplete="off"
                  onChange={e => {
                    setCustomStack(e.target.value.replaceAll(' ', '').split(','));
                  }}
                  value={customStack.join(', ')}
                />
              </ListItem>
            </List>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const DEFAULT_CARD_STACKS = [
  {
    id: 'simpledescriptive',
    name: 'Simple Descriptive',
    values: ['Small', 'Medium', 'Large']
  },
  {
    id: 'scrumfibonacci',
    name: 'Scrum Fibonacci',
    values: ['0', '½', '1', '2', '3', '5', '8', '13']
  },
  {
    id: 'realfibonacci',
    name: 'Real Fibonacci',
    values: ['0', '1', '2', '3', '5', '8', '13', '21']
  },
  {
    id: 'thepoweroftwo',
    name: 'The Power of Two',
    values: ['0', '2', '4', '8', '16', '32']
  },
  {
    id: 'tshirtsizes',
    name: 'T-Shirt Sizes',
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});