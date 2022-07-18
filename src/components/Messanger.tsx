import {message_type} from "./CallComponent";
import {pill_enum} from "../App";
import React, {useEffect, useReducer, useState} from "react";
import {send_message} from "./CallComponent_func";
import Button from '@mui/material/Button';
import {DataConnection} from "peerjs";

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
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const force_update = setInterval(() => {
      forceUpdate()
    }, 1)

    return () => {
      clearInterval(force_update)
    }
  }, [])

  return (
    <div style={{
      color: "white",
      width: "calc(100% - 32px)",
      margin: "0 16px",
    }}>
      {messages.current.map((message) => {
          if (message.sender === which_pill) {
            return (
              <div key={message.id} style={{
                color: "gray",
                fontSize: "1em",
              }}>
                <p>- 🍔 {message.message}</p>
              </div>
            )
          } else {
            return (
              <div key={message.id} style={{
                color: "green",
                fontSize: "1em",
              }}>
                <p>- 💖 {message.message}</p>
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
