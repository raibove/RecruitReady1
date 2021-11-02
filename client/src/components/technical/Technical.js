import './technical.css';
import React, {useEffect, useRef, useState} from 'react';
import {firestore} from '../../firebase/config';
import Sound from "react-sound";
import useInterval from ".././audio/useInterval";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Technical() {

	const [questions, setQuestions] = useState([]);	
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [ind, setInd] = useState(0)
	const [text, setText] = useState("")
	const [open , setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	let startTime = 0
	let endTime = 0

	const keywords = [
		["Search", "sorted", "array", "repeatedly", "dividing", "search", "interval", "half", "whole", "array", "value", "of", "the", "search", "key", "less", "than", "item", "in", "middle", "interval", "interval", "lower", "half", "upper", "half", "Repeatedly", "check", "until", "found",  "interval", "empty"],
		["many", "multiple", "forms", "run", "time", "compile", "OOPs", "OOP", "instances", "different", "poly", "morph", "property", "object", "oriented", "programming", "overloading", "function", "overriding", "virtual", "class", "classes", "names", "friend", "polymorphism", "static", "dynamic", "binding", "operator"],
		["linked", "list", "link" ,"next", "data", "nodes", "node", "memory", "fields", "two", "address", "pointer", "null", "head", "linear","structure","reference","field","doubly", "circular", "singly"],
		["stack", "linked", "list", "array", "string", "tree", "binary", "bst", "queue", "heap", "trie", "graph", "singly", "doubly", "min", "max", "search", "circular", "hash", "table", "hashmap", "map", "set", "hashset", "priority", "deque", "vector", "segment", "matrix", "2d"],
		["object", "oriented", "programming", "oop", "derive", "class", "another", "parent", "child", "single", "multiple", "multilevel", "sub", "super", "properties", "inherited", "code", "re-usability", "methods", "existing", "reuse", "Hierarchical", "hybrid"    , "private", "protected", "public"]
	]
	const correct = [0,0,0,0,0]
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	const mic = new SpeechRecognition()

	mic.continuous = true
	mic.interimResults = true
	mic.lang = 'en-US'
	mic.onstart = () => {
		console.log('Mics on')
	}
	mic.onresult = event => {
		const transcript = Array.from(event.results)
		  .map(result => result[0])
		  .map(result => result.transcript)
		  .join('')
		setText(transcript)
		mic.onerror = event => {
		  console.log(event.error)
		}
	}
	mic.onend = () => {
		console.log('Stopped Mic on Click')
	}
	const startListening = (index)=>{
		mic.start()/*
		mic.onend = () => {
		  console.log('continue..')
		  mic.start()
		}*/

		navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then(stream => {
		  const newMediaRecorder = new MediaRecorder(stream);
		  newMediaRecorder.start();
		  startTime = new Date()
		  let chunks = [];
		  newMediaRecorder.ondataavailable = function(e) {
			chunks.push(e.data);
		  };
		
		  let t = questions
		  newMediaRecorder.onstop = function(e) {
			const blob = new File(chunks, index+".mp3",{ type: "audio/mp3" });
			const audioURL = window.URL.createObjectURL(blob);
			const audio = document.createElement("audio");
			audio.setAttribute("id", "player");
			audio.src = audioURL;
			t[index].blobFile = blob  
			t[index].audio = audio
			endTime = new Date()
			let tm = endTime - startTime
			tm = tm/1000
			t[index].time = tm
		  };
		  setMediaRecorder(newMediaRecorder);
		  setQuestions(t)
		})
		.catch(function(err) {
		  console.log("The following getUserMedia error occured: " + err);
		});
	}

	const record = async (data, index) => {
		navigator.permissions.query({ name: "microphone" }).then(function(result) {
		  if (result.state !== "granted") {
			alert("Must allow microphone to record");
			navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {});
		  }
		});
		await startListening(index);
	  };
	
	useEffect(async()=>{
		await firestore.collection("sections").doc("Technical").collection("questions").get().then((snapShot)=>{
			var data = [];
				snapShot.forEach((doc)=>{
					var ele = {}
					ele.question = doc.data()['text']
					ele.status = "record"
					ele.mediaRecorder = null 
					ele.blobFile = null 
					ele.audio = null 
					ele.text = null
					ele.time = 0
					ele.playStatus = Sound.status.STOPPED
					data.push(ele)
				});
				setQuestions(data);

		}).catch((error)=>{
			console.log(error);
		})
},[])

const calculatePercentage = ()=>{	
	questions.forEach((q,i)=>{
		if(q.text!==null){
			var keyword = new Set(keywords[i]);
			let answer = q.text.split(" ");
			console.log(answer)
			console.log(keyword)
			let count = 0;
			for(let j =0;j<answer.length;j++){
				if(keyword.has(answer[j])){
					count++;
				}
			}
			//console.log(count)
			correct[i] = count
		}else{
			console.log("")
		}
		handleOpen();
	})
	
	
}

const Content = ()=>{
	return(
		<div>
		{questions.map((q,i)=>{
			<div key={i}>
				{console.log(q)}
				<p>{q.question}</p>
				
			</div>
		})}
		</div>
	)
}
const playStop = (index) => {
	let t = questions 
	t[index].playStatus = Sound.status.STOPPED
	setQuestions(t)
  };

    return (
        <div className="container">
            <h1 className="text-center">Technical</h1>
            {/* <Main/> */}
            <section class="light">
	<div class="container py-2">
		<div class="h1 text-center text-dark" id="pageHeaderTitle">Questions</div>
		{questions.map((data, index)=>{
			return (
				<div class="postcard light blue" key={index}>
			<a class="postcard__img_link" href="#">
				<img class="postcard__img" src="https://picsum.photos/1000/1000" alt="Image Title" />
			</a>
			<div class="postcard__text t-dark">
				<h1 class="postcard__title blue"><a href="#">{data.question}</a></h1>
				<div class="postcard__subtitle small">
					<time datetime="2020-05-25 12:00:00">
						<i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2021
					</time>
				</div>
				<div class="postcard__bar"></div>
				<div class="postcard__preview-txt">{data.text}</div>
				{data.status === "record"? 
				<ul class="postcard__tagbox">
					<li class="tag__item" onClick={()=>{
						let temp = [...questions ]
						temp[index].status = "stop" 
						setQuestions(temp)
						setInd((index)=> index)
						record(data, index)

					}}><i class="fas fa-tag mr-2"></i>Start</li>
				</ul>
				:
				<div>
				{data.status === "stop"?
					<ul class="postcard__tagbox">
						<li class="tag__item" onClick={()=>{
						let temp = [...questions ]
						temp[index].status = "play" 
						setQuestions(temp)
						mediaRecorder.stop();
						mic.stop()
						mic.onend = () => {
						  console.log('Stopped Mic on Click')
						}

					}}><i class="fas fa-tag mr-2"></i>Stop</li>
					</ul>
					:
					<div>
						{data.status === "play"?
						<ul class="postcard__tagbox">
							<li class="tag__item" onClick={()=>{
									let temp = [...questions ]
									temp[index].playStatus = Sound.status.PLAYING
									setQuestions(temp)

							}}><i class="fas fa-tag mr-2"></i>Play</li>
							<li class="tag__item" onClick={()=>{
									let temp = [...questions ]
									temp[index].status = "save"
									temp[index].text = text
									setQuestions(temp)

									console.log(temp)
							}}><i class="fas fa-clock mr-2"></i>Save</li>
							<li class="tag__item play blue" onClick = {()=>{
									let temp = [...questions ]
									temp[index].status = "record"
									setQuestions(temp)
							}}>
								<i class="fas fa-play mr-2"></i>Retry
							</li>
						</ul>
						:
							<ul class="postcard__tagbox">
								<li class="tag__item" onClick={()=>{
										let temp = [...questions ]
										temp[index].playStatus = Sound.status.PLAYING
										setQuestions(temp)
								}}><i class="fas fa-tag mr-2"></i>Play</li>
							</ul>
						}
						{data.audio ? (
							<>
							<Sound
								url={data.audio.src}
								onFinishedPlaying={()=>playStop(index)}
								playStatus= {data.playStatus}
							/>
							</>
						) : null}
					</div>
					}
				</div>
				}
			</div>
		</div>
			);
		})}
		</div>
		<button type="button"  className="btn btn-primary report-button" data-toggle="modal" data-target="#myModal" onClick={()=>calculatePercentage()}>Generate Report</button>
		</section>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <div>
	   		<h2>Technical Interview Report Analysis</h2>
			   <p>dsd</p>
			   {questions.map((q,i)=>{
				<div key={i}>
					<p>{q.question}</p>
				</div>
				})}
	   </div>
      </Modal>
    </div>
    )
}

export default Technical
