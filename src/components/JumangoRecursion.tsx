import React from "react";
import {systemMeta} from "../funcs/meta";

const JumangoRecursion = () => {
  return (
    <div style={{
      position: 'absolute',
      left: '0',
      width: '100%',
      height: '5%',
      bottom: '0',

    }}>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
        <div style={{
          color: 'gray',
        }}>
          by {systemMeta.developer} |
          <a
            href={systemMeta.github_repository_url}
            target="_blank"
            style={{
              marginLeft: "8px",
              color: 'gray',
            }} rel="noreferrer">
            {systemMeta.github_repository_url}
          </a>
        </div>
      </div>

    </div>
  )
}

export default JumangoRecursion;
