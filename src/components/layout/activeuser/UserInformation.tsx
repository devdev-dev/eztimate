import { Box, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { User, useUpdateActiveUserMutation } from '../../../generated/graphql';

export interface UserInformationProps {
  user: Pick<User, '_id' | 'name'>;
}

export default function UserInformation({ user }: UserInformationProps) {
  const [updateUser] = useUpdateActiveUserMutation();

  const userNameRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState(user.name);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <TextField label="Your id" variant="outlined" value={user._id} fullWidth disabled />
      <TextField
        ref={userNameRef}
        label="Your name"
        value={userName}
        onChange={e => {
          setUserName(e.target.value);
        }}
        onBlur={e => {
          updateUser({
            variables: {
              input: {
                name: e.target.value
              }
            }
          });
        }}
        onKeyDown={e => {
          if (e.key === 'Escape' || e.key === 'Enter') {
            userNameRef.current?.blur();
          }
        }}
        placeholder="Issue under Estimation"
        variant="outlined"
        fullWidth
        autoComplete="off"
      />
    </Box>
  );
}
