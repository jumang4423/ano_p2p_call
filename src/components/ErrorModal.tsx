import {model_enum} from "../App";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from "react";
import err from "./err.mp3";
import useSound from "use-sound";
import on_start_call from "../on_start_call.mp3";

type Props = {
  set_modal_state: React.Dispatch<React.SetStateAction<model_enum | undefined>>
  modal_state: model_enum | undefined
}

const handleClose = (set_modal_state: React.Dispatch<React.SetStateAction<model_enum | undefined>>) => {
  set_modal_state(undefined)

  return void 0
}

const ErrorModal: React.FC<Props> = ({
                                       modal_state,
                                       set_modal_state
                                     }) => {
  const [errp] = useSound(err, {volume: 1.5});

  useEffect(() => {
    if (modal_state === model_enum.connection_expired_sadly) {
      errp()
    }
  }, [modal_state])


  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
    }}>
      <div style={{
        margin: '32px 16px 32px 16px',
      }}>
        <Dialog
          open={modal_state !== undefined}
          onClose={() => handleClose(set_modal_state)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"😪could not to connect to peer"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              maybe you choose the wrong flower, or the peer is not online!
              so you can try again!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(set_modal_state)} autoFocus>
              try again
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default ErrorModal;
