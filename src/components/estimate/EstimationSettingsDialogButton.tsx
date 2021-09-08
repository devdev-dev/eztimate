import { Container, Paper, Slide, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { useUpdateActiveIssueMutation } from '../../generated/graphql';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EstimationSettingsDialogButton() {
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');
  const [customStack, setCustomStack] = React.useState<string[]>([]);

  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const selectedStack = DEFAULT_CARD_STACKS.find(s => s.id === selectedId);
    if (selectedStack) {
      updateActiveIssue({ variables: { stack: selectedStack.values } });
    } else {
      updateActiveIssue({ variables: { stack: customStack } });
    }
    handleClose();
  };

  const handleStackSelect = (id: string, values: string[]) => {
    setSelectedId(id);
    setCustomStack(values);
  };

  return (
    <div>
      <IconButton edge="start" color="inherit" onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Estimation Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper elevation={2} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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
              <ListItem button selected={selectedId === 'customstack'} onClick={() => handleStackSelect('customstack', customStack)}>
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
          </Paper>
        </Container>
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