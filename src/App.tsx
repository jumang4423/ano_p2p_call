import React, {useEffect} from 'react';
import Header from "./components/Header";
import Logger from "./components/Logger";
import ImgHashUi from "./components/ImgHashUi";
import {gen_cur_log, get_audioStream} from "./App_fun";
import CallComponent from "./components/CallComponent";

export enum His_enum {
  info,
  success,
  warning,
  error,
}

export type Log_type = {
  message: string,
  type: His_enum
}


function App() {
  // user states
  const [p2p_key_img_hash, setP2PKeyImgHash] = React.useState<string | undefined>(undefined)
  const [isSessionStarted, setIsSessionStarted] = React.useState<boolean>(false)
  const [isLocalAudioEnabled, setIsLocalAudioEnabled] = React.useState<boolean>(false)

  const UserAudioStream = React.useRef<MediaStream | undefined>(undefined)
  const FriendAudioStream = React.useRef<MediaStream | undefined>(undefined)


  // view state
  const view_state = {
    logs: gen_cur_log(p2p_key_img_hash, isSessionStarted, isLocalAudioEnabled)
  }

  useEffect(() => {
    get_audioStream().then(stream => {
      UserAudioStream.current = stream
      setIsLocalAudioEnabled(true)
    })
  }, [])

  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
    }}>
      <div style={{
        margin: '32px 0 32px 0',
      }}>
        <Header/>

        {/*  TODO: call component goes here */}

        {
          p2p_key_img_hash
            ? <CallComponent p2p_key_img_hash={p2p_key_img_hash} UserAudioStream={UserAudioStream.current!}
                             FriendAudioStream={FriendAudioStream} isSessionStarted={isSessionStarted} setIsSessionStarted={setIsSessionStarted}/>
            : <ImgHashUi setP2PKeyImgHash={setP2PKeyImgHash}/>
        }

        <Logger history={view_state.logs}/>
      </div>
    </div>
  );
}

export default App;
