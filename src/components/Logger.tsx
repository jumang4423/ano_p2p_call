import React from "react"
import {His_enum, Log_type} from "../App";
import {get_log_color} from "./Logger_fun";


type Props = {
  history: Array<Log_type>,
}

const Logger: React.FC<Props> = ({history}) => {
  return (
    <div style={{
      margin: "16px 0",
    }}>
      <div style={{
        color: "white",
        fontSize: "18px",
        backgroundColor: "green",
      }}>
        {":>"} current app status
      </div>
      <div style={{
        padding: "8px",
        border: '1px solid gray',
        backgroundColor: "#111",
      }}>
        {
          history.map((line, index) => {
            return (
              <div key={index} style={{
                color: get_log_color(line),
              }}>
                {line.message}
              </div>
            )
          })
        }
      </div>

    </div>
  );
}

export default Logger;
