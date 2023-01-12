import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function CharacterDetailsDialog(props: any) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.onClose()}>
      <DialogTitle>Dialog</DialogTitle>
      <DialogContent>Some content</DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}