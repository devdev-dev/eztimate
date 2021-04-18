import { Box, createStyles, IconButton, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import React, { MutableRefObject, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

export interface UploadAvatarProps {
  editorRef: MutableRefObject<any>;
}

export default function UploadAvatar({ editorRef }: UploadAvatarProps) {
  const classes = useStyles();

  const [image, setImage] = useState<File>(null);

  const dropzoneRef = useRef(null);

  return (
    <Box className={classes.container}>
      <Dropzone ref={dropzoneRef} onDrop={e => setImage(e[0])} accept={['image/jpeg', 'image/png']} maxFiles={1} multiple={false} noKeyboard noClick>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={classes.zone}>
            <input {...getInputProps()} />
            <AvatarEditor ref={editorRef} borderRadius={125} image={image} color={[255, 255, 255, 0.8]} />
            <Box className={classes.buttonContainer}>
              <IconButton className={classes.uploadButton} onClick={() => dropzoneRef?.current?.open()}>
                <PublishIcon />
              </IconButton>
              <IconButton className={classes.removeButton} onClick={() => setImage(null)}>
                <ClearIcon />
              </IconButton>
            </Box>
          </div>
        )}
      </Dropzone>
    </Box>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: '100%'
    },
    zone: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
      position: 'absolute',
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      '& button': {}
    },
    uploadButton: {},
    removeButton: {}
  })
);
