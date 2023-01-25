import { IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useGetUsersQuery } from "../../providers/usersApi";
import { Delete, Edit, Add } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { DialogEdit } from "../dialogs/dialog-edit";
import { DialogDelete } from "../dialogs/dialog-delete";

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
  phone: string;
}

export const UserList = () => {
  const { data: users = [], isLoading } = useGetUsersQuery(undefined, {refetchOnMountOrArgChange: true});
  console.log(users);
  
  const [page, setPage] = useState(1)
  const [openEdit, setOpenEdit] = useState(false);    
  const [openDelete, setOpenDelete] = useState(false);
  const [userId, setUserId] = useState() as any;

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  const handleEditOpen = (userId: any) => (e: any) => {
    setOpenEdit(true);
    setUserId(userId);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setUserId('');
  };
  // const handleDeleteOpen = () => {
  //   setOpenDelete(true);
  // };

  // const handleDeleteClose = () => {
  //   setOpenDelete(false);
  // };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.map((user: Users) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell align="center">
              <IconButton aria-label="add">
                <Add />
              </IconButton>
              <IconButton aria-label="edit" onClick={handleEditOpen(user.id)}>
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
      <DialogEdit open={openEdit} user={userId} handleClose={handleEditClose} />
      {/* <DialogDelete open={openDelete} handleClose={handleDeleteClose} /> */}
    </>
  );
};