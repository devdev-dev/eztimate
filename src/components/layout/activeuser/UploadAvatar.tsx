import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { useActiveUserQuery, useActiveUserUpdateMutation } from '../../../generated/graphql';

export default function UploadAvatar() {
  const { data, loading, error } = useActiveUserQuery();
  const [updateUser] = useActiveUserUpdateMutation();

  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);

  const editorRef = useRef<AvatarEditor>(null);
  const dropzoneRef = useRef(null);

  const updateUserAvatar = async () => {
    if (image) {
      editorRef?.current?.getImageScaledToCanvas().toBlob(
        blob => {
          if (blob) {
            const formData = new FormData();
            formData.append('avatar', blob);
            formData.append('name', data?.getActiveUser?._id + '_' + Math.random().toString(36).substr(2, 9));
            formData.append('oldimage', data?.getActiveUser?.avatar ?? undefined);
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
    } else {
      updateUser({ variables: { avatar: null } });
    }
  };

  useEffect(() => {
    if (data?.getActiveUser?.avatar) {
      fetch(data?.getActiveUser?.avatar)
        .then(r => r.blob())
        .then(blobFile => setImage(new File([blobFile], 'avatar', { type: 'image/jpeg' })));
    }
  }, []);

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
                  updateUserAvatar();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <AvatarEditor
              ref={editorRef}
              onImageReady={updateUserAvatar}
              onMouseUp={updateUserAvatar}
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