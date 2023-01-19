import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import { useRecordContext } from "react-admin";
import { useDispatch, useSelector } from "react-redux";
import { useEditUsersMutation } from "../../providers/usersApi";
import { Users } from "../users/users";
import { useState } from "react";

interface Props {
  record?: Users;
  open: any;
  handleClose: () => void;
}

export const DialogEdit = (props: Props) => {
  const { open, handleClose, record } = props;
  console.log(record);
  
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}