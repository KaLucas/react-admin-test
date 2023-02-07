import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Form, TextInput, SelectInput, ImageField, ImageInput } from "react-admin";
import { useUpdatePostMutation, useGetPostQuery, useAddPostMutation } from "../../providers/postsApi";
import { LoadingButton } from "@mui/lab";
import { Posts } from "../posts/posts";

const initialState = {
  id: 0 || undefined,
  body: '',
  category: '',
  cover: '',
  createdAt: new Date().toISOString(),
  isDraft: false,
  title: '',
  views: 0
}

const DialogEdit = (props: { open: boolean, onClose: any, id: number }) => {
  
  const {open, onClose, id} = props;
  const [formValue, setFormValue] = useState<Posts>(initialState);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [addPost] = useAddPostMutation() || {};
  const [updatePost] = useUpdatePostMutation() || {};
  const {data, isFetching} = useGetPostQuery(id);
  const [preview, setPreview] = useState<string | undefined>()

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({...data});
      }
    } else {
      setEditMode(false);
      setFormValue({...initialState});
    }
  }, [id, data]);

  const handleInputChange = (e: any) => {
    const { target } = e;
    let name = '';
    let value = '';

    if (target === undefined) {
      const objectUrl = URL.createObjectURL(e)
      setPreview(objectUrl)
      name = 'cover';
      value = e.name;
    } else {
      name = target.name;
      value = target.value;
    }
    setFormValue({...formValue, [name]: value});
  }
  
  const handleSubmit = async() => {
    setIsLoading(true)
    if (!editMode) {
      await addPost(formValue);
      onClose();
    } else {
      await updatePost(formValue);
      onClose();
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <Dialog open={open} onClose={onClose} keepMounted>
          {!isFetching ? (
            <>
              <DialogTitle>{editMode ? 'Edit' : 'Add'}</DialogTitle>
              <DialogContent>
                {id ? (
                  <ImageField record={data} source="cover" sx={{ '& .RaImageField-image': { width: '100%' } }} />
                  ) : (
                    <>
                      <ImageInput 
                      source="data"
                      label="Related pictures"
                      accept="image/*"
                      onChange={handleInputChange}>
                        <img src={preview} alt='Preview Image' width='100%' />
                      </ImageInput>
                    </>
                  )
                }
                <Grid container spacing={1}>
                  {id && (
                    <Grid item xs={8}>
                      <TextInput
                        fullWidth
                        label="ID"
                        name="id"
                        source="id"
                        defaultValue={data?.id}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    )
                  }
                  <Grid item xs={4}>
                    <SelectInput 
                      fullWidth
                      name="category"
                      select
                      label="Category"
                      source="category"
                      defaultValue={data?.category}
                      onChange={handleInputChange}
                      required
                      choices={[
                        {id: 'one', name: 'One'},
                        {id: 'two', name: 'Two'},
                        {id: 'three', name: 'Three'},
                        {id: 'four', name: 'Four'}
                      ]}
                    />
                  </Grid>
                </Grid>
                <TextInput label="Body" name="body" source="body" defaultValue={data?.body} fullWidth multiline required onChange={handleInputChange} resettable />
                <TextInput label="Title" name="title" source="title" defaultValue={data?.title} fullWidth multiline required onChange={handleInputChange} resettable />
                <div>
                  <p><strong>Payload after input change</strong></p>
                  <pre>{JSON.stringify(formValue, undefined, 2)}</pre>
                </div>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
                <LoadingButton variant="contained" color="success" loading={isLoading} onClick={handleSubmit}>Save</LoadingButton>
              </DialogActions>
            </>
          ) : (
            <>
              <DialogTitle>Loading...</DialogTitle>
            </>
          )
          }
        </Dialog>
      </Form>
    </>
  )
}

export default memo(DialogEdit)