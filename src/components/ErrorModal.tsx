import {model_enum} from "../App";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect} from "react";
import err from "./err.mp3";
import useSound from "use-sound";

type Props = {
  set_modal_state: React.Dispatch<React.SetStateAction<model_enum | undefined>>
  modal_state: model_enum | undefined
}

const handleClose = (set_modal_state: React.Dispatch<React.SetStateAction<model_enum | undefined>>): void => {
  set_modal_state(undefined)
  return void 0
}

const ConnectionExpiredSadly = ({set_modal_state}: any) => {
  return (
    <div>
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
    </div>
  )
}

const ConnectionEstablished = () => {
  return (
    <div>
      <DialogTitle id="alert-dialog-title">
        {"✈️connection established"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          peer went offline!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          window.location.reload()
        }} autoFocus>
          ok
        </Button>
      </DialogActions>
    </div>
  )
}

const ErrorModal: React.FC<Props> = ({
                                       modal_state,
                                       set_modal_state
                                     }) => {
  const [errp] = useSound(err, {volume: 1.2});

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
          {
            modal_state === model_enum.connection_expired_sadly &&
              <ConnectionExpiredSadly set_modal_state={set_modal_state}/>
          }

          {
            modal_state === model_enum.connection_established &&
              <ConnectionEstablished/>
          }

        </Dialog>
      </div>
    </div>
  )
}

export default ErrorModal;
