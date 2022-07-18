import React from "react";
import {message_type} from "./CallComponent";
import {DataConnection} from "peerjs";
import {pill_enum} from "../App";
import {send_message} from "./CallComponent_func";

export const on_message_send = (messages: React.MutableRefObject<message_type[]>, con: DataConnection, message: message_type, which_pill: pill_enum) => {
  send_message(con, {
    id: Math.random().toString(),
    sender: which_pill,
    message: "Hello, I am " + which_pill,
    lifetime_const: 0,
    lifetime_state: 0
  }, messages)
}
