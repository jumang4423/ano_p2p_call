import React, {useEffect} from 'react';
import Header from "./components/Header";
import Logger from "./components/Logger";
import ImgHashUi from "./components/ImgHashUi";
import {gen_cur_log, get_audioStream} from "./App_fun";
import CallComponent from "./components/CallComponent";
import JumangoRecursion from "./components/JumangoRecursion";
import PillSelector from "./components/PillSelector";

export enum His_enum {
  info,
  success,
  warning,
  error,
}

export enum page_status_type {
  image_not_loaded,
  select_pills,
  trying_to_connect
}

export enum pill_enum {
  red,
  blue,
}


export type Log_type = {
  message: string,
  type: His_enum
}


function App() {
  // user states
  const [cur_page_stat, set_cur_page_stat] = React.useState<page_status_type>(page_status_type.image_not_loaded)
  const [which_pill, set_which_pill] = React.useState<pill_enum | undefined>(undefined)
  const [p2p_key_img_hash, setP2PKeyImgHash] = React.useState<string | undefined>(undefined)
  const [isSessionStarted, setIsSessionStarted] = React.useState<boolean>(false)
  const [isLocalAudioEnabled, setIsLocalAudioEnabled] = React.useState<boolean>(false)

  const UserAudioStream = React.useRef<MediaStream | undefined>(undefined)
  const FriendAudioStream = React.useRef<MediaStream | undefined>(undefined)

  // view state
  const view_state = {
    logs: gen_cur_log(p2p_key_img_hash, isSessionStarted, isLocalAudioEnabled),
  }

  useEffect(() => {
    get_audioStream().then(stream => {
      UserAudioStream.current = stream
      setIsLocalAudioEnabled(true)
    })
  }, [])

  // for page state control
  {
    useEffect(() => {
      if (p2p_key_img_hash !== undefined) {
        set_cur_page_stat(page_status_type.select_pills)
      }
    }, [p2p_key_img_hash])

    useEffect(() => {
      if (which_pill !== undefined) {
        set_cur_page_stat(page_status_type.trying_to_connect)
      }
    }, [which_pill])
  }

  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
    }}>
      <div style={{
        margin: '32px 0 32px 0',
      }}>
        <Header/>
        {
          cur_page_stat === page_status_type.image_not_loaded &&
            <ImgHashUi setP2PKeyImgHash={setP2PKeyImgHash}/>
        }
        {
          cur_page_stat === page_status_type.select_pills &&
            <PillSelector set_which_pill={set_which_pill}/>
        }
        {
          cur_page_stat === page_status_type.trying_to_connect &&
            <CallComponent p2p_key_img_hash={p2p_key_img_hash ?? ""} UserAudioStream={UserAudioStream.current!}
                           FriendAudioStream={FriendAudioStream} isSessionStarted={isSessionStarted}
                           setIsSessionStarted={setIsSessionStarted} which_pill={which_pill!}/>
        }
        <Logger history={view_state.logs}/>

        <JumangoRecursion/>
      </div>
    </div>
  );
}

export default App;
