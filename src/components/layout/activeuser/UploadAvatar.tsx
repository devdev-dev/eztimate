import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone, { DropzoneRef } from 'react-dropzone';
import { useActiveUserUpdateMutation, User } from '../../../generated/graphql';

export interface UploadAvatarProps {
  user: Pick<User, '_id' | 'avatar'>;
}

export default function UploadAvatar({ user }: UploadAvatarProps) {
  const [updateUser] = useActiveUserUpdateMutation();

  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);

  const editorRef = useRef<AvatarEditor>(null);
  const dropzoneRef = useRef<DropzoneRef>(null);

  useEffect(() => {
    if (user.avatar) {
      fetch(user.avatar)
        .then(r => r.blob())
        .then(blobFile => setImage(new File([blobFile], 'initial', { type: 'image/jpeg', lastModified: -1 })));
    }
  }, [user.avatar]);

  const updateAvatar = async () => {
    if (user && image) {
      if (image.lastModified === -1) {
        return;
      }

      editorRef?.current?.getImageScaledToCanvas().toBlob(
        blob => {
          if (blob) {
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
                updateUser({ variables: { avatar: body.url } });
              });
          }
        },
        'image/jpeg',
        0.9
      );
    }
  };

  const clearAvatar = async () => {
    updateUser({ variables: { avatar: null } });
  };

  return (
    <Box>
      <Dropzone
        ref={dropzoneRef}
        onDrop={e => setImage(e[0])}
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
              mx: 2
            }}
          >
            <input {...getInputProps()} />
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                left: '50%',
                bottom: '0%',
                transform: 'translate(-50%, 0%)'
              }}
            >
              <IconButton onClick={() => dropzoneRef?.current?.open()}>
                <PublishIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setImage(null);
                  clearAvatar();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <AvatarEditor
              ref={editorRef}
              onImageReady={updateAvatar}
              onMouseUp={updateAvatar}
              width={150}
              height={150}
              borderRadius={125}
              image={image!}
              color={[238, 238, 238, 0.8]}
              rotate={rotation}
              scale={scale}
              disableBoundaryChecks={true}
            />
          </Box>
        )}
      </Dropzone>
    </Box>
  );
}
