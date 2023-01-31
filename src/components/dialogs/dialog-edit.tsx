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
import { useUpdateUserMutation, useGetUserQuery, useAddUserMutation } from "../../providers/usersApi";
import { LoadingButton } from "@mui/lab";

const initialState = {
  body: '',
  category: '',
  cover: '',
  createdAt: '',
  id: 0,
  isDraft: false,
  title: '',
  views: 0,
};

const DialogEdit = (props: { open: boolean, onClose: any, id: number }) => {
  const {open, onClose, id} = props;
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [formValue, setFormValue] = useState(initialState);
  const [updateUser] = useUpdateUserMutation();
  const [addUser] = useAddUserMutation();
  const { data, isFetching } = useGetUserQuery(id);

  const categories = [
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
      await addUser(formValue);
      onClose();
    } else {
      await updateUser(formValue);
      onClose();
    }
  }
  
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Dialog open={open} onClose={onClose} keepMounted>
          {id && !isFetching ? (
            <>
              <DialogTitle>Edit</DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="ID"
                      name="id"
                      value={data.id}
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      sx={{ p: 0 }}
                      fullWidth
                      name="category"
                      select
                      label="Category"
                      defaultValue={data.category}
                      SelectProps={{
                        native: true,
                      }}
                      margin="dense"
                      onChange={handleInputChange}
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
                  label="Name"
                  name="body"
                  size="medium"
                  fullWidth
                  defaultValue={data.body}
                  onChange={handleInputChange}
                  required
                  margin="dense"
                />
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  defaultValue={data.title}
                  onChange={handleInputChange}
                  margin="dense"
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