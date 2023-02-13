import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { memo, useState } from "react";
import { Form, ImageField, useRecordContext } from "react-admin";
import {
  useDeletePostMutation,
  useGetPostQuery,
} from "../../providers/postsApi";

const DialogDelete = (props: { open: boolean; onClose: any; id: number }) => {
  const { open, onClose, id } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { data, isFetching } = useGetPostQuery(id);
  const [deletePost] = useDeletePostMutation() || {};

  async function handleDelete() {
    setIsLoading(true);
    await deletePost(id);
    onClose();
  }

  return (
    <>
      <Form onSubmit={handleDelete} noValidate>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          {!isFetching ? (
            <>
              <DialogTitle>Do you really want to delete post {id}?</DialogTitle>
              <DialogContent>
                <ImageField
                  record={data}
                  source="cover"
                  sx={{ "& .RaImageField-image": { width: "100%" } }}
                />
                <Box display="flex" gap={1}>
                  <Typography>ID: </Typography>
                  <Typography fontWeight="bold">{data?.id}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Typography>Category: </Typography>
                  <Typography fontWeight="bold">{data?.category}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Typography>Title: </Typography>
                  <Typography fontWeight="bold">{data?.title}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Typography>Body: </Typography>
                  <Typography fontWeight="bold">{data?.body}</Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button variant="contained" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="success"
                  loading={isLoading}
                  onClick={handleDelete}
                >
                  Delete
                </LoadingButton>
              </DialogActions>
            </>
          ) : (
            <>
              <DialogTitle>Loading...</DialogTitle>
            </>
          )}
        </Dialog>
      </Form>
    </>
  );
};

export default memo(DialogDelete);
