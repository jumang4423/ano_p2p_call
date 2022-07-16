import {systemMeta} from "../funcs/meta";
import React from "react";

const Header = () => {
  return (
    <div style={{
      width: '100%',
    }}>
      <div style={{
        color: 'green',
        fontSize: '24px',
      }}> {systemMeta.name} :: {systemMeta.desc}</div>

      <div style={{
        color: 'gray',
        fontSize: '18px',
      }}> version :: {systemMeta.version}</div>
    </div>
  )
}

export default Header;
