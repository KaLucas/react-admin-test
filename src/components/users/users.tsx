import { IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useGetUsersQuery } from "../../providers/usersApi";
import { Delete, Edit, Add } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { DialogEdit } from "../dialogs/dialog-edit";
import { DialogDelete } from "../dialogs/dialog-delete";

export interface Posts {
  body: string;
  category: string;
  cover: string;
  createdAt: string;
  id: number;
  isDraft: boolean;
  title: string;
  views: number;
}

export const UserList = () => {
  const { data: users = [], isLoading, error } = useGetUsersQuery(undefined, {refetchOnMountOrArgChange: true});
  console.log(users);
  
  const [openEdit, setOpenEdit] = useState(false);    
  const [openDelete, setOpenDelete] = useState(false);
  const [userId, setUserId] = useState() as any;

  useEffect(() => {
    if (error) {
      <h3>ERROR!!</h3>;
    }
  }, [error]);

  if (isLoading) {
    return <h3>Loading...</h3>;
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
              <TableCell>Body</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Cover</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.map((user: Posts) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" width="300px">{user.body}</TableCell>
              <TableCell>{user.category}</TableCell>
              <TableCell><img src={user.cover} alt="" width="80px" height="80px"/></TableCell>
              <TableCell>{user.title}</TableCell>
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
      <DialogEdit open={openEdit} handleClose={handleEditClose} />
      {/* <DialogDelete open={openDelete} handleClose={handleDeleteClose} /> */}
    </>
  );
};