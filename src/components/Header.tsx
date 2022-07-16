import {systemMeta} from "../funcs/meta";
import bk from './bk.png'
import React from "react";

const Header = () => {
  return (
    <div style={{
      width: '100%',
    }}>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img src={bk} style={{
          width: "75%",
          marginTop: "-32px",
          filter: "brightness(0.8)",
        }} alt={""}/>
      </div>


      <div style={{
        color: 'green',
        fontSize: '24px',
      }}> {systemMeta.name} :: {systemMeta.desc}</div>

      <div style={{
        color: 'gray',
        fontSize: '18px',
      }}> by {systemMeta.developer}</div>
    </div>
  )
}

export default Header;
