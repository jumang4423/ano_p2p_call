import React from "react";
import {systemMeta} from "../funcs/meta";

const JumangoRecursion = () => {
  return (
    <div style={{
      position: 'fixed',
      left: '0',
      width: '100%',
      height: '10%',
      bottom: '0',
      zIndex: '99999',
    }}>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
        <div style={{
          color: 'gray',
          backgroundColor: '#000',
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
