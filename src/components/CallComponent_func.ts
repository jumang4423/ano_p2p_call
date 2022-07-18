import React from "react";
import {pill_enum} from "../App";
import Peer, {DataConnection} from "peerjs";
import {message_type} from "./CallComponent";
import {PlayFunction} from "use-sound/dist/types";

export const Set_friend_stream_to = (elementId: string, FriendAudioStreamBox: React.MutableRefObject<MediaStream | undefined>, remoteStream: MediaStream): void => {
  FriendAudioStreamBox.current = remoteStream;
  // set to video tag where id="friend_audio_stream"
  const VideoHTMLElement = document.getElementById("friend_audio_stream")
  if (VideoHTMLElement) {
    // @ts-ignore
    VideoHTMLElement.srcObject = remoteStream;
  }

  return void 0;
}

export const id_gen = (p2p_key_img_hash: string, which_pill: pill_enum): string => {
  if (which_pill === pill_enum.blue) {
    return `${p2p_key_img_hash}_blue`;
  } else {
    return `${p2p_key_img_hash}_red`;
  }
}

export const con_msg = (
  to_id: string,
  msg_connectionRef: React.MutableRefObject<DataConnection | undefined>,
  peerObj: Peer,
  messages: React.MutableRefObject<message_type[]>,
): void => {
  msg_connectionRef.current = peerObj.connect(to_id)
  msg_connectionRef.current.on('data', (data) => {
    messages.current = Object.assign([], messages.current);
    messages.current.push(data as message_type);
  })
  peerObj.on('connection', function (conn) {
    msg_connectionRef.current = conn
    msg_connectionRef.current.on('data', (data) => {
      messages.current = Object.assign([], messages.current);
      messages.current.push(data as message_type);
    })
  });
}

export const send_message = (con: DataConnection, message: message_type, messages: React.MutableRefObject<message_type[]>): void => {
  con.send(message);
  messages.current = Object.assign([], messages.current);
  messages.current.push(message);

  return void 0;
}
