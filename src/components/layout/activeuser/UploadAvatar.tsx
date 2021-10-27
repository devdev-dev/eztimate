import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { Box, Button, Grid, IconButton, Slider, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone, { DropzoneRef } from 'react-dropzone';
import { User, useUpdateActiveUserMutation } from '../../../generated/graphql';
import debounce from 'lodash/debounce';

export interface UploadAvatarProps {
  user: Pick<User, '_id' | 'avatar'>;
}

export default function UploadAvatar({ user }: UploadAvatarProps) {
  const { updateUserImage } = useUpdateUserImage(user);

  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);

  const editorRef = useRef<AvatarEditor>(null);
  const dropzoneRef = useRef<DropzoneRef>(null);

  useEffect(() => {
    if (image === null && user && user.avatar) {
      fetch(user.avatar)
        .then(r => r.blob())
        .then(blobFile => setImage(new File([blobFile], 'initial', { type: 'image/jpeg', lastModified: -1 })));
    }
  }, [user.avatar]);

  const updateImageFromEditor = useCallback(
    () =>
      editorRef?.current?.getImageScaledToCanvas().toBlob(
        blob => {
          if (blob) {
            updateUserImage(blob);
          }
        },
        'image/jpeg',
        0.9
      ),
    []
  );

  return (
    <Box>
      <Dropzone
        ref={dropzoneRef}
        onDrop={e => {
          if (e[0]) {
            setImage(e[0]);
            updateUserImage(e[0].slice());
          }
        }}
        accept={['image/jpeg', 'image/png']}
        maxFiles={1}
        multiple={false}
        maxSize={5000000}
        noKeyboard
        noClick
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            sx={{
              position: 'relative',
              mr: 2
            }}
          >
            <input {...getInputProps()} />
            <AvatarEditor
              ref={editorRef}
              onMouseUp={updateImageFromEditor}
              style={{ width: '100%', height: '100%', aspectRatio: '1/1' }}
              borderRadius={125}
              image={image!}
              color={[238, 238, 238, 0.8]}
              rotate={rotation}
              scale={scale}
              disableBoundaryChecks={true}
            />
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" onClick={() => dropzoneRef?.current?.open()}>
                  Upload
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  disabled={image === null}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setImage(null);
                    updateUserImage(null);
                  }}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Resize the Avatar">
                  <PhotoSizeSelectLargeIcon />
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  disabled={image === null}
                  value={scale}
                  onChangeCommitted={updateImageFromEditor}
                  onChange={(e, v) => setScale(v as number)}
                  step={0.1}
                  min={0.1}
                  max={10}
                />
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Rotate the Avatar">
                  <RotateRightIcon />
                </Tooltip>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  disabled={image === null}
                  value={rotation}
                  onChangeCommitted={updateImageFromEditor}
                  onChange={(e, v) => setRotation(v as number)}
                  min={-180}
                  max={180}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Dropzone>
    </Box>
  );
}

function useUpdateUserImage(user: Pick<User, '_id' | 'avatar'>) {
  const [updateUser] = useUpdateActiveUserMutation();

  return {
    updateUserImage: (blob: Blob | null) => {
      if (blob === null) {
        updateUser({
          variables: {
            input: {
              avatar: null
            }
          }
        });
        return;
      } else {
        const formData = new FormData();
        formData.append('avatar', blob);
        formData.append('name', user._id + '_' + Math.random().toString(36).substr(2, 9));
        formData.append('oldimage', user.avatar ?? '');
        fetch('/api/s3', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            return response.json();
          })
          .then(body => {
            updateUser({ variables: { input: { avatar: body.url } } });
          });
      }
    }
  };
}
