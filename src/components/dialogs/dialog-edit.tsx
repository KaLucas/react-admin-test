import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Form } from "react-admin";
import { useUpdatePostMutation, useGetPostQuery, useAddPostMutation } from "../../providers/postsApi";
import { LoadingButton } from "@mui/lab";
import { Posts } from "../posts/posts";

const initialState = {
  id: 0 || undefined,
  body: '',
  category: '',
  cover: '',
  createdAt: '',
  isDraft: false,
  title: '',
  views: 0,
};

const DialogEdit = (props: { open: boolean, onClose: any, id: number }) => {
  
  const {open, onClose, id} = props;
  const [formValue, setFormValue] = useState<Posts>(initialState);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [addPost] = useAddPostMutation() || {};
  const [updatePost] = useUpdatePostMutation() || {};
  const {data, isFetching} = useGetPostQuery(id);

  const categories = [
    {
      value: 'choose',
      label: 'Category'
    },
    {
      value: 'one',
      label: 'One'
    },
    {
      value: 'two',
      label: 'Two',
    },
    {
      value: 'three',
      label: 'Three',
    },
    {
      value: 'four',
      label: 'Four',
    },
  ];
  
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
    let { name, value } = e.target;
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
      <Form onSubmit={handleSubmit}>
        <Dialog open={open} onClose={onClose} keepMounted>
          {!isFetching ? (
            <>
              <DialogTitle>{editMode ? 'Edit' : 'Add'}</DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  {id && (
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        label="ID"
                        name="id"
                        value={data?.id}
                        InputProps={{
                          readOnly: true,
                        }}
                        margin="dense"
                      />
                    </Grid>
                    )
                  }
                  <Grid item xs={4}>
                    <TextField
                      sx={{ p: 0 }}
                      fullWidth
                      name="category"
                      select
                      label="Category"
                      defaultValue={editMode ? data?.category : 'choose'}
                      SelectProps={{
                        native: true,
                      }}
                      margin="dense"
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map((option: any) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <TextField
                  label="Body"
                  name="body"
                  size="medium"
                  fullWidth
                  defaultValue={editMode ? data?.body : ''}
                  onChange={handleInputChange}
                  required
                  margin="dense"
                />
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  defaultValue={editMode ? data?.title : ''}
                  onChange={handleInputChange}
                  margin="dense"
                  required
                />
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