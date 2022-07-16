import {His_enum, Log_type} from "./App";

export const gen_cur_log = (p2p_key_img_hash: string | undefined, isSessionStarted: boolean, isAudioEnabled: boolean): Array<Log_type> => {
  const log: Array<Log_type> = Object.assign([], []);

  // p2p_key_img_hash
  if (p2p_key_img_hash) {
    log.push({
      type: His_enum.success,
      message: `image key: loaded`
    });
  } else {
    log.push({
      type: His_enum.info,
      message: `image key: not loaded`
    });
  }

  // isSessionStarted
  if (isSessionStarted) {
    log.push({
      type: His_enum.success,
      message: `session: started`
    });
  } else {
    log.push({
      type: His_enum.info,
      message: `session: not started`
    });
  }

  // isAudioEnabled
  if (isAudioEnabled) {
    log.push({
      type: His_enum.success,
      message: `local audio stream: enabled`
    });
  } else {
    log.push({
      type: His_enum.error,
      message: `local audio stream: disabled, allow audio to be enabled in your browser`
    });
  }

  return log;
}

export const get_audioStream = async (): Promise<MediaStream> => {
  const audio_only_stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});
  return audio_only_stream;
}
