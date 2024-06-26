import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  open: boolean,
  textTitle: string,
  textContent: string,
  textCloseBtn: string,
  textOKBtn: string,
  handleClose: Function,
  handleOK: Function
};

export default function ConfirmDialog(
  {open, textTitle, textContent, textCloseBtn, textOKBtn, handleClose, handleOK}: Props
) {
  return (
  <Dialog open={open}>
    <DialogTitle>
      {textTitle}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {textContent}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>{handleClose()}} autoFocus>{textCloseBtn}</Button>
      <Button onClick={()=>{handleOK()}}>
        {textOKBtn}
      </Button>
    </DialogActions>
  </Dialog>
  )
};