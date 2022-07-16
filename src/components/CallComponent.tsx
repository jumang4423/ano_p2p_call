import React, {useEffect} from "react";
import Peer from "peerjs";
import ReactLoading from "react-loading";
import {Set_friend_stream_to} from "./CallComponent_func";
import calling from "./calling.png";
import {pill_enum} from "../App";

type Props = {
  p2p_key_img_hash: string,
  UserAudioStream: MediaStream,
  FriendAudioStream: React.MutableRefObject<MediaStream | undefined>,
  isSessionStarted: boolean,
  setIsSessionStarted: React.Dispatch<React.SetStateAction<boolean>>,
  which_pill: pill_enum
}

const CallComponent: React.FC<Props> = ({
                                          p2p_key_img_hash,
                                          UserAudioStream,
                                          FriendAudioStream,
                                          isSessionStarted,
                                          setIsSessionStarted,
                                          which_pill
                                        }) => {
  const peerRef = React.useRef<Peer | undefined>(undefined)

  useEffect(() => {
    // take blue, call to the id
    if (which_pill === pill_enum.blue) {
      const peerObj = new Peer("", {debug: 3})
      peerObj.on('open', (_) => {
        let call = peerObj.call(p2p_key_img_hash, UserAudioStream)
        call.on('stream', function (remoteStream) {
          Set_friend_stream_to("friend_audio_stream", FriendAudioStream, remoteStream)
          setIsSessionStarted(true)
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
          });
        });
      })
      peerRef.current = peerObj
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
                  <div>flower trying to call! please wait...</div>
              </div>
          </div>
      }

      {
        isSessionStarted &&
          <div style={{
            margin: "32px 0",
            width: "100%",
            height: "128px",
            backgroundColor: "#000",
            border: "1px solid green",
          }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "32px",
                backgroundColor: "#111",
              }}>
                  <div style={{
                    color: 'white',
                    fontSize: "24px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "128px",
                  }}>
                      📞 you can speak now
                  </div>
              </div>
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
