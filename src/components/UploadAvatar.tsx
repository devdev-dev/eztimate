import { Box, Button, createStyles, Grid, makeStyles, Slider, Theme } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import PublishIcon from '@material-ui/icons/Publish';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import React, { MutableRefObject, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

export interface UploadAvatarProps {
  editorRef: MutableRefObject<any>;
  url: string | undefined;
}

export default function UploadAvatar({ editorRef, url }: UploadAvatarProps) {
  const classes = useStyles();

  const [image, setImage] = useState<File | string | undefined>(url);
  const [scale, setScale] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);

  const dropzoneRef = useRef(null);

  return (
    <Box className={classes.container}>
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
          <div {...getRootProps()} className={classes.zone}>
            <input {...getInputProps()} />
            <Grid container spacing={2} className={classes.interactions}>
              <Grid item xs={2}>
                <PublishIcon />
              </Grid>
              <Grid item xs={10}>
                <Button onClick={() => dropzoneRef?.current?.open()}>Upload Image</Button>
              </Grid>
              <Grid item xs={2}>
                <ClearIcon />
              </Grid>
              <Grid item xs={10}>
                <Button onClick={() => setImage(null)}>Remove Avatar</Button>
              </Grid>
              <Grid item xs={2}>
                <PhotoSizeSelectLargeIcon />
              </Grid>
              <Grid item xs={10}>
                <Slider value={scale} onChange={(e, v) => setScale(v as number)} step={0.1} min={0.1} max={10} />
              </Grid>
              <Grid item xs={2}>
                <RotateRightIcon />
              </Grid>
              <Grid item xs={10}>
                <Slider value={rotation} onChange={(e, v) => setRotation(v as number)} min={-180} max={180} />
              </Grid>
            </Grid>
            <AvatarEditor
              width={150}
              height={150}
              ref={editorRef}
              borderRadius={125}
              image={image}
              color={[238, 238, 238, 0.8]}
              rotate={rotation}
              scale={scale}
            />
          </div>
        )}
      </Dropzone>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%'
    },
    zone: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      background: '#eee',
      padding: theme.spacing(4)
    },
    interactions: {
      alignItems: 'flex-end',
      paddingRight: theme.spacing(4)
    }
  })
);
