import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  NativeSelect,
  Box
} from "@mui/material";
import { useState } from "react";
import { useEditUsersMutation, useGetUserQuery } from "../../providers/usersApi";

export const DialogEdit = (record: any) => {
  const {data} = useGetUserQuery(record.user);
  
  const [editUsers] = useEditUsersMutation();

  // const handleInputChange = (e: any) => {
  //   let { name, value } = e.target;
  //   setFormValue({...formValue, [name]: value});
  // }

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   await editUsers(formValue);
  //   handleClose();
  // }
  
  return (
    <>
      <Dialog open={record.open} onClose={record.handleClose}>
        {data?.id ? (
          <>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
              <TextField
                label="ID"
                fullWidth
                value={data.id}
                InputProps={{
                  readOnly: true,
                }}
                />
              <TextField
                label="Name"
                size="medium"
                fullWidth
                defaultValue={data.name}
              />
              <TextField
                label="E-mail"
                fullWidth
                defaultValue={data.email}
              />
              <Box display="flex" gap="50px" marginTop="20px">
                <Box>
                  <InputLabel>Gender</InputLabel>
                  <NativeSelect
                    defaultValue={data.gender}
                    inputProps={{
                      name: 'gender'
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </NativeSelect>
                </Box>
                <Box>
                  <InputLabel>Status</InputLabel>
                  <NativeSelect
                    defaultValue={data.status}
                    inputProps={{
                      name: 'status'
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </NativeSelect>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={record.handleClose}>Cancel</Button>
              <Button>Save</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Loading...</DialogTitle>
          </>
        )
        }
      </Dialog>
    </>
  )
}