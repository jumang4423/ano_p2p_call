import React, {useEffect} from "react";
import Peer, {DataConnection} from "peerjs";
import ReactLoading from "react-loading";
import {con_msg, id_gen, Set_friend_stream_to} from "./CallComponent_func";
import {model_enum, page_status_type, pill_enum} from "../App";
import calling from "./calling.jpg"
import Messager from "./Messanger";
import Button from '@mui/material/Button';

type Props = {
  p2p_key_img_hash: string,
  UserAudioStream: MediaStream,
  FriendAudioStream: React.MutableRefObject<MediaStream | undefined>,
  isSessionStarted: boolean,
  setIsSessionStarted: React.Dispatch<React.SetStateAction<boolean>>,
  which_pill: pill_enum,
  set_which_pill: React.Dispatch<React.SetStateAction<pill_enum | undefined>>,
  set_cur_page_stat: React.Dispatch<React.SetStateAction<page_status_type>>,
  set_modal_state: React.Dispatch<React.SetStateAction<model_enum | undefined>>,
}

export type message_type = {
  id: string,
  sender: pill_enum,
  message: string,
  lifetime_const: number,
  lifetime_state: number,
}

const CallComponent: React.FC<Props> = ({
                                          p2p_key_img_hash,
                                          UserAudioStream,
                                          FriendAudioStream,
                                          isSessionStarted,
                                          setIsSessionStarted,
                                          which_pill,
                                          set_which_pill,
                                          set_cur_page_stat,
                                          set_modal_state
                                        }) => {
  const peerRef = React.useRef<Peer | undefined>(undefined)
  // message
  const msg_connectionRef = React.useRef<DataConnection | undefined>(undefined)
  const messages = React.useRef<Array<message_type>>([])

  useEffect(() => {
    // TODO: too crap
    let cur_time = 0
    const id = setInterval(() => {
      cur_time += 1
      if (cur_time > 10) {
        // back to pill selection
        set_which_pill(undefined)
        set_cur_page_stat(page_status_type.select_pills)
        set_modal_state(model_enum.connection_expired_sadly)
      }
    }, 1000)


    // take blue, call to the id
    if (which_pill === pill_enum.blue) {
      const peerObj = new Peer(id_gen(p2p_key_img_hash, pill_enum.blue), {debug: 3})
      peerObj.on('open', (_) => {
        // for call
        let call = peerObj.call(id_gen(p2p_key_img_hash, pill_enum.red), UserAudioStream)
        call.on('stream', function (remoteStream) {
          Set_friend_stream_to("friend_audio_stream", FriendAudioStream, remoteStream)
          setIsSessionStarted(true)
          clearInterval(id)
        });
        // for message
        con_msg(
          id_gen(p2p_key_img_hash, pill_enum.red),
          msg_connectionRef,
          peerObj,
          messages,
        )
      })
      peerRef.current = peerObj
    } else {
      const peerObj = new Peer(id_gen(p2p_key_img_hash, which_pill), {debug: 3})
      peerObj.on('open', (_) => {
        // for call
        peerObj.on('call', function (call) {
          call.answer(UserAudioStream);
          call.on('stream', function (remoteStream) {
            Set_friend_stream_to("friend_audio_stream", FriendAudioStream, remoteStream)
            setIsSessionStarted(true)
            clearInterval(id)
          });
        });
        // for message
        con_msg(
          id_gen(p2p_key_img_hash, pill_enum.blue),
          msg_connectionRef,
          peerObj,
          messages,
        )
      })
      peerRef.current = peerObj
    }

    let cur_con_num: number | undefined = undefined
    const connection_checker = setInterval(() => {
      if (peerRef.current !== undefined) {
        // friends peer id
        const friend_id = id_gen(p2p_key_img_hash, which_pill === pill_enum.blue ? pill_enum.red : pill_enum.blue)
        const all_connections = peerRef.current.connections as any
        if (cur_con_num === undefined) {
          cur_con_num = all_connections[friend_id].length
        } else {
          const new_con_num = all_connections[friend_id].length
          if (new_con_num !== cur_con_num && new_con_num === 1) {
            set_modal_state(model_enum.connection_established)
          }
        }
      }
    }, 1000)

    return () => {
      cur_time = 0
      clearInterval(id)
      clearInterval(connection_checker)
      if (peerRef.current !== undefined) {
        peerRef.current.destroy()
      }
    }

  }, [])

  return (
    <div>
      {
        !isSessionStarted &&
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "32px",
            marginTop: "16px",
          }}>
              <div style={{
                color: 'white',
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                marginTop: "16px",
              }}>
                  <div style={{
                    marginRight: "8px",
                  }}>
                      <ReactLoading type={"spinningBubbles"} color={"gray"} height={18} width={18}/>
                  </div>
                  <div>
                      trying to connect to peer, please wait...
                  </div>
              </div>
          </div>
      }

      {
        isSessionStarted &&
          <div style={{
            margin: "32px 0",
            width: "100%",
            border: "1px solid green",
          }}>
              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "16px",
              }}>
                  <img
                      src={calling}
                      width={"70%"}
                      height={"70%"}
                      alt={"calling"}
                      style={{
                        borderRadius: "8px",
                      }}/>
              </div>

              <Messager messages={messages} which_pill={which_pill}
                        con={msg_connectionRef.current!}/>
              <div style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "16px",
                marginLeft: "32px",
              }}>
                  <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        window.location.reload()
                      }}>
                      Disconnect
                  </Button>
              </div>
          </div>
      }

      <div style={{
        position: 'relative',
        width: '100%',
        height: '0',

      }}>
        <video playsInline autoPlay muted={false} id="friend_audio_stream" hidden/>
      </div>

    </div>
  )
}

export default CallComponent
