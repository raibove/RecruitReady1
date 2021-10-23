import React, { useState } from "react";
import Sound from "react-sound";
import Button from "./Button";
import "./style.css";
import RecordingCount from "./RecordingCount";
import {storage} from '../../firebase/config';
import { ref ,uploadBytes} from "@firebase/storage";
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Main() {
  const [title, setTitle] = useState("Record");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const [audio, setAudio] = useState(null);
  const [blobFile, setBlobFile] = useState(null);
  const [isLoading, setLoader]  =useState(false);
  const [open, setOpen]  = useState(false);

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const newMediaRecorder = new MediaRecorder(stream);
        newMediaRecorder.start();
        let chunks = [];
        newMediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };
        newMediaRecorder.onstop = function(e) {
          const blob = new File(chunks,'my-file.mp3',{ type: "audio/mp3" });
          const audioURL = window.URL.createObjectURL(blob);
          const audio = document.createElement("audio");
          audio.setAttribute("id", "player");
          audio.src = audioURL;
          setBlobFile(blob);
          setAudio(audio);
        };
        setMediaRecorder(newMediaRecorder);
      })
      .catch(function(err) {
        console.log("The following getUserMedia error occured: " + err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const record = async () => {
    navigator.permissions.query({ name: "microphone" }).then(function(result) {
      if (result.state !== "granted") {
        alert("Must allow microphone to record");
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {});
      }
    });
    await startListening();
    setTitle("Square");
    const button = document.querySelector(".button");
    button.classList.add("pulse");
  };

  const play = () => {
    setPlayStatus(Sound.status.PLAYING);
    setTitle("Play-Square");
  };

  const stop = () => {
    setTitle("Play");
    const button = document.querySelector(".button");
    button.classList.remove("pulse");
    button.classList.add("play");
    mediaRecorder.stop();
  };

  const reset = () => {
    setTitle("Record");
    const button = document.querySelector(".button");
    button.classList.remove("play");
    setPlayStatus(Sound.status.STOPPED);
  };

  const save = () => {
    setLoader(true);
    // TODO: send to database
    var uniq = 'id' + (new Date()).getTime();
    const storeRef = ref(storage, "audio/" + uniq);
    uploadBytes(storeRef,blobFile).then((snap)=>{
      console.log("file uploaded successfully");
      setLoader(false);
      setOpen(true);
      setTitle("Record");
      const button = document.querySelector(".button");
      button.classList.remove("play");
      setPlayStatus(Sound.status.STOPPED);
    }).catch((error)=>{
      console.log("error", error);
    });
    
  };

  const playStop = () => {
    setPlayStatus(Sound.status.STOPPED);
    setTitle("Play");
  };

  return (
    <div className="main-container">
      <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          File uploaded successfully !
        </Alert>
      </Snackbar>
      <Button
        title={title}
        record={record}
        play={play}
        stop={stop}
        audio={audio}
        playStop={playStop}
      />
      {title === "Play" ? (
        <div>
          <button className="redo-button btn" onClick={reset}>
            Redo
          </button>
          {!isLoading?<button className="save-button btn" onClick={save}>
            Save
          </button>:<LoadingButton loading variant="outlined">Save</LoadingButton>}
          
        </div>
      ) : (
        <>
          {title === "Record" ? (
            <div className="sub-text">Tap the microphone to record</div>
          ) : (
            <RecordingCount />
          )}
        </>
      )}
      {audio ? (
        <>
          <Sound
            url={audio.src}
            onFinishedPlaying={playStop}
            playStatus={playStatus}
          />
        </>
      ) : null}
    </div>
  );
}
