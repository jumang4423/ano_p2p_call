import React from "react";

export const Set_friend_stream_to = (elementId: string, FriendAudioStreamBox: React.MutableRefObject<MediaStream | undefined>, remoteStream: MediaStream) => {
  FriendAudioStreamBox.current = remoteStream;
  // set to video tag where id="friend_audio_stream"
  const VideoHTMLElement = document.getElementById("friend_audio_stream")
  if (VideoHTMLElement) {
    // @ts-ignore
    VideoHTMLElement.srcObject = remoteStream;
  }

  return void 0;
}
