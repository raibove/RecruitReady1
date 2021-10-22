import React from "react";
import { Mic, Stop, PlayArrow } from "@material-ui/icons";
import "./style.css";

export default function Button({ title, record, play, stop, playStop }) {
  switch (title) {
    case "Square": {
      return (
        <div onClick={stop}>
          <span className="button">
            <Stop fontSize="large" />
          </span>
        </div>
      );
    }
    case "Play": {
      return (
        <div onClick={play}>
          <span className="button">
            <PlayArrow fontSize="large" />
          </span>
        </div>
      );
    }
    case "Play-Square": {
      return (
        <div onClick={playStop}>
          <span className="button">
            <Stop fontSize="large" />
          </span>
        </div>
      );
    }
    default: {
      return (
        <div onClick={record}>
          <span className="button">
            <Mic fontSize="large" />
          </span>
        </div>
      );
    }
  }
}
