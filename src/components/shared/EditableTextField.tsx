import { createStyles, IconButton, InputAdornment, makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useRef, useState } from 'react';

export interface EditableTextFieldProps {
  inputValue: string;
  onSave: (value: String) => void;
}

export default function EditableTextField({ inputValue, onSave }: EditableTextFieldProps) {
  const classes = useStyles();

  const [value, setValue] = useState(inputValue);
  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const [disabled, setDisabled] = useState<boolean>(true);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  const handleSave = () => {
    onSave(textFieldRef.current.value);
    setDisabled(!disabled);
  };

  const handleClose = () => {
    setValue(inputValue);
    setDisabled(!disabled);
  };

  return (
    <TextField
      name="editableField"
      label={disabled ? '' : 'Name'}
      value={value}
      disabled={disabled}
      onChange={e => {
        setValue(e.target.value);
      }}
      variant={'outlined'}
      fullWidth
      inputRef={textFieldRef}
      autoComplete="off"
      InputProps={{
        className: classes.nameFieldInput,
        classes: {
          disabled: classes.disabled
        },
        startAdornment: (
          <InputAdornment position="start">
            {disabled ? (
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            ) : (
              <>
                <IconButton onClick={handleSave}>
                  <CheckIcon />
                </IconButton>
              </>
            )}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {disabled ? (
              <></>
            ) : (
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            )}
          </InputAdornment>
        )
      }}
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    disabled: {
      '& fieldset': {
        border: 'none'
      }
    },
    nameField: {
      '& .MuiInputBase-root fieldset, & .MuiFormLabel-root, & .MuiInputAdornment-root': {
        visibility: 'hidden'
      },
      '&:hover .MuiInputAdornment-root, &:hover .MuiFormLabel-root,&:hover .MuiInputBase-root fieldset': {
        visibility: 'visible'
      },
      '& .MuiInputBase-root.Mui-focused fieldset, & .Mui-focused .MuiInputAdornment-root, & .MuiFormLabel-root.Mui-focused': {
        visibility: 'visible'
      }
    },
    nameFieldInput: {
      fontSize: theme.typography.h5.fontSize
    }
  })
);
