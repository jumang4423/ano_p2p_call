import {His_enum, Log_type, pill_enum} from "./App";

export const gen_cur_log = (p2p_key_img_hash: string | undefined, isSessionStarted: boolean, isAudioEnabled: boolean): Array<Log_type> => {
  const log: Array<Log_type> = Object.assign([], []);

  // p2p_key_img_hash
  if (p2p_key_img_hash) {
    log.push({
      type: His_enum.success,
      message: `image key: loaded (${p2p_key_img_hash})`
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
  return await navigator.mediaDevices.getUserMedia({audio: true, video: false});
}

// deprecated use just call or receive
export const string_divider_by_pill = (s: string, pill_type:  pill_enum | undefined): string => {
  let middle = Math.floor(s.length / 2);
  let before = s.lastIndexOf(' ', middle);
  let after = s.indexOf(' ', middle + 1);

  if (middle - before < after - middle) {
    middle = before;
  } else {
    middle = after;
  }

  if (pill_type === pill_enum.blue) {
    return s.substring(0, middle);
  } else {
    return s.substring(middle + 1);
  }
}
