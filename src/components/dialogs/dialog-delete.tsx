import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";

export const DialogDelete: React.FC<{open: boolean, handleClose: any}> = ({open, handleClose}) => {
  const classes = {};
  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        {/* <DialogTitle onClose={handleClose}>
          Register
        </DialogTitle> */}
        <DialogContent dividers>...delete...</DialogContent>
      </Dialog>
    </div>
  );
  
  // return (
  //   <div>
  //     <Dialog open={open} onClose={handleClose}>
  //     <DialogTitle>Subscribe</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText>
  //         To subscribe to this website, please enter your email address here. We
  //         will send updates occasionally.
  //       </DialogContentText>
  //       <TextField
  //         autoFocus
  //         margin="dense"
  //         id="name"
  //         label="Email Address"
  //         type="email"
  //         fullWidth
  //         variant="standard"
  //       />
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={handleClose}>Cancel</Button>
  //       <Button onClick={handleClose}>Subscribe</Button>
  //     </DialogActions>
  //   </Dialog>
  //   </div>
  // )
}