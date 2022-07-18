import {message_type} from "./CallComponent";
import {pill_enum} from "../App";
import React, {useEffect, useReducer, useState} from "react";
import {send_message} from "./CallComponent_func";
import Button from '@mui/material/Button';
import {DataConnection} from "peerjs";
import useSound from "use-sound";
import on_message from "./on_message.mp3";

type Props = {
  messages: React.MutableRefObject<message_type[]>
  which_pill: pill_enum
  con: DataConnection
}

const Messager: React.FC<Props> = (
  {
    messages,
    which_pill,
    con
  }
) => {
  const [message, setMessage] = useState("")
  const [msgs_length, setMsgsLength] = useState(0)
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  //sound
  const [on_message_p] = useSound(on_message, {volume: 0.2});

  useEffect(() => {
    const ui_force_updater = setInterval(() => {
      forceUpdate()
    }, 10)

    const msg_lifetime_listener = setInterval(() => {
      messages.current.forEach(msg => {
        if (msg.lifetime_state !== msg.lifetime_const) {
          msg.lifetime_state += 1
        }
      })
    }, 1000)

    return () => {
      clearInterval(ui_force_updater)
      clearInterval(msg_lifetime_listener)
    }
  }, [])

  useEffect(() => {
    if (messages.current.length > 0) {
      on_message_p()
    }
    //msg recieve notification
    let msgs_length = messages.current.length
    const msgs_recieve_notifier = setInterval(() => {
      if (msgs_length !== messages.current.length) {
        msgs_length = messages.current.length
        setMsgsLength(msgs_length)
      }
    }, 10)

    return () => {
      clearInterval(msgs_recieve_notifier)
    }
  }, [msgs_length])

  return (
    <div style={{
      color: "white",
      width: "calc(100% - 32px)",
      margin: "0 16px",
    }}>
      {messages.current.map((message) => {
          if (message.lifetime_state === message.lifetime_const) {
            return null
          }

          if (message.sender === which_pill) {
            return (
              <div
                key={message.id}
                style={{
                color: "gray",
                fontSize: "0.8em",
                margin: "8px",
              }}>
                <div>- 🍔 {message.message} (lifetime: {message.lifetime_const - message.lifetime_state})</div>
              </div>
            )
          } else {
            return (
              <div
                key={message.id}
                style={{
                color: "green",
                fontSize: "1.2em",
                margin: "8px",
              }}>
                <div>- 💖 {message.message} (lifetime: {message.lifetime_const - message.lifetime_state})</div>
              </div>
            )
          }
        }
      )}


      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "16px",
      }}>
        <textarea
          style={{
            width: "100%",
            height: "64px",
            backgroundColor: "black",
            color: "white",
            resize: "vertical",
          }}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <Button
          style={{
            margin: "16px",
          }}
          variant="outlined"
          color="primary"
          onClick={() => {
            if (message !== "") {
              send_message(con, {
                id: Math.random().toString(),
                sender: which_pill,
                message: message,
                lifetime_const: 10,
                lifetime_state: 0,
              }, messages)
              setMessage("")
            }
          }}>
          Send
        </Button>
      </div>
    </div>
  )
}

export default Messager;
