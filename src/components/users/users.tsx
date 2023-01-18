import { IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useGetUsersQuery } from "../../providers/usersApi";
import { Delete, Edit, Add } from '@mui/icons-material';
import React from "react";
import { DialogEdit } from "../dialogs/dialog-edit";

interface Users {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export const UserList = () => {
  const { data: users = [] } = useGetUsersQuery(undefined, {refetchOnMountOrArgChange: true});
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ openDialogName, setOpenDialog ] = React.useState(null) as any;

  const openEditDialog = () => {
    setOpenDialog('EDIT');
    handleClose();
  };

  const handleClose = () => {
    setOpenDialog(null);
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: Users) => (
              <TableRow key={user.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align="center">
                <IconButton aria-label="add">
                  <Add />
                </IconButton>
                <IconButton aria-label="edit" onClick={openEditDialog}>
                  <Edit />
                </IconButton>
                <IconButton aria-label="delete">
                  <Delete />
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogEdit open={openDialogName === 'EDIT'} onClose={handleClose}/>
    </>
  );
};