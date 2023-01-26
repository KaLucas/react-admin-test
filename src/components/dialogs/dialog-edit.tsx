import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-admin";
import { useUpdateUserMutation, useGetUserQuery, useAddUserMutation } from "../../providers/usersApi";

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

export const DialogEdit = (record: any) => {
  const [editMode, setEditMode] = useState(false);
  const [openEdit, setOpenEdit] = useState(false); 
  const [formValue, setFormValue] = useState(initialState);
  const [updateUser] = useUpdateUserMutation();
  const [addUser] = useAddUserMutation();
  const { data, isFetching } = useGetUserQuery(record.id);
  const id = data?.id;

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
    if (!editMode) {
      await addUser(formValue);
      handleClose();
    } else {
      await updateUser(formValue);
      handleClose();
    }
  }

  const handleClose = () => {
    setOpenEdit(record.handleClose);
  };
  
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Dialog open={record.open} onClose={handleClose}>
          {id && !isFetching ? (
            <>
              <DialogTitle>Edit</DialogTitle>
              <DialogContent>
                <TextField
                  label="ID"
                  name="id"
                  fullWidth
                  value={data.id}
                  InputProps={{
                    readOnly: true,
                  }}
                  />
                <TextField
                  label="Name"
                  name="body"
                  size="medium"
                  fullWidth
                  defaultValue={data.body}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  label="E-mail"
                  name="category"
                  fullWidth
                  defaultValue={data.category}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  defaultValue={data.title}
                  onChange={handleInputChange}
                />
                <div>
                  <pre>{JSON.stringify(formValue, undefined, 2)}</pre>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
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