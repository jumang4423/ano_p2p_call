import React, {useEffect} from "react";
import Peer from "peerjs";
import ReactLoading from "react-loading";
import {Set_friend_stream_to} from "./CallComponent_func";
import {model_enum, page_status_type, pill_enum} from "../App";
import calling from "./calling.jpg"

type Props = {
  p2p_key_img_hash: string,
  UserAudioStream: MediaStream,
  FriendAudioStream: React.MutableRefObject<MediaStream | undefined>,
  isSessionStarted: boolean,
  setIsSessionStarted: React.Dispatch<React.SetStateAction<boolean>>,
  which_pill: pill_enum,
  set_which_pill:  React.Dispatch<React.SetStateAction<pill_enum | undefined>>,
  set_cur_page_stat: React.Dispatch<React.SetStateAction<page_status_type>>,
  set_modal_state: React.Dispatch<React.SetStateAction<model_enum | undefined>>,
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
      const peerObj = new Peer("", {debug: 3})
      peerObj.on('open', (_) => {
        let call = peerObj.call(p2p_key_img_hash, UserAudioStream)
        call.on('stream', function (remoteStream) {
          Set_friend_stream_to("friend_audio_stream", FriendAudioStream, remoteStream)
          setIsSessionStarted(true)
          clearInterval(id)
        });
      })
      peerRef.current = peerObj
    } else {
      const peerObj = new Peer(p2p_key_img_hash, {debug: 3})
      peerObj.on('open', (_) => {
        peerObj.on('call', function (call) {
          call.answer(UserAudioStream);
          call.on('stream', function (remoteStream) {
            Set_friend_stream_to("friend_audio_stream", FriendAudioStream, remoteStream)
            setIsSessionStarted(true)
            clearInterval(id)
          });
        });
      })
      peerRef.current = peerObj
    }

    return () => {
      cur_time = 0
      clearInterval(id)
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
            height: "200px",
            border: "1px solid green",
          }}>
              <img
                  src={calling}
                  width={"99%"}
                  height={"90%"}
                  alt={"calling"}
                  style={{
                    borderRadius: "8px",
                  }}/>
          </div>
      }

      <div style={{
        position: 'relative',
        width: '100%',
        height: '0',

      }}>
        <video playsInline autoPlay muted={false} id="friend_audio_stream"/>
      </div>

    </div>
  )
}

export default CallComponent
