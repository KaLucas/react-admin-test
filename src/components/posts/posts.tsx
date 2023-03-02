import {
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { useGetPostsQuery } from "../../providers/postsApi";
import { Delete, Edit, Add } from "@mui/icons-material";
import { useState } from "react";
import DialogDelete from "../dialogs/dialog-delete";
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
  const { data: posts = [], isLoading } =
    useGetPostsQuery(undefined, { refetchOnMountOrArgChange: true }) || {};
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setPostId] = useState() as any;
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 100;

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleEditOpen = (id?: any) => () => {
    setOpenEdit(true);
    setPostId(id) === id;
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setPostId("");
  };

  const handleDeleteOpen = (id: any) => () => {
    setOpenDelete(true);
    setPostId(id);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setPostId("");
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box mt={2}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleEditOpen()}
              >
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
              <TableCell align="center" width="400px">
                Cover
              </TableCell>
              <TableCell size="small">Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              posts?.length > 0 &&
              posts?.map((post: Posts) => (
                <TableRow
                  key={post.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell size="small">
                    <img src={post.cover} alt="Cover Image" width="400px" />
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell width="300px">{post.body}</TableCell>
                  <TableCell align="center" className="icon-button">
                    <IconButton
                      aria-label="edit"
                      onClick={handleEditOpen(post.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={handleDeleteOpen(post.id)}
                    >
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
      {openDelete && (
        <DialogDelete open={openDelete} id={id} onClose={handleDeleteClose} />
      )}
    </>
  );
};
