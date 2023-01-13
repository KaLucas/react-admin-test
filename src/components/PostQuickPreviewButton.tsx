import { useState } from 'react';
import { Drawer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { KeyboardArrowRight, RemoveRedEye } from '@mui/icons-material';
import { Button, SimpleShowLayout, TextField, useGetOne } from 'react-admin';

const useStyles = makeStyles({
  field: {
    '& span': {
        display: 'inline-block',
        maxWidth: '20em'
    }
  }
});

const PostQuickPreviewButton = ( res: {id: any, open: boolean} ) => {
  const [showPanel, setShowPanel] = useState(false);
  const classes = useStyles();
  console.log(res.id);
  
  const { data } = useGetOne('characters', res.id);

  const handleClick = () => {
    setShowPanel(res.open);
  };

  const handleCloseClick = () => {
    setShowPanel(res.open);
  };

  return (
    <>
      <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
        <div>
          <Button label="Close" onClick={handleCloseClick}>
            <KeyboardArrowRight />
          </Button>
        </div>
        <SimpleShowLayout record={data}>
          <TextField source="id" />
          <TextField source="title" className={classes.field} />
          <TextField source="teaser" className={classes.field} />
        </SimpleShowLayout>
      </Drawer>
    </>
  );
};

export default PostQuickPreviewButton;
