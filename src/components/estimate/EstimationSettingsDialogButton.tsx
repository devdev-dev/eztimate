import SettingsIcon from '@mui/icons-material/Settings';
import { Container, Dialog, DialogContent, Divider, IconButton, List, ListItem, ListItemText, Paper, Slide, TextField, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useEffect } from 'react';
import { useActiveIssueQuery, useUpdateActiveIssueMutation } from '../../generated/graphql';
import MyAppSettingsLayout from '../layout/MyAppSettingsLayout';

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
    handleClose();
  };

  const handleClose = () => {
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
        sx={{ mr: 1 }}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <MyAppSettingsLayout title="Estimation Settings" onClose={handleClose} onSave={handleSave}>
          <DialogContent>
            <Container component={Paper} maxWidth="md" sx={{ p: { xs: 2, md: 3 } }}>
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
        </MyAppSettingsLayout>
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