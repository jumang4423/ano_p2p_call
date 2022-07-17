import {pill_enum} from "../App";
import React from "react";
// images
import blue from './blue.jpg'
import red from './red.jpg'


type Props = {
  set_which_pill: React.Dispatch<React.SetStateAction<pill_enum | undefined>>
}

const PillSelector: React.FC<Props> = ({set_which_pill}) => {
  return (
    <div style={{
      margin: "32px 0",
      width: "100%",
      height: "300px",
      backgroundColor: "#000",
      border: "1px solid gray",
    }}>
      <div style={{
        marginTop: "32px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          flexDirection: "column",
          fontSize: "22px",
        }}>
          <div>💊 peace flower or psyche flower?</div>
        </div>

      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "8px",
      }}>
        <div style={{
          margin: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}>
          <img src={blue} width={"45%"} alt={"red pill"} onClick={() => set_which_pill(pill_enum.red)}/>
        </div>
        <div style={{
          margin: "8px 0 0 0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer"
        }}>
          <img src={red} width={"38%"} alt={"blue pill"} onClick={() => {
            set_which_pill(pill_enum.blue)
          }}/>
        </div>
      </div>
    </div>
  )
}

export default PillSelector;
