import { IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Grid, Button } from "@mui/material";
import { useGetPostsQuery } from "../../providers/postsApi";
import { Delete, Edit, Add } from '@mui/icons-material';
import { useState } from "react";
import { DialogDelete } from "../dialogs/dialog-delete";
import DialogEdit from "../dialogs/dialog-edit";

export interface Posts {
  id?: number;
  body: string;
  category: string;
  cover: string;
  createdAt: string | Date;
  isDraft: boolean;
  title: string;
  views: number;
}

export const PostsList = () => {
  const { data: posts = [], isLoading } = useGetPostsQuery(undefined, {refetchOnMountOrArgChange: true}) || {};
  const [openEdit, setOpenEdit] = useState(false);    
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setUserId] = useState() as any;
  const tableHeight =(window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight * 100;
  
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleEditOpen = (id?: any) => (e: any) => {
    setOpenEdit(true);
    setUserId(id);
  };

  const handleEditClose = () => {
    setOpenEdit(false)
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
      <Box sx={{mb: 3}}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box mt={2}>
            <Button variant="outlined" startIcon={<Add />} onClick={handleEditOpen()}>
              Add New
            </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: `${tableHeight}vh` }}>
        <Table aria-label="table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Body</TableCell>
              <TableCell size="small">Category</TableCell>
              <TableCell align="center">Cover</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {!isLoading && posts?.length > 0 && posts?.map((post: Posts) => (
            <TableRow key={post.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" width="300px">{post.body}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell align="center" size="small"><img src={post.cover} alt="Cover Image" width="300px"/></TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell align="center">
              <IconButton aria-label="edit" onClick={handleEditOpen(post.id)}>
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
      {openEdit && (
        <DialogEdit open={openEdit} id={id} onClose={handleEditClose} />
        )}
        {/* <DialogDelete open={openDelete} handleClose={handleDeleteClose} /> */}
    </>
  );
};