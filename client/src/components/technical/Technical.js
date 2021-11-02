import './technical.css';
import React, {useEffect, useRef, useState} from 'react';
import {firestore} from '../../firebase/config';
import Sound from "react-sound";


function Technical() {

	const [questions, setQuestions] = useState([]);	
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [ind, setInd] = useState(0)

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
		  };
		  setMediaRecorder(newMediaRecorder);
		  setQuestions(t)
		})
		.catch(function(err) {
		  console.log("The following getUserMedia error occured: " + err);
		});
	}


	const setText = (transcript)=>{
		let temp = questions 
		temp[ind].text = transcript 
		setQuestions(temp)

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
					ele.playStatus = Sound.status.STOPPED
					data.push(ele)
				});
				setQuestions(data);

		}).catch((error)=>{
			console.log(error);
		})
},[])


const playStop = (index) => {
	let t = questions 
	questions[index].playStatus = Sound.status.STOPPED
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
				<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>

				{data.status === "record"? 
				<ul class="postcard__tagbox">
					<li class="tag__item" onClick={()=>{
						let temp = [...questions ]
						temp[index].status = "stop" 
						setQuestions(temp)

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
									setQuestions(temp)
									setInd(index)
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
		<button className="report-button">Generate Report</button>

		</section>

    </div>
    )
}

export default Technical
