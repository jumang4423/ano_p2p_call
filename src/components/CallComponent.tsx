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
      console.log("calling to: ", p2p_key_img_hash, "from random id")
      const peerObj = new Peer("", { debug: 3 })
      let call = peerObj.call(p2p_key_img_hash, UserAudioStream)
      call.on('stream', function (remoteStream) {
        Set_friend_stream_to("friend_audio_stream", FriendAudioStream, remoteStream)
        setIsSessionStarted(true)
      });
      peerRef.current = peerObj
    } else {
      console.log("waiting for call, i am", p2p_key_img_hash)
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
          }}>
              <img src={calling} style={{
                width: "130%",
                filter: "brightness(0.8)",
              }} alt={""}/>
              <div style={{
                color: 'gray',
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
              }}>
                  <div style={{
                    marginRight: "8px",
                  }}>
                      <ReactLoading type={"spinningBubbles"} color={"gray"} height={18} width={18}/>
                  </div>
                  <div>waiting for peer call! please wait...</div>
              </div>
          </div>
      }


      {/*  play friend audio stream here*/}
      {isSessionStarted && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '0',

        }}>
          <video playsInline autoPlay id="friend_audio_stream"/>
        </div>
      )}

    </div>
  )
}

export default CallComponent
