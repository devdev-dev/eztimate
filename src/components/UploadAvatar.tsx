import { Box, createStyles, IconButton, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

export default function UploadAvatar() {
  const classes = useStyles();

  const [image, setImage] = useState<File>(null);

  const dropzoneRef = useRef(null);
  const openDropzoneDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const handleDrop = dropped => {
    setImage(dropped[0]);
    console.log(image);
  };

  const handleClear = () => {
    setImage(null);
  };

  return (
    <Box className={classes.container}>
      <Dropzone ref={dropzoneRef} onDrop={handleDrop} accept={['image/jpeg', 'image/png']} maxFiles={1} multiple={false} noKeyboard noClick>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={classes.zone}>
            <input {...getInputProps()} />
            <AvatarEditor borderRadius={125} image={image} color={[255, 255, 255, 0.8]} />
            <Box className={classes.buttonContainer}>
              <IconButton className={classes.uploadButton} onClick={openDropzoneDialog}>
                <PublishIcon />
              </IconButton>
              <IconButton className={classes.removeButton} onClick={handleClear}>
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
