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
  id: 0,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
  },
  phone: ''
};

export const DialogEdit = (record: any) => {
  const { data } = useGetUserQuery(record.user);
  const id = data?.id;
  const [editMode, setEditMode] = useState(false);
  const [openEdit, setOpenEdit] = useState(false); 
  const [formValue, setFormValue] = useState(initialState);
  const [updateUser] = useUpdateUserMutation();
  const [addUser] = useAddUserMutation();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
        <Dialog open={record.open} onClose={record.handleClose}>
          {data?.id ? (
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
                  name="name"
                  size="medium"
                  fullWidth
                  defaultValue={data.name}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  label="E-mail"
                  name="email"
                  fullWidth
                  defaultValue={data.email}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={record.handleClose}>Cancel</Button>
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